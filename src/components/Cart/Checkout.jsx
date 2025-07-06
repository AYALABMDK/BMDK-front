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
import { useAddOrder } from "../../hooks/useOrders";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState({ city: "", street: "" });

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const navigate = useNavigate();

  const {
    mutate: addOrder,
    isPending,
    isError,
    isSuccess,
    error,
  } = useAddOrder();

  const validateInputs = () => {
    let valid = true;

    // מייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("כתובת האימייל אינה תקינה");
      valid = false;
    } else {
      setEmailError("");
    }

    // טלפון
    const phoneRegex = /^0\d{8,9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("מספר הטלפון צריך להיות 9-10 ספרות ולהתחיל ב-0");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const orderData = {
      fullName,
      email,
      phone,
      orderCode: Date.now(),
      // studentCode: 0,
      status: "התקבלה",
      address: { city: address.city, street: address.street },
      products: cartItems.map((item) => {
        if (item.size !== undefined && item.size !== null) {
          return {
            bookCode: item.code,
            size: item.size,
            quantity: item.quantity,
            price: item.total,
          };
        } else {
          return {
            videoCode: item.code,
            quantity: item.quantity,
            price: item.total,
          };
        }
      }),
    };

    addOrder(orderData, {
      onSuccess: () => {
        clearCart();
        setFullName("");
        setPhone("");
        setEmail("");
        setCreditCard("");
        setExpiry("");
        setCvv("");
        setAddress({ city: "", street: "" });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
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
                    // bgcolor: "#e3f2fd",
                    // color: "#0d47a1",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textAlign: "center",
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
            {cartItems.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    component="div"
                  >
                    {item.size !== undefined ? "ספר " : "סרטון "}{" "}
                    {item.signsTopic}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.signs}
                  </Typography>
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
            error={!!phoneError}
            helperText={phoneError}
          />
          <TextField
            label="כתובת אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!emailError}
            helperText={emailError}
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
              disabled={isPending}
              sx={{
                minWidth: 160,
                minHeight: 48,
                position: "relative",
              }}
            >
              {isPending ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
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
