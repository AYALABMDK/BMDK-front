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
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddOrder } from "../../hooks/useOrders"; // כאן מייבאים את ההוק שהכנת

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
  });
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );
  const navigate = useNavigate();

  const {
    mutate: addOrder,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useAddOrder();

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();

    const orderData = {
      email: email,
      phone: phone,
      orderCode: Date.now(),
      studentCode: 1,
      status: "התקבלה",
      address: { city: address.city, street: address.street },
      products: cartItems.map((item) => ({
        bookCode: item.code,
        size: item.size,
        quantity: item.quantity,
        price: item.total,
      })),
      //   fullName,
    };

    addOrder(orderData, {
      onSuccess: () => {
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      onError: () => {},
    });
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={5} sx={{ p: 4, bgcolor: "#fefefe" }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          עמוד תשלום
        </Typography>

        <Table
          sx={{
            mt: 3,
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
              {["מוצר", "כמות", "גודל", 'סה"כ'].map((header, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    bgcolor: "#e3f2fd",
                    color: "#0d47a1",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textAlign: "center",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.signsTopic}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{item.size}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.total} ₪
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box textAlign="center" mt={4}>
          <Typography variant="h6" fontWeight="bold">
            סה"כ לתשלום: {totalPrice} ₪
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          פרטי תשלום
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            mx: "auto",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="שם מלא"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            label="מספר טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            label="כתובת אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="מספר כרטיס אשראי"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            required
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="תוקף (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              fullWidth
            />
          </Box>
          <TextField
            label="עיר"
            value={address.city}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, city: e.target.value }))
            }
            required
          />

          <TextField
            label="רחוב"
            value={address.street}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, street: e.target.value }))
            }
            required
          />

          <Box textAlign="center" sx={{ mb: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "שלם עכשיו"
              )}
            </Button>
          </Box>

          {isSuccess && (
            <Alert severity="success">
              ההזמנה נקלטה בהצלחה! תודה על ההזמנה.
            </Alert>
          )}
          {isError && (
            <Alert severity="error">
              שגיאה בשליחת ההזמנה:{" "}
              {error?.response?.data?.message || "נסה שוב מאוחר יותר"}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
