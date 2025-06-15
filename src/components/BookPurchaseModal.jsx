import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useCart } from "./Cart/CartContext";

const BookPurchaseModal = ({ open, onClose, book }) => {
  const { addToCart } = useCart();

  const [form, setForm] = useState({
    size: "גדול",
    quantity: 1,
  });

  useEffect(() => {
    if (book) {
      setForm({ size: "גדול", quantity: 1 });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    const currentPrice =
      form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;
    const item = {
      ...book,
      ...form,
      total: currentPrice * form.quantity,
    };
    addToCart(item);
    onClose();
  };

  if (!book) return null;

  const currentPrice =
    form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle textAlign="center" sx={{ fontWeight: "bold" }}>
        הזמנת הספר שלך
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              {book.signsTopic}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                סימנים:{" "}
                <Typography component="span" fontWeight="medium">
                  {book.signs}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                מחיר: ₪{currentPrice * form.quantity}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="בחר גודל"
              name="size"
              value={form.size}
              onChange={handleChange}
            >
              <MenuItem value="קטן">קטן</MenuItem>
              <MenuItem value="גדול">גדול</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              name="quantity"
              label="כמות"
              value={form.quantity}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              onClick={handleAddToCart}
              sx={{ px: 5 }}
            >
              הוסף לסל
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookPurchaseModal;
