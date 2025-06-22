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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  useGetBooks,
  useDeleteBook,
  useUpdateBook,
} from "../../hooks/useBooks";
import { useGetTopics } from "../../hooks/useTopics"

const AdminBooks = () => {
  const { data: topics = [] } = useGetTopics();

  const { data: books = [], isLoading } = useGetBooks();
  const deleteMutation = useDeleteBook();
  const updateMutation = useUpdateBook();

  const [editableBooks, setEditableBooks] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null);

  const confirmDelete = (bookCode) => {
    setSelectedBookToDelete(bookCode);
    setDeleteDialogOpen(true);
  };

  const handleConfirmedDelete = () => {
    if (selectedBookToDelete) {
      deleteMutation.mutate(selectedBookToDelete);
      setDeleteDialogOpen(false);
      setSelectedBookToDelete(null);
    }
  };

  const getTopicName = (topicCode) => {
    const topic = topics.find((t) => t.id === topicCode);
    return topic?.name || "—";
  };

  const toggleEdit = (code) => {
    const currentBook = books.find((b) => b.code === code);
    setEditableBooks((prev) => ({
      ...prev,
      [code]: { ...currentBook },
    }));
    setIsEditing((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const handleChange = (code, field, value) => {
    setEditableBooks((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        [field]: value,
      },
    }));
  };

  const handleSave = (code) => {
    const updateData = editableBooks[code];
    if (!updateData) return;
    updateMutation.mutate({ bookCode: code, updateData });
    setIsEditing((prev) => ({ ...prev, [code]: false }));
  };

  const handleDelete = (code) => {
    deleteMutation.mutate(code);
  };

  const filteredBooks = books.filter((book) => {
    const topicName = getTopicName(book.topicCode);

    return [
      book.code,
      book.signs,
      book.signsTopic,
      book.notes,
      book.bigBooksQuantity,
      book.smallBooksQuantity,
      book.bigBooksSold,
      book.smallBooksSold,
      book.bigBookPrice,
      book.smallBookPrice,
      topicName
    ]
      .map((v) => String(v ?? "").toLowerCase()) // handles null/undefined safely
      .some((v) => v.includes(searchQuery.toLowerCase()));
  });

  return (
    <div style={{ padding: "2rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#252e49">
          ניהול ספרים
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="חפש לפי קוד, סימנים, הערות וכו'"
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
        <p>טוען ספרים...</p>
      ) : (
        <TableContainer component={Paper} style={{ maxHeight: 600, overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">קוד</TableCell>
                <TableCell align="center">נושא</TableCell>
                <TableCell align="center">סימנים</TableCell>
                <TableCell align="center">נושא הסימנים</TableCell>
                <TableCell align="center">גדולים במלאי</TableCell>
                <TableCell align="center">קטנים במלאי</TableCell>
                <TableCell align="center">נמכרו (גדול)</TableCell>
                <TableCell align="center">נמכרו (קטן)</TableCell>
                <TableCell align="center">מחיר גדול</TableCell>
                <TableCell align="center">מחיר קטן</TableCell>
                <TableCell align="center">הערות</TableCell>
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => {
                const isEdit = isEditing[book.code];
                const editable = editableBooks[book.code] || {};

                return (
                  <TableRow key={book.code}>
                    <TableCell align="center">{book.code}</TableCell>
                    <TableCell align="center">{getTopicName(book.topicCode)}</TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          variant="standard"
                          value={editable.signs}
                          onChange={(e) => handleChange(book.code, "signs", e.target.value)}
                        />
                      ) : (
                        book.signs
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          variant="standard"
                          value={editable.signsTopic}
                          onChange={(e) => handleChange(book.code, "signsTopic", e.target.value)}
                        />
                      ) : (
                        book.signsTopic
                      )}
                    </TableCell>
                    <TableCell align="center">{book.bigBooksQuantity}</TableCell>
                    <TableCell align="center">{book.smallBooksQuantity}</TableCell>
                    <TableCell align="center">{book.bigBooksSold}</TableCell>
                    <TableCell align="center">{book.smallBooksSold}</TableCell>
                    <TableCell align="center">{book.bigBookPrice} ₪</TableCell>
                    <TableCell align="center">{book.smallBookPrice} ₪</TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          variant="standard"
                          value={editable.notes || ""}
                          onChange={(e) => handleChange(book.code, "notes", e.target.value)}
                        />
                      ) : (
                        book.notes
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
                        <Tooltip title="ערוך">
                          <IconButton onClick={() => toggleEdit(book.code)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="מחק">
                        <IconButton
                          onClick={() => confirmDelete(book.code)}
                          color="error"
                        >
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
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <Box sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            האם את בטוחה שברצונך למחוק את הספר?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmedDelete}
            >
              כן, מחק
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDeleteDialogOpen(false)}
            >
              ביטול
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default AdminBooks;