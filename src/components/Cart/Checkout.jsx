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
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState({ city: "", street: "" });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("אשראי");
  const [proofFile, setProofFile] = useState(null);

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("כתובת האימייל אינה תקינה");
      valid = false;
    } else {
      setEmailError("");
    }

    const phoneRegex = /^0\d{8,9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("מספר הטלפון צריך להיות 9-10 ספרות ולהתחיל ב-0");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const canSubmit = () => {
    const requiredFieldsFilled =
      fullName && phone && email && address.city && address.street;

    if (!requiredFieldsFilled) return false;

    if (paymentMethod === "אשראי") {
      return cardHolder && creditCard && expiry && cvv;
    }

    if (paymentMethod === "העברה בנקאית") {
      return !!proofFile;
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const orderData = {
      fullName,
      email,
      phone,
      orderCode: Date.now(),
      status: paymentMethod === "אשראי" ? "התקבלה" : "ממתינה לאישור",
      address: { city: address.city, street: address.street },
      paymentMethod,
      products: cartItems.map((item) =>
        item.size !== undefined
          ? {
              bookCode: item.code,
              size: item.size,
              quantity: item.quantity,
              price: item.total,
            }
          : {
              videoCode: item.code,
              quantity: item.quantity,
              price: item.total,
            }
      ),
    };

    const formData = new FormData();
    formData.append("order", JSON.stringify(orderData));
    if (paymentMethod === "העברה בנקאית" && proofFile) {
      formData.append("proofFile", proofFile);
    }

    addOrder(formData, {
      onSuccess: () => {
        clearCart();
        setFullName("");
        setPhone("");
        setEmail("");
        setCreditCard("");
        setCardHolder("");
        setExpiry("");
        setCvv("");
        setAddress({ city: "", street: "" });
        setProofFile(null);
        setPaymentMethod("אשראי");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
    });
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }} component="form" onSubmit={handleSubmit}>
      <Paper elevation={5} sx={{ p: 4, bgcolor: "#fefefe" }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          עמוד תשלום
        </Typography>

        {/* טבלת מוצרים */}
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
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textAlign: "center",
                    backgroundColor: "#efefef",
                    color: "#558e9e",
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
                    {item.size !== undefined
                      ? `ספר ${item.signsTopic}`
                      : `סרטון ${item.title}`}{" "}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.size !== undefined ? item.signs : item.signsTopic}
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

        {/* פרטי המזמין */}
        <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
          פרטי המזמין
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            mx: "auto",
          }}
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
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* אמצעי תשלום */}
        <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
          אמצעי תשלום
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          <Button
            variant={paymentMethod === "אשראי" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("אשראי")}
          >
            כרטיס אשראי
          </Button>
          <Button
            variant={
              paymentMethod === "העברה בנקאית" ? "contained" : "outlined"
            }
            onClick={() => setPaymentMethod("העברה בנקאית")}
          >
            העברה בנקאית
          </Button>
        </Box>

        {/* תשלום באשראי */}
        {paymentMethod === "אשראי" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <TextField
              label="שם בעל הכרטיס"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!canSubmit() || isPending}
              sx={{
                mt: 4,
                mx: "auto",
                px: 4,
                minWidth: 180,
                minHeight: 50,
                borderRadius: 8,
                fontWeight: "bold",
                backgroundColor: "#0D1E46",
                "&:hover": { backgroundColor: "#143160" },
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
                    mt: "-12px",
                    ml: "-12px",
                  }}
                />
              ) : (
                "סיום תשלום באשראי"
              )}
            </Button>
          </Box>
        )}

        {/* תשלום בהעברה בנקאית */}
        {paymentMethod === "העברה בנקאית" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 600,
              mx: "auto",
              mt: 2,
              p: 3,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#f9f9f9",
              border: "1px solid #e0e0e0",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              textAlign="center"
            >
              פרטי העברה בנקאית
            </Typography>

            <Box sx={{ lineHeight: 2 }}>
              <Typography variant="body1">
                <strong>שם המוטב:</strong> אילה גיאת
              </Typography>
              <Typography variant="body1">
                <strong>מספר חשבון:</strong> 634161
              </Typography>
              <Typography variant="body1">
                <strong>בנק:</strong> פאגי
              </Typography>
              <Typography variant="body1">
                <strong>סניף:</strong> 179
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                לאחר ביצוע ההעברה, יש להעלות קובץ אישור לצורך השלמת ההזמנה.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{
                px: 2,
                borderRadius: 4,
                textTransform: "none",
                fontWeight: "bold",
                color: "#0D1E46",
                borderColor: "#0D1E46",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#143160",
                  color: "#143160",
                },
              }}
            >
              העלאת קובץ
              <input
                type="file"
                hidden
                accept="image/*,application/pdf"
                onChange={(e) => setProofFile(e.target.files[0])}
              />
            </Button>
            {proofFile && (
              <Typography variant="body2" color="text.secondary">
                קובץ שנבחר: {proofFile.name}
              </Typography>
            )}
            <Typography
              variant="body1"
              sx={{
                color: "#444",
                maxWidth: 500,
                textAlign: "center",
                lineHeight: 1.8,
              }}
            >
              לאחר שהמנהל יאשר את ההעברה הבנקאית, ישלחו אליך פרטי ההזמנה לכתובת
              האימייל שסיפקת. אנא ודא שהפרטים שמילאת נכונים.
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!canSubmit() || isPending}
              sx={{
                minWidth: 180,
                minHeight: 50,
                borderRadius: 8,
                backgroundColor: "#0D1E46",
                fontWeight: "bold",
                fontSize: "1rem",
                px: 4,
                "&:hover": {
                  backgroundColor: "#143160",
                },
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
                    mt: "-12px",
                    ml: "-12px",
                  }}
                />
              ) : (
                "סיום תשלום בהעברה"
              )}
            </Button>
          </Box>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ mt: 4 }}>
            ההזמנה נקלטה בהצלחה! תודה על ההזמנה.
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ mt: 4 }}>
            שגיאה בשליחת ההזמנה:{" "}
            {error?.response?.data?.message || "נסה שוב מאוחר יותר"}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
