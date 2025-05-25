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
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <Container sx={{ mt: 6 }}>
      <Paper elevation={5} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          סל הקניות שלי
        </Typography>

        {cartItems.length === 0 ? (
          <Typography align="center">הסל ריק.</Typography>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ספר</TableCell>
                  <TableCell>סימנים</TableCell>
                  <TableCell>גודל</TableCell>
                  <TableCell>כמות</TableCell>
                  <TableCell>מחיר ליחידה</TableCell>
                  <TableCell>סה"כ</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.signs}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price} ₪</TableCell>
                    <TableCell>{item.total} ₪</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleRemove(index)}
                      >
                        הסר
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box textAlign="center" mt={4}>
              <Typography variant="h6">
                סה"כ לתשלום: {totalPrice} ₪
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
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
