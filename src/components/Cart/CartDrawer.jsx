import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ open, onClose, handleRemove, goToCart }) => {
  const { cartItems, updateQuantity, updateSize } = useCart();
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleQuantityChange = (e, index) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1);
    updateQuantity(index, newQty);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSizeChange = (e, index) => {
    const newSize = e.target.value;
    updateSize(index, newSize);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { zIndex: 1401 },
      }}
    >
      <Box
        sx={{
          width: 320,
          height: "100%",
          p: 2,
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ width: "100%", mb: 1 }}
          >
            סל קניות
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 1 }}>
          <List>
            {cartItems.length === 0 ? (
              <Typography align="center" sx={{ mt: 2 }}>
                הסל ריק.
              </Typography>
            ) : (
              cartItems.map((item, index) => {
                const isBook = item.size !== undefined;

                return (
                  <ListItem
                    key={index}
                    sx={{ flexDirection: "column", gap: 1, mb: 2 }}
                  >
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {isBook ? " ספר " : " סרטון "}
                            {isBook ? item.signsTopic : item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isBook ? item.signs : item.signsTopic}
                          </Typography>
                        </>
                      }
                      secondary={
                        editingIndex === index ? (
                          <>
                            <TextField
                              label="כמות"
                              type="number"
                              size="small"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(e, index)}
                              inputProps={{ min: 1 }}
                              sx={{ width: 80, mb: 1 }}
                            />
                            {isBook && (
                              <FormControl size="small" sx={{ minWidth: 90 }}>
                                <InputLabel id={`size-label-${index}`}>
                                  גודל
                                </InputLabel>
                                <Select
                                  labelId={`size-label-${index}`}
                                  value={item.size}
                                  label="גודל"
                                  onChange={(e) => handleSizeChange(e, index)}
                                >
                                  <MenuItem value="קטן">קטן</MenuItem>
                                  <MenuItem value="גדול">גדול</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                            <Box sx={{ mt: 1 }}>
                              <Button onClick={() => setEditingIndex(null)}>
                                סיום עריכה
                              </Button>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Typography variant="body2">
                              {item.price} ₪ × {item.quantity} יחידות
                            </Typography>
                            <Typography variant="body2">
                              סה"כ: {item.price * item.quantity} ₪
                            </Typography>
                            {isBook && (
                              <Typography variant="body2">
                                גודל: {item.size}
                              </Typography>
                            )}
                          </>
                        )
                      }
                      sx={{ width: "100%" }}
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton edge="end" onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                );
              })
            )}
          </List>
        </Box>

        {cartItems.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography align="center" fontWeight="bold">
              סה"כ לתשלום: {total} ₪
            </Typography>

            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                לתשלום
              </Button>
              <Button variant="outlined" onClick={goToCart}>
                מעבר לסל
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
