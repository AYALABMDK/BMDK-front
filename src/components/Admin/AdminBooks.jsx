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
  Autocomplete,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";

import {
  useGetBooks,
  useDeleteBook,
  useUpdateBook,
  useCreateBook,
} from "../../hooks/useBooks";
import { useGetTopics, useAddTopic } from "../../hooks/useTopics";

const AdminBooks = () => {
  const { data: topics = [] } = useGetTopics();
  const { data: books = [], isLoading } = useGetBooks();
  const deleteMutation = useDeleteBook();
  const updateMutation = useUpdateBook();
  const createMutation = useCreateBook();
  const { mutateAsync: addTopic } = useAddTopic();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [bookBeingEdited, setBookBeingEdited] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null);
  const [newBook, setNewBook] = useState(null);
  const [showAddButton, setShowAddButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const defaultBookData = {
    topicCode: 0,
    signs: "",
    signsTopic: "",
    bigBooksQuantity: 0,
    smallBooksQuantity: 0,
    bigBooksSold: 0,
    smallBooksSold: 0,
    bigBookPrice: 0,
    smallBookPrice: 0,
    notes: "",
  };

  const fieldLabels = {
    topicCode: "נושא הספר",
    signs: "סימנים",
    signsTopic: "נושא הסימנים",
    bigBooksQuantity: "גדול במלאי",
    smallBooksQuantity: "קטן במלאי",
    bigBooksSold: "נמכרו (גדול)",
    smallBooksSold: "נמכרו (קטן)",
    bigBookPrice: "מחיר גדול",
    smallBookPrice: "מחיר קטן",
    notes: "הערות",
  };

  // Filter topics by input text
  const filteredTopics = topics.map((topic) => ({
    label: topic.name,
    id: topic.id,
  }));

  const selectedTopic = filteredTopics.find((t) => t.id === newBook?.topicCode);
  const selectedTopicEdit = filteredTopics.find((t) => t.id === bookBeingEdited?.topicCode);


  const saveTopic = async (name) => {
    try {
      const newTopic = await addTopic({ name });
      return newTopic;
    } catch (error) {
      return null;
    }
  };

  const handleSave = (code) => {
    const updateData = bookBeingEdited;
    if (!updateData) return;
    updateMutation.mutate({ bookCode: code, updateData });
  };

  const confirmDelete = (code) => {
    setSelectedBookToDelete(code);
    setDeleteDialogOpen(true);
  };

  const handleConfirmedDelete = () => {
    if (selectedBookToDelete) {
      deleteMutation.mutate(selectedBookToDelete);
      setDeleteDialogOpen(false);
      setSelectedBookToDelete(null);
    }
  };

  const handleSaveNewBook = () => {
    if (!newBook) return;
    createMutation.mutate(newBook, { onSuccess: () => setNewBook(null) });
  };

  const getTopicName = (code) => topics.find((t) => t.id === code)?.name || "—";

  const filteredBooks = books.filter((book) =>
    [
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
      getTopicName(book.topicCode),
    ]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(searchQuery.toLowerCase()))
  );

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ width: 140 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#252e49"
            sx={{ mb: 2 }}
          >
            ניהול ספרים
          </Typography>
          <TextField
            size="small"
            placeholder="חפש ספר לפי קוד, נושא, הערות וכו'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 400, backgroundColor: "#f7f7f7" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => setNewBook(defaultBookData)}
        >
          הוספת ספר חדש
        </Button>
      </Box>

      {isLoading ? (
        <Typography>טוען ספרים...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#252e49",
                    backgroundColor: "#cfcfcf",
                  },
                }}
              >
                {[
                  "קוד",
                  "נושא",
                  "סימנים",
                  "נושא הסימנים",
                  "נמכרו (גדול)",
                  "נמכרו (קטן)",
                  "מחיר גדול",
                  "מחיר קטן",
                  "הערות",
                  "פעולות",
                ].map((text, i) => (
                  <TableCell align="center" key={i}>
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => {
                return (
                  <TableRow key={book.code}>
                    {[
                      "code",
                      "topicCode",
                      "signs",
                      "signsTopic",
                      "bigBooksSold",
                      "smallBooksSold",
                      "bigBookPrice",
                      "smallBookPrice",
                      "notes",
                    ].map((field) => (
                      <TableCell align="center" key={field}>
                        {field === "topicCode" ? (
                          getTopicName(book.topicCode)
                        ) : field.includes("Price") ? (
                          `${book[field]} ₪`
                        ) : (
                          book[field])}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Tooltip title="ערוך">
                        <IconButton
                          onClick={() => {
                            setBookBeingEdited({ ...book });
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="מחק">
                        <IconButton
                          onClick={() => confirmDelete(book.code)}
                          color="error"
                        >
                          <Delete />
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
        open={!!newBook}
        onClose={() => setNewBook(null)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            הוספת ספר חדש
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Autocomplete
                sx={{ flex: 1 }}
                options={filteredTopics}
                getOptionLabel={(option) => option.label}
                value={selectedTopic || null}
                noOptionsText="לא נמצא נושא"
                onChange={(event, newValue, reason) => {
                  if (reason === "clear") {
                    setNewBook({ ...newBook, topicCode: "" });
                    setInputValue("");
                    setShowAddButton(false);
                  } else if (newValue) {
                    setNewBook({ ...newBook, topicCode: newValue.id });
                  }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  const topicExists = filteredTopics.some(
                    (t) => t.label === newInputValue
                  );
                  setShowAddButton(!topicExists && newInputValue.trim() !== "");
                }}
                renderInput={(params) => (
                  <TextField {...params} label="נושא" fullWidth />
                )}
              />
              {showAddButton && (
                <Button
                  variant="outlined"
                  sx={{
                    width: 30,
                    height: 30,
                    alignSelf: 'center',
                    minWidth: 0,
                    padding: 0,
                  }}
                  onMouseDown={async () => {
                    const topic = await saveTopic(inputValue);
                    if (topic) {
                      setNewBook((prev) => ({
                        ...prev,
                        topicCode: topic.id,
                      }));
                      setShowAddButton(false);
                      setInputValue("");
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              )}
            </Box>

            <TextField
              label="סימנים"
              value={newBook?.signs || ""}
              onChange={(e) =>
                setNewBook({ ...newBook, signs: e.target.value })
              }
            />
            <TextField
              label="נושא הסימנים"
              value={newBook?.signsTopic || ""}
              onChange={(e) =>
                setNewBook({ ...newBook, signsTopic: e.target.value })
              }
            />
            <TextField
              label="גדול במלאי"
              type="number"
              value={newBook?.bigBooksQuantity || 0}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  bigBooksQuantity: Number(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="קטן במלאי"
              type="number"
              value={newBook?.smallBooksQuantity || 0}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  smallBooksQuantity: Number(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="נמכרו (גדול)"
              type="number"
              value={newBook?.bigBooksSold || 0}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  bigBooksSold: Number(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="נמכרו (קטן)"
              type="number"
              value={newBook?.smallBooksSold || 0}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  smallBooksSold: Number(e.target.value) || 0,
                })
              }
            />
            <TextField
              label="מחיר גדול"
              type="number"
              value={newBook?.bigBookPrice || 0}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setNewBook({ ...newBook, bigBookPrice: isNaN(val) ? 0 : val });
              }}
            />
            <TextField
              label="מחיר קטן"
              type="number"
              value={newBook?.smallBookPrice}
              onChange={(e) => {
                debugger;
                const val = parseFloat(e.target.value);
                setNewBook({
                  ...newBook,
                  smallBookPrice: isNaN(val) ? 0 : val,
                });
              }}
            />
            <TextField
              label="הערות"
              value={newBook?.notes || ""}
              onChange={(e) =>
                setNewBook({ ...newBook, notes: e.target.value })
              }
              sx={{ minWidth: 0, gridColumn: "span 3" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                debugger;
                if (!newBook?.topicCode) {
                  alert("נא למלא נושא");
                  return;
                }
                if (!newBook?.signs || !newBook?.signsTopic) {
                  alert("נא למלא סימנים ונושא הסימנים");
                  return;
                }
                handleSaveNewBook();
              }}
            >
              שמירה
            </Button>
            <Button variant="outlined" onClick={() => setNewBook(null)}>
              ביטול
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ערוך סרטון</DialogTitle>
        <DialogContent>
          {Object.keys(defaultBookData).map((field) => {
            if (field === "topicCode") {
              return (
                <Box display="flex" alignItems="center" gap={1}>
                  <Autocomplete
                    fullWidth
                    options={filteredTopics}
                    getOptionLabel={(option) => option.label}
                    value={selectedTopicEdit || null}
                    noOptionsText="לא נמצא נושא"
                    onChange={(event, newValue, reason) => {
                      if (reason === "clear") {
                        setBookBeingEdited((prev) => ({ ...prev, topicCode: "" }));
                        setInputValue("");
                        setShowAddButton(false);
                      } else if (newValue) {
                        setBookBeingEdited((prev) => ({ ...prev, topicCode: newValue.id }));
                      }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                      const topicExists = filteredTopics.some(
                        (t) => t.label === newInputValue
                      );
                      setShowAddButton(
                        !topicExists && newInputValue.trim() !== ""
                      );
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="נושא" margin="dense" />
                    )}
                  />
                  {showAddButton && (
                    <Button
                      variant="outlined"
                      sx={{
                        width: 60,
                        height: 50,
                        alignSelf: 'center',
                        minWidth: 0,
                        padding: 0,
                      }}
                      onMouseDown={async () => {
                        const topic = await saveTopic(inputValue);
                        if (topic) {
                          setBookBeingEdited((prev) => ({
                            ...prev,
                            topicCode: topic.id,
                          }));
                          setShowAddButton(false);
                          setInputValue("");
                        }
                      }}
                    >
                      <AddIcon />
                    </Button>
                  )}
                </Box>
              );
            }

            if (field.includes("Quantity"))
              return <></>

            return (
              <TextField
                key={field}
                type={
                  field.includes("Book") ?
                    "number"
                    : "text"
                }
                label={fieldLabels[field] || field}
                value={bookBeingEdited?.[field] || ""}
                fullWidth
                margin="dense"
                InputLabelProps={{}}
                onChange={(e) =>
                  setBookBeingEdited({
                    ...bookBeingEdited,
                    [field]: e.target.value,
                  })
                }
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
          <Button
            variant="contained"
            disabled={updateMutation.isLoading}
            onClick={() => {
              handleSave(bookBeingEdited.code);
              console.log("הנתונים שנשלחים:", bookBeingEdited);
              setEditDialogOpen(false);
            }}
          >
            {updateMutation.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "שמור"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <Box sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            האם אתה בטוח שברצונך למחוק את הספר?
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
    </Box>
  );
};

export default AdminBooks;
