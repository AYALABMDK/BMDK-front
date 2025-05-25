// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Container,
//   Tabs,
//   Tab
// } from "@mui/material";
// import { motion } from "framer-motion";

// const bookData = {
//       "חושן א": [ "ספר א1", "ספר א2","ספר א1", "ספר א2","ספר א1", "ספר א2"],
//   "חושן ב": ["ספר ב1", "ספר ב2"],
//   "חושן ג": ["ספר ג1"],
//   "אבן העזר": ["ספר ד1", "ספר ד2"],

// };

// const BooksPage = () => {
//   const [selectedTopic, setSelectedTopic] = useState(Object.keys(bookData)[0]);

//   return (
//     <Box sx={{ background: "#f5f5f5", minHeight: "100vh", py: 10 }}>
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <Typography
//             variant="h3"
//             align="center"
//             fontWeight="bold"
//             gutterBottom
//           >
//             מכירת ספרים
//           </Typography>

//           <Tabs
//             value={selectedTopic}
//             onChange={(e, newValue) => setSelectedTopic(newValue)}
//             variant="scrollable"
//             scrollButtons="auto"
//             textColor="primary"
//             indicatorColor="primary"
//             sx={{ mt: 4, mb: 6, direction: "rtl" }}
//           >
//             {Object.keys(bookData).map((topic) => (
//               <Tab
//                 key={topic}
//                 label={topic}
//                 value={topic}
//                 sx={{ fontWeight: "bold" }}
//               />
//             ))}
//           </Tabs>

//           <Grid container spacing={3} justifyContent="center">
//             {bookData[selectedTopic].map((book, idx) => (
//               <Grid item xs={12} sm={6} md={3} key={idx}>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold" gutterBottom>
//                         {book}
//                       </Typography>
//                       <Button variant="outlined" color="primary">
//                         לקניה
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default BooksPage;
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

const categories = [
  "חושן א",
  "חושן ב",
  "חושן ג",
  "אבן העזר"
];

const books = [
  { title: "בשר וחלב", price: 40, signs: "א-ו", category: "חושן א" },
  { title:"חובל בחברו", price: 55, signs: "עח-קיט", category: "חושן ב" },
  { title: "חושןג", price: 70, signs: "ל-ס", category: "חושן ג" },
  { title: "נזק", price: 65, signs: "מ-פ", category: "אבן העזר" },
  { title: "גזל", price: 50, signs: "א-ב", category: "חושן א" },
  { title: "הלכות", price: 60, signs: "ג-ד", category: "חושן ב" },
  { title: "נושא", price: 80, signs: "ה-ו", category: "חושן ג" },
    { title: "גזל", price: 50, signs: "א-ב", category: "חושן א" },
  { title: "הלכות", price: 60, signs: "ג-ד", category: "חושן ב" },
  { title: "נושא", price: 80, signs: "ה-ו", category: "חושן ג" },
  { title: "נושא", price: 90, signs: "ז-ח", category: "אבן העזר" },];

const BookCard = ({ title, price, signs }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    style={{ width: 250 }}
  >
    <Card
      sx={{
        background: "#fff",
        borderRadius: 4,
        boxShadow: 3,
        textAlign: "center",
        direction: "rtl",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          סימנים: {signs}
        </Typography>
        <Typography color="primary" fontWeight="bold" sx={{ mb: 2 }}>
          מחיר: ₪{price}
        </Typography>
      </CardContent>
      <Button variant="outlined" size="small">
        לרכישה
      </Button>
    </Card>
  </motion.div>
);

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("רפס");

  const filteredBooks = books.filter((book) => book.category === selectedCategory);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #f3f4f6, #e0e7ff)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container>
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ direction: "rtl" }}
        >
          מכירת ספרים
        </Typography>

        {/* קטגוריות */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1.5,
            my: 4,
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === selectedCategory ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(cat)}
              sx={{ borderRadius: 3, px: 3 }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* ספרים */}
        <Grid container spacing={3} justifyContent="center">
          {filteredBooks.length ? (
            filteredBooks.map((book) => (
              <Grid item key={book.title}>
                <BookCard {...book} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ mt: 4 }} textAlign="center">
              אין ספרים להצגה בקטגוריה זו
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default BooksPage;
