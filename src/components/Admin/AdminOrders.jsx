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
  Checkbox,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const [expandedRows, setExpandedRows] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [orderBeingEdited, setOrderBeingEdited] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrderToDelete, setSelectedOrderToDelete] = useState(null);
  const { data: books = [] } = useGetBooks();
  const { data: videos = [] } = useGetVideos();
  const [mailDialogOpen, setMailDialogOpen] = useState(false);
  const [selectedOrderForMail, setSelectedOrderForMail] = useState(null);
  const [customEmailOpen, setCustomEmailOpen] = useState(false);
  const [loadingSendCustom, setLoadingSendCustom] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [focused, setFocused] = useState(false);

  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const defaultOrder = {
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "",
    address: {
      street: "",
      city: "",
    },
    status: "",
  }

  const fieldLabels = {
    fullName: "שם מלא",
    email: "מייל",
    phone: "טלפון",
    paymentMethod: "אופן התשלום",
    address: "כתובת",
    status: "סטטוס",
  }

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
  const statusOrder = {
    "התקבלה": 1,
    "מוכנה למשלוח": 2,
    "ממתינה לאישור": 3,
    "נשלחה": 4,
    "הסתיימה": 5
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


  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const statusA = statusOrder[a.status] || 99;
    const statusB = statusOrder[b.status] || 99;

    if (statusA !== statusB) return statusA - statusB;


    // אחר כך לפי סטטוס
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return dateB - dateA;
  });

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
      case "ממתינה לאישור":
        return (
          <Chip
            label="ממתינה לאישור"
            size="small"
            sx={{
              backgroundColor: "rgba(255, 0, 225, 0.37)",
              color: "darkred",
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
    const updateData = orderBeingEdited;
    if (!updateData) return;
    updateMutation.mutate({ orderCode, updateData });
  };
  const sendStatusMutation = useSendStatusEmail();

  const handleMailClick = (order) => {
    setSelectedOrderForMail(order);
    setMailDialogOpen(true);
  };

  const handleSendEmail = (status) => {
    if (!selectedOrderForMail) return;
    if (selectedOrderForMail.status === status) {
      setSnackbar({
        open: true,
        message: `ההזמנה כבר מסומנת כ"${status}". לא נשלח מייל.`,
        severity: "warning",
      });
      return;
    }
    setLoadingStatus(status);
    sendStatusMutation.mutate(
      {
        orderCode: selectedOrderForMail.orderCode,
        status,
      },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: "המייל נשלח בהצלחה",
            severity: "success",
          });
          setMailDialogOpen(false);
          setSelectedOrderForMail(null);
          setLoadingStatus("");
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: "שליחת המייל נכשלה",
            severity: "error",
          });
          setLoadingStatus("");
        },
      }
    );
  };

  const sendCustomMutation = useSendCustomEmail();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem("checkedProducts");
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggle = (key) => {
    const updated = checkedItems.includes(key)
      ? checkedItems.filter((k) => k !== key)
      : [...checkedItems, key];

    setCheckedItems(updated);
    localStorage.setItem("checkedProducts", JSON.stringify(updated));
  };
  const handleCustomEmailSend = async () => {
    setLoadingSendCustom(true);
    sendCustomMutation.mutate(emailForm, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: "המייל נשלח בהצלחה",
          severity: "success",
        });
        setCustomEmailOpen(false);
        setLoadingSendCustom(false);
      },
      onError: () => {
        setSnackbar({
          open: true,
          message: "שליחת המייל נכשלה",
          severity: "error",
        });
        setLoadingSendCustom(false);
      },
    });
  };

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
            width: "400px",
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
                {[
                  "מס' הזמנה",
                  "תאריך",
                  "שם",
                  "אימייל",
                  "טלפון",
                  "כתובת",
                  "סטטוס",
                  "אופן התשלום"
                ].map((col, i) => (
                  <TableCell key={i} align="center">
                    {col}
                  </TableCell>
                ))}
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => {
                const isOpen = expandedRows[order.orderCode];
                const address = order.address || {};
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
                      {[
                        "orderCode",
                        "orderDate",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "status",
                        "paymentMethod"
                      ].map((field) => (
                        <TableCell key={field} align="center">
                          {field == "orderDate" ? (
                            order.orderDate
                              ? new Date(order.orderDate).toLocaleString("he-IL", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                              : "—"
                          ) : field == "address" ? (
                            `${address.street || ""}, ${address.city || ""}`
                          ) : field == "status" ? (
                            getStatusChip(order.status)
                          ) : (
                            order[field]
                          )}
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Tooltip title="ערוך">
                          <IconButton
                            onClick={() => {
                              setOrderBeingEdited({ ...order });
                              setEditDialogOpen(true);
                            }}
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
                        colSpan={10}
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
                                  border: "1px solid #ccc",
                                  textAlign: "center",
                                  padding: "8px",
                                },
                                "& thead th": {
                                  backgroundColor: "#efefef",
                                  color: "#252e49",
                                  fontWeight: 700,
                                  fontSize: "1.05rem",
                                },
                              }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell />
                                  {[
                                    "סוג",
                                    "נושא",
                                    "סימנים",
                                    "גודל",
                                    "כמות",
                                    "מחיר"
                                  ].map((header, index) => (
                                    <TableCell key={index} align="center">
                                      {header}
                                    </TableCell>
                                  ))}
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
                                  const code = isBook
                                    ? p.bookCode
                                    : p.videoCode;
                                  const key = `${order.orderCode}-${code}`;
                                  return (
                                    <TableRow key={key}>
                                      <TableCell align="center">
                                        <Checkbox
                                          checked={checkedItems.includes(key)}
                                          onChange={() => handleToggle(key)}
                                        />
                                      </TableCell>
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

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ערוך הזמנה</DialogTitle>
        <DialogContent>

          {Object.keys(defaultOrder).map((field) => {
            if (field === "address") {
              return (
                <Box
                  component="fieldset"
                  sx={{
                    border: focused ? "2px solid" : "1px solid",
                    borderColor: focused ? "primary.main" : "rgba(0, 0, 0, 0.23)",
                    borderRadius: 1,
                    px: 2,
                    pt: 2,
                    pb: 1.5,
                    mb: 2,
                    transition: "border-color 0.2s",
                    typography: "body1",
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                >
                  <legend
                    style={{
                      padding: "0 8px",
                      fontSize: "0.75rem",
                      color: focused ? "#558e9e" : "rgba(0, 0, 0, 0.6)",
                      lineHeight: "1.4375em",
                      direction: "rtl",
                    }}
                  >
                    כתובת
                  </legend>

                  <TextField
                    variant="standard"
                    label="רחוב"
                    value={orderBeingEdited?.address?.street || ""}
                    onChange={(e) =>
                      setOrderBeingEdited((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          street: e.target.value,
                        },
                      }))
                    }
                    fullWidth
                    margin="dense"
                  />

                  <TextField
                    variant="standard"
                    label="עיר"
                    value={orderBeingEdited?.address?.city || ""}
                    onChange={(e) =>
                      setOrderBeingEdited((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          city: e.target.value,
                        },
                      }))
                    }
                    fullWidth
                    margin="dense"
                  />
                </Box>
              );
            }

            else if (field === "status") {
              return (
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    value={orderBeingEdited?.status}
                    onChange={(e) =>
                      setOrderBeingEdited({
                        ...orderBeingEdited,
                        [field]: e.target.value,
                      })
                    }
                  >
                    {Object.keys(statusOrder).map((status, index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              );
            }

            return (
              <TextField
                key={field}
                type={"text"}
                label={fieldLabels[field] || field}
                value={orderBeingEdited?.[field] || ""}
                fullWidth
                margin="dense"
                InputLabelProps={{}}
                onChange={(e) =>
                  setOrderBeingEdited({
                    ...orderBeingEdited,
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
              debugger;
              handleSave(orderBeingEdited.orderCode);
              console.log("הנתונים שנשלחים:", orderBeingEdited);
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

      <Dialog open={mailDialogOpen} onClose={() => setMailDialogOpen(false)}>
        <Box sx={{ p: 3, minWidth: 300, textAlign: "center" }}>
          <Typography variant="h6" mb={2}>
            שלח מייל עבור {selectedOrderForMail?.fullName}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              disabled={loadingStatus !== ""}
              variant="contained"
              sx={{
                color: "#8a6d00",
                backgroundColor: "rgba(255, 255, 0, 0.2)",
                "&:hover": { backgroundColor: "rgba(255, 255, 0, 0.2)" },
              }}
              onClick={() => handleSendEmail("נשלחה")}
            >
              {loadingStatus === "נשלחה" ? "שולח..." : "הזמנה נשלחה"}
            </Button>
            <Button
              disabled={loadingStatus !== ""}
              variant="contained"
              sx={{
                color: "darkgreen",
                backgroundColor: "rgba(0, 128, 0, 0.15)",
                "&:hover": { backgroundColor: "rgba(0, 128, 0, 0.15)" },
              }}
              onClick={() => handleSendEmail("הסתיימה")}
            >
              {loadingStatus === "הסתיימה" ? "שולח..." : "הזמנה הסתיימה"}
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
              disabled={loadingSendCustom}
              startIcon={
                loadingSendCustom ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {loadingSendCustom ? "שולח..." : "שלח מייל"}
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
