import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const isBook = (item) => item.size !== undefined;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, updateSize } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const handleQuantityChange = (e, index) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1);
    updateQuantity(index, newQty);
  };

  const handleSizeChange = (e, index) => {
    const newSize = e.target.value;
    updateSize(index, newSize);
  };

  return (
    <Container
      sx={{
        mt: 6,
        py: 6,
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
      }}
    >
      <Paper elevation={5} sx={{ p: 4, bgcolor: "#f9f9f9" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          סל הקניות שלי
        </Typography>

        {cartItems.length === 0 ? (
          <Typography align="center" sx={{ mt: 4 }}>
            הסל ריק.
          </Typography>
        ) : (
          <>
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                "& td": {
                  bgcolor: "white",
                  fontSize: "0.95rem",
                  borderRadius: 1,
                  paddingY: 1,
                },
              }}
            >
              <TableHead>
                <TableRow>
                  {[
                    "סוג מוצר",
                    "תיאור",
                    "גודל",
                    "כמות",
                    "מחיר ליחידה",
                    'סה"כ',
                    "",
                  ].map((header, idx) => (
                    <TableCell
                      key={idx}
                      sx={{
                        bgcolor: "#e3f2fd",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        // borderBottom: "2px solid #90caf9",
                        textAlign: "center",
                        py: 2,
                        backgroundColor: '#efefef',
                        color: '#558e9e'
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {isBook(item) ? "ספר" : "סרטון"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {isBook(item) ? (
                        <>
                          <Typography>{item.signsTopic}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.signs}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography>{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.signsTopic}
                          </Typography>
                        </>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {isBook(item) ? (
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                          <Select
                            value={item.size}
                            onChange={(e) => handleSizeChange(e, index)}
                          >
                            <MenuItem value="קטן">קטן</MenuItem>
                            <MenuItem value="גדול">גדול</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(e, index)}
                        inputProps={{ min: 1 }}
                        sx={{ width: 70 }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.price != null ? `${item.price} ₪` : "0 ₪"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.total != null ? `${item.total} ₪` : "0 ₪"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        color="error"
                        onClick={() => removeFromCart(index)}
                      >
                        הסר
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {cartItems.length > 0 && (
              <Box textAlign="center" mt={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  סה"כ לתשלום: {totalPrice} ₪
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, px: 5, py: 1.5, fontSize: "1rem" }}
                  onClick={() => navigate("/checkout")}
                >
                  לתשלום
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Cart;
