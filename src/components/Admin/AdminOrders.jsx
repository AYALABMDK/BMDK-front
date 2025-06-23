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
  Select,
  MenuItem,
  TextField,
  Collapse,
  Box,
  Tooltip,
  Chip,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Snackbar, Alert } from "@mui/material";

import {
  useGetOrders,
  useDeleteOrder,
  useUpdateOrder,
} from "../../hooks/useOrders";
import { useGetBooks } from "../../hooks/useBooks";
import { useGetVideos } from "../../hooks/useVideo";
import { useSendStatusEmail, useSendCustomEmail } from "../../hooks/useOrders";
import CircularProgress from "@mui/material/CircularProgress";

const AdminOrders = () => {
  const { data: orders = [], isLoading } = useGetOrders();
  const deleteMutation = useDeleteOrder();
  const updateMutation = useUpdateOrder();

  const [editableOrders, setEditableOrders] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrderToDelete, setSelectedOrderToDelete] = useState(null);
  const { data: books = [] } = useGetBooks();
  const { data: videos = [] } = useGetVideos();
  const [mailDialogOpen, setMailDialogOpen] = useState(false);
  const [selectedOrderForMail, setSelectedOrderForMail] = useState(null);
  const [selectedMailTopic, setSelectedMailTopic] = useState("הזמנה שנשלחה");
  const [loading, setLoading] = useState(false);
  const [customEmailOpen, setCustomEmailOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const toggleExpand = (orderCode) => {
    setExpandedRows((prev) => ({ ...prev, [orderCode]: !prev[orderCode] }));
  };
  const confirmDelete = (orderCode) => {
    setSelectedOrderToDelete(orderCode);
    setDeleteDialogOpen(true);
  };
  const handleConfirmedDelete = () => {
    if (selectedOrderToDelete) {
      deleteMutation.mutate(selectedOrderToDelete);
      setDeleteDialogOpen(false);
      setSelectedOrderToDelete(null);
    }
  };

  const toggleEdit = (orderCode) => {
    const currentOrder = orders.find((o) => o.orderCode === orderCode);
    setEditableOrders((prev) => ({
      ...prev,
      [orderCode]: {
        fullName: currentOrder.fullName,
        email: currentOrder.email,
        phone: currentOrder.phone,
        status: currentOrder.status,
        address: {
          city: currentOrder.address?.city || "",
          street: currentOrder.address?.street || "",
        },
      },
    }));
    setIsEditing((prev) => ({ ...prev, [orderCode]: !prev[orderCode] }));
  };

  const handleChange = (orderCode, field, value, nestedField = null) => {
    setEditableOrders((prev) => {
      const updated = { ...prev[orderCode] };
      if (nestedField) {
        updated[field][nestedField] = value;
      } else {
        updated[field] = value;
      }
      return {
        ...prev,
        [orderCode]: updated,
      };
    });
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "התקבלה":
        return (
          <Chip
            label="התקבלה"
            size="small"
            sx={{
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              color: "darkred",
              pointerEvents: "none",
            }}
          />
        );
      case "מוכנה למשלוח":
        return (
          <Chip
            label="מוכנה למשלוח"
            size="small"
            sx={{
              backgroundColor: "rgba(255, 165, 0, 0.15)",
              color: "darkorange",
              pointerEvents: "none",
            }}
          />
        );
      case "נשלחה":
        return (
          <Chip
            label="נשלחה"
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 0, 0.2)",
              color: "#8a6d00",
              pointerEvents: "none",
            }}
          />
        );
      case "הסתיימה":
        return (
          <Chip
            label="הסתיימה"
            size="small"
            sx={{
              backgroundColor: "rgba(0, 128, 0, 0.15)",
              color: "darkgreen",
              pointerEvents: "none",
            }}
          />
        );
      default:
        return (
          <Chip
            label={status || "לא ידוע"}
            size="small"
            sx={{
              backgroundColor: "#eeeeee",
              color: "#333",
              fontWeight: "bold",
            }}
          />
        );
    }
  };

  const handleSave = (orderCode) => {
    const updateData = editableOrders[orderCode];
    if (!updateData) return;
    updateMutation.mutate({ orderCode, updateData });
    setIsEditing((prev) => ({ ...prev, [orderCode]: false }));
  };
  const openMailDialog = (order) => {
    setSelectedOrderForMail(order);
    setSelectedMailTopic("הזמנה שנשלחה");
    setMailDialogOpen(true);
  };
  const sendStatusMutation = useSendStatusEmail();

  const handleMailClick = (order) => {
    setSelectedOrderForMail(order);
    setMailDialogOpen(true);
  };

  const handleSendEmail = (status) => {
    if (!selectedOrderForMail) return;
    sendStatusMutation.mutate({
      orderCode: selectedOrderForMail.orderCode,
      status,
    });
    setMailDialogOpen(false);
    setSelectedOrderForMail(null);
  };
  const sendCustomMutation = useSendCustomEmail();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //   const handleCustomEmailSend = async () => {
  //     sendCustomMutation.mutate(emailForm, {
  //       onSuccess: () => {
  //         setSnackbar({
  //           open: true,
  //           message: "המייל נשלח בהצלחה",
  //           severity: "success",
  //         });
  //         setCustomEmailOpen(false);
  //       },
  //       onError: () => {
  //         setSnackbar({
  //           open: true,
  //           message: "שליחת המייל נכשלה",
  //           severity: "error",
  //         });
  //       },
  //     });
  //   };
  const handleCustomEmailSend = async () => {
    setLoading(true);
    sendCustomMutation.mutate(emailForm, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: "המייל נשלח בהצלחה",
          severity: "success",
        });
        setCustomEmailOpen(false);
        setLoading(false);
      },
      onError: () => {
        setSnackbar({
          open: true,
          message: "שליחת המייל נכשלה",
          severity: "error",
        });
        setLoading(false);
      },
    });
  };
  const filteredOrders = orders.filter((order) => {
    const valuesToSearch = [
      order.orderCode,
      order.fullName,
      order.email,
      order.phone,
      order.status,
      order.orderDate,
      order.orderDate
        ? new Date(order.orderDate).toLocaleDateString("he-IL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
      order.address?.street,
      order.address?.city,
      ...(order.products?.map((p) => p.bookCode || p.videoCode || "") || []),
    ];
    return valuesToSearch.some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#252e49">
          ניהול הזמנות
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="חפש לפי קוד הזמנה, שם, מייל, סטטוס, עיר וכו'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "500px",
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
          }}
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
        <p>טוען הזמנות...</p>
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
                <TableCell />
                <TableCell align="center" style={{ width: "150px" }}>
                  מס' הזמנה
                </TableCell>
                <TableCell align="center" style={{ width: "140px" }}>
                  תאריך
                </TableCell>
                <TableCell align="center" style={{ width: "150px" }}>
                  שם
                </TableCell>
                <TableCell align="center" style={{ width: "150px" }}>
                  אימייל
                </TableCell>
                <TableCell align="center" style={{ width: "150px" }}>
                  טלפון
                </TableCell>
                <TableCell align="center" style={{ width: "150px" }}>
                  כתובת
                </TableCell>
                <TableCell align="center" style={{ width: "150px" }}>
                  סטטוס
                </TableCell>
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => {
                const isOpen = expandedRows[order.orderCode];
                const isEdit = isEditing[order.orderCode];
                const address = order.address || {};
                const editable = editableOrders[order.orderCode] || {};
                return (
                  <React.Fragment key={order.orderCode}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          onClick={() => toggleExpand(order.orderCode)}
                        >
                          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{order.orderCode}</TableCell>
                      <TableCell align="center">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleString("he-IL", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </TableCell>
                      <TableCell align="center">
                        {isEdit ? (
                          <TextField
                            variant="standard"
                            defaultValue={order.fullName}
                            onChange={(e) =>
                              handleChange(
                                order.orderCode,
                                "fullName",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          order.fullName
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {isEdit ? (
                          <TextField
                            variant="standard"
                            defaultValue={order.email}
                            onChange={(e) =>
                              handleChange(
                                order.orderCode,
                                "email",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          order.email
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {isEdit ? (
                          <TextField
                            variant="standard"
                            defaultValue={order.phone}
                            onChange={(e) =>
                              handleChange(
                                order.orderCode,
                                "phone",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          order.phone
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {isEdit ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                            }}
                          >
                            <TextField
                              variant="standard"
                              placeholder="רחוב"
                              value={editable.address?.street || ""}
                              onChange={(e) =>
                                handleChange(
                                  order.orderCode,
                                  "address",
                                  e.target.value,
                                  "street"
                                )
                              }
                            />
                            <TextField
                              variant="standard"
                              placeholder="עיר"
                              value={editable.address?.city || ""}
                              onChange={(e) =>
                                handleChange(
                                  order.orderCode,
                                  "address",
                                  e.target.value,
                                  "city"
                                )
                              }
                            />
                          </Box>
                        ) : (
                          `${address.street || ""}, ${address.city || ""}`
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {isEdit ? (
                          <Select
                            size="small"
                            value={editable.status ?? order.status}
                            onChange={(e) =>
                              handleChange(
                                order.orderCode,
                                "status",
                                e.target.value
                              )
                            }
                          >
                            <MenuItem value="התקבלה">התקבלה</MenuItem>
                            <MenuItem value="מוכנה למשלוח">
                              מוכנה למשלוח
                            </MenuItem>
                            <MenuItem value="נשלחה">נשלחה</MenuItem>
                            <MenuItem value="הסתיימה">הסתיימה</MenuItem>
                          </Select>
                        ) : (
                          getStatusChip(order.status)
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {isEdit && (
                          <Tooltip title="שמור">
                            <IconButton
                              onClick={() => handleSave(order.orderCode)}
                              color="primary"
                            >
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="ערוך">
                          <IconButton
                            onClick={() => toggleEdit(order.orderCode)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="מחק">
                          <IconButton
                            onClick={() => confirmDelete(order.orderCode)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="שלח מייל">
                          <IconButton onClick={() => handleMailClick(order)}>
                            <EmailIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                      >
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Box margin={2}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                            >
                              מוצרים בהזמנה:
                            </Typography>

                            <Table
                              sx={{
                                "& th, & td": {
                                  border: "1px solid #ccc", // קווים ברורים
                                  textAlign: "center",
                                  padding: "8px",
                                },
                                "& thead th": {
                                  backgroundColor: "#e3f2fd",
                                  color: "#0d47a1",
                                  fontWeight: 700,
                                  fontSize: "1.05rem",
                                },
                              }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">סוג</TableCell>
                                  <TableCell align="center">נושא</TableCell>
                                  <TableCell align="center">סימנים</TableCell>
                                  <TableCell align="center">גודל</TableCell>
                                  <TableCell align="center">כמות</TableCell>
                                  <TableCell align="center">מחיר</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.products.map((p, i) => {
                                  const isBook = !!p.size;
                                  const fullItem = isBook
                                    ? books.find((b) => b.bookCode === p.code)
                                    : videos.find(
                                        (v) => v.videoCode === p.code
                                      );

                                  const topic = isBook
                                    ? fullItem?.signsTopic
                                    : fullItem?.title;
                                  const signs = isBook
                                    ? fullItem?.signs
                                    : fullItem?.signsTopic;

                                  return (
                                    <TableRow key={i}>
                                      <TableCell align="center">
                                        {isBook ? " ספר" : "סרטון"}
                                      </TableCell>
                                      <TableCell align="center">
                                        {topic || "-"}
                                      </TableCell>
                                      <TableCell align="center">
                                        {signs || "-"}
                                      </TableCell>
                                      <TableCell align="center">
                                        {isBook ? p.size : "-"}
                                      </TableCell>
                                      <TableCell align="center">
                                        {p.quantity}
                                      </TableCell>
                                      <TableCell align="center">
                                        {p.price} ₪
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
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
            האם את בטוחה שברצונך למחוק את ההזמנה?
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
      <Dialog open={mailDialogOpen} onClose={() => setMailDialogOpen(false)}>
        <Box sx={{ p: 3, minWidth: 300, textAlign: "center" }}>
          <Typography variant="h6" mb={2}>
            שלח מייל עבור {selectedOrderForMail?.fullName}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                color: "#8a6d00",
                backgroundColor: "rgba(255, 255, 0, 0.2)",
                "&:hover": { backgroundColor: "rgba(255, 255, 0, 0.2)" },
              }}
              onClick={() => handleSendEmail("נשלחה")}
            >
              הזמנה נשלחה
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "darkgreen",
                backgroundColor: "rgba(0, 128, 0, 0.15)",
                "&:hover": { backgroundColor: "rgba(0, 128, 0, 0.15)" },
              }}
              onClick={() => handleSendEmail("הסתיימה")}
            >
              הזמנה הסתיימה
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9e9e9e",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#7e7e7e",
                },
              }}
              onClick={() => {
                setEmailForm({
                  to: selectedOrderForMail.email,
                  subject: "",
                  message: "",
                });
                setMailDialogOpen(false);
                setCustomEmailOpen(true);
              }}
            >
              אחר
            </Button>

            <Button variant="outlined" onClick={() => setMailDialogOpen(false)}>
              ביטול
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={customEmailOpen}
        onClose={() => setCustomEmailOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">שליחת מייל מותאם אישית</Typography>
          <TextField label="אל" value={emailForm.to} fullWidth disabled />
          <TextField
            label="נושא"
            value={emailForm.subject}
            onChange={(e) =>
              setEmailForm({ ...emailForm, subject: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="הודעה"
            value={emailForm.message}
            onChange={(e) =>
              setEmailForm({ ...emailForm, message: e.target.value })
            }
            fullWidth
            multiline
            minRows={6}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setCustomEmailOpen(false)}
            >
              ביטול
            </Button>
            <Button
              variant="contained"
              onClick={handleCustomEmailSend}
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "שולח..." : "שלח מייל"}
            </Button>
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
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            justifyContent: "center",
            textAlign: "center",
          }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminOrders;
