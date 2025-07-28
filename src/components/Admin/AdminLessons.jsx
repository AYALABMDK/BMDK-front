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
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { Delete, Save, Edit, Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import {
  useGetLessons,
  useAddLesson,
  useUpdateLesson,
  useDeleteLesson,
} from "../../hooks/useLessons";
import { useGetTopics, useAddTopic } from "../../hooks/useTopics";

const AdminLessons = () => {
  const { data: lessons = [], isLoading } = useGetLessons();
  const { data: topics = [] } = useGetTopics();
  const addLesson = useAddLesson();
  const updateLesson = useUpdateLesson();
  const deleteLesson = useDeleteLesson();
  const { mutateAsync: addTopic } = useAddTopic();

  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState({});
  const [editedLessons, setEditedLessons] = useState({});
  const [newLesson, setNewLesson] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [lessonBeingEdited, setLessonBeingEdited] = useState(null);
  const [selectedLessonToDelete, setSelectedLessonToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const defaultLesson = {
    topicCode: "",
    description: "",
    city: "",
    day: "",
    hour: "",
    status: "פעיל",
    studentsCount: 0,
    studentsType: "",
    price: 0,
    startDate: "",
    endDate: "",
    notes: "",
  };

  const fieldLabels = {
    topicCode: "נושא",
    description: "תיאור",
    city: "עיר",
    day: "יום",
    hour: "שעה",
    status: "סטטוס",
    studentsCount: "מס' תלמידים",
    studentsType: "סוג תלמידים",
    price: "מחיר",
    startDate: "מתאריך",
    endDate: "עד תאריך",
    notes: "הערות",
  };

  // Filter topics by input text
  const filteredTopics = topics.map((topic) => ({
    label: topic.name,
    id: topic.id,
  }));

  const selectedTopic = filteredTopics.find((t) => t.id === newLesson?.topicCode);

  const saveTopic = async (name) => {
    try {
      const newTopic = await addTopic({ name });
      return newTopic;
    } catch (error) {
      return null;
    }
  };

  const topicName = (code) => topics.find((t) => t.id === code)?.name || "—";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleChange = (code, field, value) => {
    setEditedLessons((prev) => ({
      ...prev,
      [code]: { ...prev[code], [field]: value },
    }));
  };

  const handleSave = (code) => {
    updateLesson.mutate({ lessonCode: code, updateData: editedLessons[code] });
    setEditMode((prev) => ({ ...prev, [code]: false }));
  };



  const handleSaveNew = () => {
    addLesson.mutate(newLesson, {
      onSuccess: () => {
        setNewLesson(null);
        setDialogOpen(false);
      },
    });
  };
  // פונקציה לפתיחת הדיאלוג
  const confirmDelete = (code) => {
    setSelectedLessonToDelete(code);
    setDeleteDialogOpen(true);
  };

  // פונקציה למחיקה סופית
  const handleDeleteConfirmed = () => {
    deleteLesson.mutate(selectedLessonToDelete, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedLessonToDelete(null);
      },
    });
  };

  const filteredLessons = lessons.filter((lesson) =>
    [
      lesson.code,
      lesson.description,
      lesson.city,
      lesson.day,
      lesson.studentsType,
      lesson.notes,
      topicName(lesson.topicCode),
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
        {/* רווח בצד ימין לשמירה על יישור (כמו בדוגמה שלך עם ספרים) */}
        <Box sx={{ width: 140 }} />

        {/* כותרת וחיפוש במרכז */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#252e49"
            sx={{ mb: 2 }}
          >
            ניהול שיעורים
          </Typography>
          <TextField
            size="small"
            placeholder="חפש שיעור לפי קוד, נושא, הערות וכו'"
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

        {/* כפתור הוספת שיעור חדש בצד שמאל */}
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => {
            setNewLesson(defaultLesson);
            setDialogOpen(true);
          }}
        >
          הוספת שיעור חדש
        </Button>
      </Box>

      {isLoading ? (
        <Typography>טוען שיעורים...</Typography>
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
                  "תיאור",
                  "עיר",
                  "יום",
                  "שעה",
                  "סטטוס",
                  "מס' תלמידים",
                  "סוג תלמידים",
                  "מחיר",
                  "מתאריך",
                  "עד תאריך",
                  "הערות",
                  "פעולות",
                ].map((t, i) => (
                  <TableCell key={i} align="center" sx={{ fontWeight: "bold" }}>
                    {t}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLessons.map((row) => {
                const isEdit = editMode[row.code];
                const editable = editedLessons[row.code] || row;
                return (
                  <TableRow key={row.code}>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">
                      {isEdit ? (
                        <TextField
                          select
                          value={editable.topicCode}
                          onChange={(e) =>
                            handleChange(row.code, "topicCode", +e.target.value)
                          }
                        >
                          {topics.map((t) => (
                            <MenuItem key={t.id} value={t.id}>
                              {t.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        topicName(row.topicCode)
                      )}
                    </TableCell>
                    {[
                      "description",
                      "city",
                      "day",
                      "hour",
                      "status",
                      "studentsCount",
                      "studentsType",
                      "price",
                      "startDate",
                      "endDate",
                      "notes",
                    ].map((field) => (
                      <TableCell key={field} align="center">
                        {isEdit ? (
                          <TextField
                            type={
                              field.includes("Date")
                                ? "date"
                                : field === "studentsCount" || field === "price"
                                  ? "number"
                                  : "text"
                            }
                            value={editable[field] || ""}
                            InputLabelProps={
                              field.includes("Date") ? { shrink: true } : {}
                            }
                            onChange={(e) =>
                              handleChange(row.code, field, e.target.value)
                            }
                          />
                        ) : field.includes("Date") ? (
                          formatDate(row[field])
                        ) : (
                          row[field]
                        )}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {isEdit ? (
                        <Tooltip title="שמור">
                          <IconButton
                            onClick={() => handleSave(row.code)}
                            color="primary"
                          >
                            <Save />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="ערוך">
                          <IconButton
                            onClick={() => {
                              setLessonBeingEdited({ ...row });
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="מחק">
                        <IconButton
                          onClick={() => confirmDelete(row.code)}
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
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ערוך שיעור</DialogTitle>
        <DialogContent>
          {Object.keys(defaultLesson).map((field) => {
            if (field === "topicCode") {
              return (
                <TextField
                  key={field}
                  select
                  label={fieldLabels[field]}
                  value={lessonBeingEdited?.[field] || ""}
                  fullWidth
                  margin="dense"
                  onChange={(e) =>
                    setLessonBeingEdited({
                      ...lessonBeingEdited,
                      topicCode: +e.target.value,
                    })
                  }
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            return (
              <TextField
                key={field}
                type={
                  field.includes("Date")
                    ? "date"
                    : field === "studentsCount" || field === "price"
                      ? "number"
                      : "text"
                }
                label={fieldLabels[field] || field}
                value={lessonBeingEdited?.[field] || ""}
                fullWidth
                margin="dense"
                InputLabelProps={field.includes("Date") ? { shrink: true } : {}}
                onChange={(e) =>
                  setLessonBeingEdited({
                    ...lessonBeingEdited,
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
            disabled={updateLesson.isLoading}
            onClick={() => {
              const filteredData = {
                topicCode: +lessonBeingEdited.topicCode || 0,
                description: lessonBeingEdited.description || "",
                city: lessonBeingEdited.city || "",
                day: lessonBeingEdited.day || "",
                hour: lessonBeingEdited.hour || "",
                status: lessonBeingEdited.status || "",
                studentsCount: +lessonBeingEdited.studentsCount || 0,
                studentsType: lessonBeingEdited.studentsType || "",
                price: +lessonBeingEdited.price || 0,
                startDate: lessonBeingEdited.startDate || "",
                endDate: lessonBeingEdited.endDate || "",
                notes: lessonBeingEdited.notes || "",
              };

              console.log("הנתונים שנשלחים:", filteredData);

              updateLesson.mutate(
                { code: lessonBeingEdited.code, updatedData: filteredData },
                {
                  onSuccess: () => {
                    console.log("עודכן בהצלחה");
                    setEditDialogOpen(false);
                  },
                  onError: (err) => {
                    console.error("שגיאה בעדכון", err);
                  },
                }
              );
            }}
          >
            {updateLesson.isLoading ? (
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
            האם את בטוחה שברצונך למחוק את השיעור?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirmed}
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

      {/* דיאלוג הוספת שיעור */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>הוסף שיעור חדש</DialogTitle>
        <DialogContent>
          {Object.keys(defaultLesson).map((field) => {
            if (field === "topicCode") {
              return (
                <Box display="flex" alignItems="center" gap={1}>
                  <Autocomplete
                    fullWidth
                    options={filteredTopics}
                    getOptionLabel={(option) => option.label}
                    value={selectedTopic || null}
                    noOptionsText="לא נמצא נושא"
                    onChange={(event, newValue, reason) => {
                      if (reason === "clear") {
                        setNewLesson({ ...newLesson, topicCode: "" });
                        setInputValue("");
                        setShowAddButton(false);
                      } else if (newValue) {
                        setNewLesson({ ...newLesson, topicCode: newValue.id });
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
                          setNewLesson((prev) => ({
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

            return (
              <TextField
                key={field}
                type={
                  field.includes("Date")
                    ? "date"
                    : field === "studentsCount" || field === "price"
                      ? "number"
                      : "text"
                }
                label={fieldLabels[field] || field}
                value={newLesson?.[field] || ""}
                fullWidth
                margin="dense"
                onChange={(e) =>
                  setNewLesson({ ...newLesson, [field]: e.target.value })
                }
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleSaveNew}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminLessons;
