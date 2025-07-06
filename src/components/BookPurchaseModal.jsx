// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   MenuItem,
//   Typography,
//   Button,
//   Grid,
//   Box,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useCart } from "./Cart/CartContext";

// const BookPurchaseModal = ({ open, onClose, book }) => {
//   const { addToCart } = useCart();

//   const [form, setForm] = useState({
//     size: "גדול",
//     quantity: 1,
//   });

//   useEffect(() => {
//     if (book) {
//       setForm({ size: "גדול", quantity: 1 });
//     }
//   }, [book]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddToCart = () => {
//     const currentPrice =
//       form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;
//     const item = {
//       ...book,
//       ...form,
//       total: currentPrice * form.quantity,
//     };
//     addToCart(item);
//     onClose();
//   };

//   if (!book) return null;

//   const currentPrice =
//     form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
//       <DialogTitle textAlign="center" sx={{ fontWeight: "bold" }}>
//         הזמנת הספר שלך
//       </DialogTitle>
//       <DialogContent>
//         <Grid container spacing={3} sx={{ mt: 1 }}>
//           <Grid item xs={12} textAlign="center">
//             <Typography variant="h6" fontWeight="bold">
//               {book.signsTopic}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Box sx={{ mb: 1 }}>
//               <Typography variant="body1" sx={{ mb: 0.5 }}>
//                 סימנים:{" "}
//                 <Typography component="span" fontWeight="medium">
//                   {book.signs}
//                 </Typography>
//               </Typography>
//               <Typography
//                 variant="body1"
//                 color="primary"
//                 fontWeight="bold"
//                 sx={{ mb: 2 }}
//               >
//                 מחיר: ₪{currentPrice * form.quantity}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               select
//               fullWidth
//               label="בחר גודל"
//               name="size"
//               value={form.size}
//               onChange={handleChange}
//             >
//               <MenuItem value="קטן">קטן</MenuItem>
//               <MenuItem value="גדול">גדול</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               type="number"
//               name="quantity"
//               label="כמות"
//               value={form.quantity}
//               onChange={handleChange}
//               inputProps={{ min: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} textAlign="center">
//             <Button
//               variant="contained"
//               onClick={handleAddToCart}
//               sx={{ px: 5 }}
//             >
//               הוסף לסל
//             </Button>
//           </Grid>
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BookPurchaseModal;






// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   MenuItem,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState, useEffect } from "react";
// import { useCart } from "./Cart/CartContext";

// const BookPurchaseModal = ({ open, onClose, book }) => {
//   const { addToCart } = useCart();

//   const [form, setForm] = useState({
//     size: "גדול",
//     quantity: 1,
//   });

//   useEffect(() => {
//     if (book) {
//       setForm({ size: "גדול", quantity: 1 });
//     }
//   }, [book]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddToCart = () => {
//     const currentPrice =
//       form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;
//     const item = {
//       ...book,
//       ...form,
//       total: currentPrice * form.quantity,
//     };
//     addToCart(item);
//     onClose();
//   };

//   if (!book) return null;

//   const currentPrice =
//     form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
//       <Box sx={{ position: "relative" }}>
//         {/* אייקון סגירה בצד שמאל עליון */}
//         <IconButton
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             top: 8,
//             left: 8,
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <DialogTitle
//           textAlign="center"
//           sx={{ fontWeight: "bold", mt: 1, mb: 3 }}
//         >
//           הזמנת הספר שלך
//         </DialogTitle>

//         <DialogContent>
//           {/* שורת נושא, סימנים ומחיר */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 1,
//               mb: 2,
//             }}
//           >
//             <Typography fontWeight="bold">{book.signsTopic}</Typography>

//             <Typography fontSize="0.95rem" color="text.secondary">
//               סימנים: {book.signs}
//             </Typography>

//             <Typography color="primary" fontWeight="bold">
//               ₪{currentPrice * form.quantity}
//             </Typography>
//           </Box>

//           {/* קו מפריד */}
//           <Divider sx={{ mb: 3 }} />

//           <Grid container spacing={2}>
//             {/* גודל וכמות בשורה אחת */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="בחר גודל"
//                 name="size"
//                 value={form.size}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="קטן">קטן</MenuItem>
//                 <MenuItem value="גדול">גדול</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 name="quantity"
//                 label="כמות"
//                 value={form.quantity}
//                 onChange={handleChange}
//                 inputProps={{ min: 1 }}
//               />
//             </Grid>

//             {/* כפתור במרכז */}
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Button
//                   variant="contained"
//                   onClick={handleAddToCart}
//                   sx={{ px: 5, mt: 2 }}
//                 >
//                   הוסף לסל
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </DialogContent>
//       </Box>
//     </Dialog>
//   );
// };

// export default BookPurchaseModal;





// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   MenuItem,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState, useEffect } from "react";
// import { useCart } from "./Cart/CartContext";

// const BookPurchaseModal = ({ open, onClose, book }) => {
//   const { addToCart } = useCart();

//   const [form, setForm] = useState({
//     size: "גדול",
//     quantity: 1,
//   });

//   useEffect(() => {
//     if (book) {
//       setForm({ size: "גדול", quantity: 1 });
//     }
//   }, [book]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddToCart = () => {
//     const currentPrice =
//       form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;
//     const item = {
//       ...book,
//       ...form,
//       total: currentPrice * form.quantity,
//     };
//     addToCart(item);
//     onClose();
//   };

//   if (!book) return null;

//   const currentPrice =
//     form.size === "גדול" ? book.bigBookPrice : book.smallBookPrice;

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
//       <Box sx={{ position: "relative" }}>
//         {/* אייקון סגירה */}
//         <IconButton
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             top: 8,
//             left: 8,
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <DialogTitle textAlign="center" sx={{ fontWeight: "bold", mt: 1, mb: 3 }}>
//           הזמנת הספר שלך
//         </DialogTitle>
//           {/* <Divider sx={{ mb: 3 }} /> */}

//         <DialogContent>
//           {/* מידע על הספר */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 1,
//               mb: 2,
//             }}
//           >
//             <Typography fontWeight="bold">{book.signsTopic}</Typography>

//             <Typography fontSize="0.95rem" color="text.secondary">
//               סימנים: {book.signs}
//             </Typography>

//             <Typography color="primary" fontWeight="bold">
//               ₪{currentPrice * form.quantity}
//             </Typography>
//           </Box>


//           {/* תיבות קלט ממורכזות */}
//           <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mb={3} >
//             <TextField
//               select
//               label="בחר גודל"
//               name="size"
//               value={form.size}
//               onChange={handleChange}
//               sx={{ width: 150 }}
//             >
//               <MenuItem value="קטן">קטן</MenuItem>
//               <MenuItem value="גדול">גדול</MenuItem>
//             </TextField>

//             <TextField
//               type="number"
//               name="quantity"
//               label="כמות"
//               value={form.quantity}
//               onChange={handleChange}
//               inputProps={{ min: 1 }}
//               sx={{ width: 150 }}
//             />
//           </Box>

//           {/* כפתור בתחתית במרכז */}
//           <Box display="flex" justifyContent="center">
//             <Button variant="contained" onClick={handleAddToCart} sx={{ px: 5 }}>
//               הוסף לסל
//             </Button>
//           </Box>
//         </DialogContent>
//       </Box>
//     </Dialog>
//   );
// };

// export default BookPurchaseModal;



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
          <Grid container spacing={5} justifyContent="center" alignItems="flex-start">
            {/* טור ימין - נושא, סימנים, מחיר */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  {book.signsTopic}
                </Typography>
                <Typography>
                  סימנים: <Typography component="span" fontWeight="medium">{book.signs}</Typography>
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  מחיר: ₪{currentPrice * form.quantity}
                </Typography>
              </Box>
            </Grid>

            {/* טור שמאל - תיבות טקסט */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                <TextField
                  select
                  label="בחר גודל"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="קטן">קטן</MenuItem>
                  <MenuItem value="גדול">גדול</MenuItem>
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
