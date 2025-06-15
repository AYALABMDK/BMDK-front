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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../components/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartDrawer = ({ open, onClose, handleRemove, goToCart }) => {
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          סל קניות
        </Typography>
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
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.signsTopic} (${item.size})`}
                  secondary={`כמות: ${item.quantity} | סה"כ: ${item.total} ₪`}
                />
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
