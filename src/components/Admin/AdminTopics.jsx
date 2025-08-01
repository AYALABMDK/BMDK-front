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
    InputAdornment,
} from "@mui/material";
import { Delete, Save, Edit, Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { useGetTopics, useAddTopic, useUpdateTopic, useDeleteTopic } from "../../hooks/useTopics";

const AdminTopics = () => {
    const { data: topics = [], isLoading } = useGetTopics();
    const { mutateAsync: addTopic } = useAddTopic();
    const { mutateAsync: updateTopic } = useUpdateTopic();
    const { mutateAsync: deleteTopic } = useDeleteTopic();

    const [searchQuery, setSearchQuery] = useState("");
    const [editMode, setEditMode] = useState({});
    const [editedTopics, setEditedTopics] = useState({});
    const [newTopic, setNewTopic] = useState({ name: "", notes: "" });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState(null);

    const filteredTopics = topics.filter((t) =>
        t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id?.toString().includes(searchQuery.toLowerCase()) ||
        t.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChange = (id, field, value) => {
        setEditedTopics((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleSave = async (id) => {
        const edited = editedTopics[id];
        if (edited?.name?.trim()) {
            await updateTopic({
                id,
                name: edited.name.trim(),
                notes: edited.notes?.trim() || "",
            });
            setEditMode((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleDelete = async () => {
        if (selectedToDelete) {
            await deleteTopic(selectedToDelete);
            setDeleteDialogOpen(false);
            setSelectedToDelete(null);
        }
    };

    const handleAddTopic = async () => {
        if (newTopic.name.trim()) {
            await addTopic({
                name: newTopic.name.trim(),
                notes: newTopic.notes.trim(),
            });
            setNewTopic({ name: "", notes: "" });
            setDialogOpen(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* Header and Search */}
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
                        mr: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#252e49"
                        sx={{ mb: 2 }}
                    >
                        ניהול  נושאים
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="חפש נושא לפי קוד שם או הערות"
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

                {/* כפתור הוספת נושא חדש בצד שמאל */}
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => setDialogOpen(true)}
                >
                    הוספת נושא חדש
                </Button>
            </Box>

            {/* Table */}
            {isLoading ? (
                <Typography>טוען נושאים...</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
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
                                <TableCell align="center">קוד</TableCell>
                                <TableCell align="center">שם</TableCell>
                                <TableCell align="center">הערות</TableCell>
                                <TableCell align="center">פעולות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTopics.map((topic) => {
                                const isEdit = editMode[topic.id];
                                const nameValue = isEdit ? editedTopics[topic.id]?.name : topic.name;

                                return (
                                    <TableRow key={topic.id}>
                                        <TableCell align="center">{topic.id}</TableCell>
                                        <TableCell align="center">
                                            {isEdit ? (
                                                <TextField
                                                    value={nameValue || ""}
                                                    onChange={(e) => handleChange(topic.id, "name", e.target.value)}
                                                />
                                            ) : (
                                                topic.name
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {isEdit ? (
                                                <TextField
                                                    value={editedTopics[topic.id]?.notes || ""}
                                                    onChange={(e) => handleChange(topic.id, "notes", e.target.value)}
                                                />
                                            ) : (
                                                topic.notes || "—"
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {isEdit ? (
                                                <Tooltip title="שמור">
                                                    <IconButton onClick={() => handleSave(topic.id)} color="primary">
                                                        <Save />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="ערוך">
                                                    <IconButton
                                                        onClick={() => {
                                                            setEditMode((prev) => ({ ...prev, [topic.id]: true }));
                                                            setEditedTopics((prev) => ({
                                                                ...prev,
                                                                [topic.id]: {
                                                                    name: topic.name,
                                                                    notes: topic.notes || "",
                                                                },
                                                            }));
                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            <Tooltip title="מחק">
                                                <IconButton
                                                    onClick={() => {
                                                        setSelectedToDelete(topic.id);
                                                        setDeleteDialogOpen(true);
                                                    }}
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

            {/* Add Topic Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>נושא חדש</DialogTitle>
                <DialogContent>
                    <TextField
                        label="שם נושא"
                        fullWidth
                        margin="dense"
                        value={newTopic.name}
                        onChange={(e) =>
                            setNewTopic((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                    <TextField
                        label="הערות"
                        fullWidth
                        margin="dense"
                        value={newTopic.notes}
                        onChange={(e) =>
                            setNewTopic((prev) => ({ ...prev, notes: e.target.value }))
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>ביטול</Button>
                    <Button onClick={handleAddTopic} variant="contained">שמור</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <Box sx={{ padding: 3, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        האם אתה בטוח שברצונך למחוק את הנושא?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
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

export default AdminTopics;