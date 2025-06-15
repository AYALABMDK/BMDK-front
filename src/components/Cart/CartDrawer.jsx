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
import { useCart } from "./CartContext";

const CartDrawer = ({ open, onClose, handleRemove, goToCart }) => {
  const { cartItems, updateQuantity, updateSize } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleQuantityChange = (e, index) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1);
    updateQuantity(index, newQty);
  };

  const handleSizeChange = (e, index) => {
    const newSize = e.target.value;
    updateSize(index, newSize);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2, direction: "rtl" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            סל קניות
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {cartItems.length === 0 ? (
            <Typography align="center" sx={{ mt: 2 }}>
              הסל ריק.
            </Typography>
          ) : (
            cartItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 1,
                  mb: 2,
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.signsTopic}
                  secondary={
                    <>
                      <Typography variant="body2">
                        מחיר ליחידה: {item.price} ₪
                      </Typography>
                      <Typography variant="body2">
                        סה"כ: {item.total} ₪
                      </Typography>
                    </>
                  }
                  sx={{ width: "100%" }}
                />

                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <FormControl size="small" sx={{ minWidth: 90 }}>
                    <InputLabel id={`size-label-${index}`}>גודל</InputLabel>
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

                  <TextField
                    label="כמות"
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, index)}
                    inputProps={{ min: 1 }}
                    sx={{ width: 80 }}
                  />
                </Box>
              </ListItem>
            ))
          )}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography align="center" fontWeight="bold">
          סה"כ לתשלום: {total} ₪
        </Typography>

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant="contained" color="primary">
            לתשלום
          </Button>
          <Button variant="outlined" onClick={goToCart}>
            מעבר לסל
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
