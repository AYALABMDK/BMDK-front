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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  useGetVideos,
  useDeleteVideo,
  useUpdateVideo,
  useAddVideo,
} from "../../hooks/useVideo";
import { useGetTopics, useAddTopic } from "../../hooks/useTopics";

const AdminVideos = () => {
  const { data: topics = [] } = useGetTopics();
  const { data: videos = [], isLoading } = useGetVideos();
  const deleteMutation = useDeleteVideo();
  const updateMutation = useUpdateVideo();
  const addMutation = useAddVideo();
  const { mutateAsync: addTopic } = useAddTopic();

  const [editableVideos, setEditableVideos] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [videoBeingEdited, setVideoBeingEdited] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVideoToDelete, setSelectedVideoToDelete] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);

  const defaultVideo = {
    title: "",
    topicCode: "",
    topicPart: "",
    signsTopic: "",
    price: 0,
    soldAmount: 0,
    videoExUrl: "",
    notes: "",
  }
  const [newVideo, setNewVideo] = useState(defaultVideo);

  const fieldLabels = {
    code: "קוד",
    title: "כותרת",
    topicCode: "קוד נושא",
    topicPart: "חלק נושא",
    signsTopic: " סימנים",
    price: "מחיר",
    soldAmount: "כמות שנמכרו",
    videoExUrl: "קישור לדוגמה",
    notes: "הערות",
  };

  // Filter topics by input text
  const filteredTopics = topics.map((topic) => ({
    label: topic.name,
    id: topic.id,
  }));

  const selectedTopic = filteredTopics.find((t) => t.id === newVideo.topicCode);
  const selectedTopicEdit = filteredTopics.find((t) => t.id === videoBeingEdited?.topicCode);

  const saveTopic = async (name) => {
    try {
      const newTopic = await addTopic({ name });
      return newTopic;
    } catch (error) {
      return null;
    }
  };

  const resetAddDialog = () => {
    setAddDialogOpen(false);
    setInputValue("");
    setNewVideo({
      code: "",
      title: "",
      topicCode: "",
      topicPart: "",
      signsTopic: "",
      price: "",
      soldAmount: "",
      videoExUrl: "",
      notes: "",
    });
    setShowAddButton(false);
  };

  const getTopicName = (topicCode) => {
    const topic = topics.find((t) => t.id === topicCode);
    return topic?.name || "—";
  };

  // const toggleEdit = (code) => {
  //   const currentVideo = videos.find((v) => v.code === code);
  //   setEditableVideos((prev) => ({
  //     ...prev,
  //     [code]: { ...currentVideo },
  //   }));
  //   setIsEditing((prev) => ({ ...prev, [code]: !prev[code] }));
  // };

  // const handleChange = (code, field, value) => {
  //   setEditableVideos((prev) => ({
  //     ...prev,
  //     [code]: {
  //       ...prev[code],
  //       [field]: value,
  //     },
  //   }));
  // };

  const handleSave = (code) => {
    const updateData = videoBeingEdited;
    if (!updateData) return;
    updateMutation.mutate({ code, data: updateData });
  };

  const confirmDelete = (code) => {
    setSelectedVideoToDelete(code);
    setDeleteDialogOpen(true);
    setIsEditing((prev) => ({ ...prev, [code]: false }));
  };

  const handleConfirmedDelete = () => {
    if (selectedVideoToDelete) {
      deleteMutation.mutate(selectedVideoToDelete);
      setDeleteDialogOpen(false);
      setSelectedVideoToDelete(null);
    }
  };

  const handleAddVideo = () => {
    addMutation.mutate(newVideo, {
      onSuccess: () => {
        setInputValue("");
        setShowAddButton(false);
        setAddDialogOpen(false); // סוגר את הדיאלוג
        setNewVideo({
          code: "",
          topicCode: "",
          topicPart: "",
          signsTopic: "",
          price: "",
          soldAmount: "",
          videoExUrl: "",
          notes: "",
        }); // מאפס את הטופס
      },
    });
  };

  const filteredVideos = videos.filter((video) => {
    const topicName = getTopicName(video.topicCode);
    return [
      video.code,
      video.topicCode,
      video.topicPart,
      video.signsTopic,
      video.notes,
      video.price,
      video.soldAmount,
      video.videoExUrl,
      topicName,
    ]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(searchQuery.toLowerCase()));
  });

  return (
    <div style={{ padding: "2rem" }}>
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
          <Typography variant="h4" fontWeight="bold" color="#252e49" sx={{ mb: 2 }}>
            ניהול סרטונים
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="חפש סרטון לפי קוד, נושא, הערות וכו'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 400, backgroundColor: "#f7f7f7" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          הוסף סרטון חדש
        </Button>
      </Box>
      {
        isLoading ? (
          <p>טוען סרטונים...</p>
        ) : (
          <TableContainer
            component={Paper}
            style={{ maxHeight: 600, overflowY: "auto" }}
          >
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
                    "כותרת",
                    "נושא",
                    "חלק נושא",
                    "נושא סימנים",
                    "מחיר",
                    "כמות שנמכרו",
                    "קישור לדוגמה",
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
                {filteredVideos.map((video) => {
                  return (
                    <TableRow key={video.code}>
                      {[
                        "code",
                        "title",
                        "topicCode",
                        "topicPart",
                        "signsTopic",
                        "price",
                        "soldAmount",
                        "videoExUrl",
                        "notes",
                      ].map((field) => (
                        <TableCell key={field} align="center">
                          {field == "topicCode" ? (
                            getTopicName(video.topicCode)
                          ) : field == "price" ? (
                            `${video.price} ₪`
                          ) : (
                            video[field]
                          )}
                        </TableCell>
                      ))}

                      <TableCell align="center">
                        <Tooltip title="ערוך">
                          <IconButton
                            onClick={() => {
                              setVideoBeingEdited({ ...video });
                              setEditDialogOpen(true);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="מחק">
                          <IconButton
                            onClick={() => confirmDelete(video.code)}
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
        )
      }

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <Box sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            האם את בטוחה שברצונך למחוק את הסרטון?
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

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ערוך סרטון</DialogTitle>
        <DialogContent>
          {Object.keys(defaultVideo).map((field) => {
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
                        setVideoBeingEdited((prev) => ({ ...prev, topicCode: "" }));
                        setInputValue("");
                        setShowAddButton(false);
                      } else if (newValue) {
                        setVideoBeingEdited((prev) => ({ ...prev, topicCode: newValue.id }));
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
                          setVideoBeingEdited((prev) => ({
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
                  field === "soldAmount" || field === "price" ?
                    "number"
                    : "text"
                }
                label={fieldLabels[field] || field}
                value={videoBeingEdited?.[field] || ""}
                fullWidth
                margin="dense"
                InputLabelProps={{}}
                onChange={(e) =>
                  setVideoBeingEdited({
                    ...videoBeingEdited,
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
              handleSave(videoBeingEdited.code);
              console.log("הנתונים שנשלחים:", videoBeingEdited);
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

      <Dialog open={addDialogOpen} onClose={resetAddDialog}>
        <DialogTitle>הוסף סרטון חדש</DialogTitle>

        <DialogContent>
          {Object.keys(newVideo).map((field) => {
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
                        setNewVideo({ ...newVideo, topicCode: "" });
                        setInputValue("");
                        setShowAddButton(false);
                      } else if (newValue) {
                        setNewVideo({ ...newVideo, topicCode: newValue.id });
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
                          setNewVideo((prev) => ({
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
                label={fieldLabels[field] || field}
                value={newVideo[field]}
                fullWidth
                margin="dense"
                onChange={(e) =>
                  setNewVideo({ ...newVideo, [field]: e.target.value })
                }
              />
            );
          })}
        </DialogContent>

        <DialogActions>
          <Button onClick={resetAddDialog}>ביטול</Button>
          <Button
            variant="contained"
            onClick={handleAddVideo}
            disabled={addMutation.isLoading}
          >
            {addMutation.isLoading ? "שומר..." : "שמור"}
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default AdminVideos;
