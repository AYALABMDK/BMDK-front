// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Container,
//   Grid,
//   Card,
//   CardContent,
// } from "@mui/material";

// const BookPurchasePage = ({ book }) => {
//   const [size, setSize] = useState("גדול");
//   const [quantity, setQuantity] = useState(1);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const unitPrice = book.price + (size === "גדול" ? 10 : 0);
//   const totalPrice = unitPrice * quantity;

//   const handleChange = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     alert("ההזמנה התקבלה!\nסה\"כ לתשלום: ₪" + totalPrice);
//   };

//   return (
//     <Box sx={{ py: 6, background: "#f9fafb", minHeight: "100vh" }}>
//       <Container maxWidth="md">
//         <Card sx={{ p: 4 }}>
//           <CardContent>
//             <Typography variant="h4" gutterBottom sx={{ direction: "rtl" }}>
//               פרטי ההזמנה
//             </Typography>

//             <Typography variant="h6" sx={{ direction: "rtl", mb: 2 }}>
//               ספר: {book.title} | סימנים: {book.signs} | מחיר בסיס: ₪{book.price}
//             </Typography>

//             <Grid container spacing={2} sx={{ direction: "rtl" }}>
//               <Grid item xs={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>גודל הספר</InputLabel>
//                   <Select value={size} onChange={(e) => setSize(e.target.value)}>
//                     <MenuItem value="קטן">קטן</MenuItem>
//                     <MenuItem value="גדול">גדול</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   type="number"
//                   label="כמות"
//                   value={quantity}
//                   onChange={(e) => setQuantity(parseInt(e.target.value))}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="שם מלא"
//                   name="name"
//                   value={userInfo.name}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="אימייל"
//                   name="email"
//                   value={userInfo.email}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="טלפון"
//                   name="phone"
//                   value={userInfo.phone}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="כתובת למשלוח"
//                   name="address"
//                   value={userInfo.address}
//                   onChange={handleChange}
//                   fullWidth
//                   multiline
//                   rows={2}
//                 />
//               </Grid>
//             </Grid>

//             <Typography variant="h6" sx={{ mt: 4, textAlign: "right" }}>
//               סה"כ לתשלום: ₪{totalPrice}
//             </Typography>

//             <Box sx={{ mt: 2, textAlign: "left" }}>
//               <Button variant="contained" color="primary" onClick={handleSubmit}>
//                 אישור ותשלום
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default BookPurchasePage;

// // דוגמה לשימוש:


import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const BookOrder = () => {
//   const navigate = useNavigate();
  const [form, setForm] = useState({
    size: "קטן",
    quantity: 1,
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const book = {
    id: "1",
    title: "חושן משפט - חלק א",
    price: 50,
    signs: "א - כ",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    const item = { ...book, ...form, total: book.price * form.quantity };
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...existingCart, item]));
    // navigate("/cart");
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Paper elevation={5} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          הזמנת ספר
        </Typography>
        <Grid container spacing={3}>
          {/* פרטי הספר */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">שם הספר: {book.title}</Typography>
            <Typography>סימנים: {book.signs}</Typography>
            <Typography>מחיר: {book.price} ₪</Typography>
            <TextField
              select
              fullWidth
              label="בחר גודל"
              name="size"
              value={form.size}
              onChange={handleChange}
              sx={{ mt: 2 }}
            >
              <MenuItem value="קטן">קטן</MenuItem>
              <MenuItem value="גדול">גדול</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              name="quantity"
              label="כמות"
              value={form.quantity}
              onChange={handleChange}
              sx={{ mt: 2 }}
              inputProps={{ min: 1 }}
            />
          </Grid>

          {/* פרטי המזמין */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="שם מלא"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="טלפון"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="מייל"
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="כתובת"
              name="address"
              value={form.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button variant="contained" size="large" onClick={handleAddToCart}>
              הוסף לסל
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookOrder;
