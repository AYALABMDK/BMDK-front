import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Box,
  Button,
  Dialog,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InputAdornment from "@mui/material/InputAdornment";

import { useGetBooks, useDeleteBook, useUpdateBook } from "../../hooks/useBooks";
import { useGetTopics } from "../../hooks/useTopics";

const BookInventory = () => {
  const { data: books = [], isLoading } = useGetBooks();
  const { data: topics = [] } = useGetTopics();
  const deleteMutation = useDeleteBook();
  const updateMutation = useUpdateBook();

  const [editableBooks, setEditableBooks] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const confirmDelete = (bookCode) => {
    setSelectedBookToDelete(bookCode);
    setDeleteDialogOpen(true);
  };

  const handleConfirmedDelete = () => {
    if (selectedBookToDelete) {
      deleteMutation.mutate(selectedBookToDelete, {
        onSuccess: () => {
          setSnackbar({ open: true, message: "הספר נמחק בהצלחה", severity: "success" });
        },
        onError: () => {
          setSnackbar({ open: true, message: "מחיקת הספר נכשלה", severity: "error" });
        },
      });
      setDeleteDialogOpen(false);
      setSelectedBookToDelete(null);
    }
  };

  const getTopicName = (topicCode) => topics.find((t) => t.id === topicCode)?.name || "—";

  const toggleEdit = (code) => {
    const currentBook = books.find((b) => b.code === code);
    setEditableBooks((prev) => ({ ...prev, [code]: { ...currentBook } }));
    setIsEditing((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const handleChange = (code, field, value) => {
    setEditableBooks((prev) => ({
      ...prev,
      [code]: { ...prev[code], [field]: value },
    }));
  };

  const handleSave = (code) => {
    const updateData = editableBooks[code];
    updateMutation.mutate(
      { bookCode: code, updateData },
      {
        onSuccess: () => {
          setSnackbar({ open: true, message: "הספר עודכן בהצלחה", severity: "success" });
        },
        onError: () => {
          setSnackbar({ open: true, message: "עדכון הספר נכשל", severity: "error" });
        },
      }
    );
    setIsEditing((prev) => ({ ...prev, [code]: false }));
  };

  const filteredBooks = books
    .filter((book) => {
      const topicName = getTopicName(book.topicCode);
      return [book.code, book.signs, book.signsTopic, topicName]
        .map((v) => String(v ?? "").toLowerCase())
        .some((v) => v.includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => {
      const aStock = a.bigBooksQuantity > 0 && a.smallBooksQuantity > 0 ? 1 : 0;
      const bStock = b.bigBooksQuantity > 0 && b.smallBooksQuantity > 0 ? 1 : 0;
      return aStock - bStock;
    });

  return (
    <div style={{ padding: "2rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#252e49">
          מלאי ספרים
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="חפש לפי קוד, סימנים, נושא..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "400px", backgroundColor: "#f7f7f7" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {isLoading ? (
        <Typography align="center">טוען ספרים...</Typography>
      ) : (
        <TableContainer component={Paper} style={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{
                  "& th": {
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#252e49",
                    backgroundColor: "#cfcfcf",
                  },
                }}>
                <TableCell align="center">קוד</TableCell>
                <TableCell align="center">נושא</TableCell>
                <TableCell align="center">סימנים</TableCell>
                <TableCell align="center">נושא הסימנים</TableCell>
                <TableCell align="center">גדולים במלאי</TableCell>
                <TableCell align="center">קטנים במלאי</TableCell>
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => {
                const isEdit = isEditing[book.code];
                const editable = editableBooks[book.code] || {};
                const isOutOfStock = book.bigBooksQuantity <= 0 || book.smallBooksQuantity <= 0;

                const renderStock = (value) => (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                    <Typography>{value}</Typography>
                    {value <= 0 && <WarningAmberIcon color="warning" fontSize="small" />}
                  </Box>
                );

                return (
                  <TableRow
                    key={book.code}
                    sx={isOutOfStock ? { backgroundColor: "#ffebee" } : {}}
                  >
                    <TableCell align="center">{book.code}</TableCell>
                    <TableCell align="center">{getTopicName(book.topicCode)}</TableCell>
                    <TableCell align="center">{book.signs}</TableCell>
                    <TableCell align="center">{book.signsTopic}</TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          variant="standard"
                          type="number"
                          value={editable.bigBooksQuantity}
                          onChange={(e) => handleChange(book.code, "bigBooksQuantity", e.target.value)}
                          inputProps={{ min: 0 }}
                        />
                      ) : (
                        renderStock(book.bigBooksQuantity)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          variant="standard"
                          type="number"
                          value={editable.smallBooksQuantity}
                          onChange={(e) => handleChange(book.code, "smallBooksQuantity", e.target.value)}
                          inputProps={{ min: 0 }}
                        />
                      ) : (
                        renderStock(book.smallBooksQuantity)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <Tooltip title="שמור">
                          <IconButton onClick={() => handleSave(book.code)} color="primary">
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="ערוך מלאי">
                          <IconButton onClick={() => toggleEdit(book.code)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="מחק">
                        <IconButton onClick={() => confirmDelete(book.code)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <Box sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>האם את בטוחה שברצונך למחוק את הספר?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="error" onClick={handleConfirmedDelete}>כן, מחק</Button>
            <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
          </Box>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%", fontSize: "1.1rem", justifyContent: "center", textAlign: "center" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BookInventory;
