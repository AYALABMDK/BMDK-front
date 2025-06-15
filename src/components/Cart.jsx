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
} from "@mui/material";
import { useCart } from "../components/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  return (
    <Container sx={{ mt: 6, direction: "rtl" }}>
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
                    "ספר",
                    "סימנים",
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
                        color: "#0d47a1",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        borderBottom: "2px solid #90caf9",
                        textAlign: "center",
                        py: 2,
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
                      {item.signsTopic}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.signs}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.size}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.price ||
                        (item.size === "גדול"
                          ? item.bigBookPrice
                          : item.smallBookPrice)}{" "}
                      ₪
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.total} ₪
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

            <Box textAlign="center" mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                סה"כ לתשלום: {totalPrice} ₪
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, px: 5, py: 1.5, fontSize: "1rem" }}
              >
                לתשלום
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Cart;
