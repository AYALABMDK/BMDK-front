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
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          position: "relative",
          fontSize: "1.6rem",
          mt: 2,
        }}
      >
        הזמנת הספר שלך
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", left: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pt: 3 }}>
        <Box display="flex" justifyContent="center" mt={3}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* טור ימין - נושא, סימנים, מחיר */}
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  {book.signsTopic}
                </Typography>
                <Typography>
                  סימנים:{" "}
                  <Typography component="span" fontWeight="medium">
                    {book.signs}
                  </Typography>
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  מחיר: ₪{currentPrice * form.quantity}
                </Typography>
              </Box>
            </Grid>

            {/* טור שמאל - תיבות טקסט */}
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
              >
                <TextField
                  select
                  label="בחר גודל"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="קטן">קטן A5</MenuItem>
                  <MenuItem value="גדול">גדול A4</MenuItem>
                </TextField>
                <TextField
                  type="number"
                  name="quantity"
                  label="כמות"
                  value={form.quantity}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* קו הפרדה + כפתור */}
        <Divider sx={{ my: 4, borderColor: "#ccc" }} />

        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <Button variant="contained" onClick={handleAddToCart} sx={{ px: 6 }}>
            הוסף לסל
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookPurchaseModal;
