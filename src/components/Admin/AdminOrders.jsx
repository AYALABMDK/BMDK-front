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

import {
  useGetOrders,
  useDeleteOrder,
  useUpdateOrder,
} from "../../hooks/useOrders";

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
            sx={{ backgroundColor: "rgba(255, 0, 0, 0.1)", color: "darkred" }}
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
            }}
          />
        );
      case "נשלחה":
        return (
          <Chip
            label="נשלחה"
            size="small"
            sx={{ backgroundColor: "rgba(255, 255, 0, 0.2)", color: "#8a6d00" }}
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
                          <IconButton>
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
                            <h4>מוצרים בהזמנה:</h4>
                            {order.products.map((p, i) => (
                              <Box
                                key={i}
                                style={{ fontSize: "0.9rem", marginBottom: 6 }}
                              >
                                {p.bookCode
                                  ? `📘 ספר (קוד ${p.bookCode}) | גודל: ${p.size} | כמות: ${p.quantity} | מחיר: ${p.price} ₪`
                                  : `🎬 סרטון (קוד ${p.videoCode}) | כמות: ${p.quantity} | מחיר: ${p.price} ₪`}
                              </Box>
                            ))}
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
      <Button variant="contained" color="error" onClick={handleConfirmedDelete}>
        כן, מחק
      </Button>
      <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
        ביטול
      </Button>
    </Box>
  </Box>
</Dialog>

    </div>
  );
};

export default AdminOrders;
