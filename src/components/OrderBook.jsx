import React, { useState } from "react";
import {
  Box, Button, Typography, Grid, Card, CardContent, Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { useGetBooks, useGetBooksByTopicCode } from "../hooks/useBooks";
import { useGetTopics } from "../hooks/useTopics";
import BookPurchaseModal from "../components/BookPurchaseModal";

// כרטיס ספר יחיד
const BookCard = ({ signsTopic, bigBookPrice, signs, onPurchaseClick }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} style={{ width: 250 }}>
    <Card sx={{
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
    }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>{signsTopic}</Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>סימנים: {signs}</Typography>
        <Typography color="primary" fontWeight="bold" sx={{ mb: 2 }}>מחיר: ₪{bigBookPrice}</Typography>
      </CardContent>
      <Button variant="outlined" size="small" onClick={onPurchaseClick}>
        לרכישה
      </Button>
    </Card>
  </motion.div>
);

// עמוד הספרים הראשי
const BooksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("הכול");

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const { data: topics = [] } = useGetTopics();

  const selectedTopic = topics.find(t => t.name === selectedCategory);
  const topicCode = selectedTopic ? selectedTopic.id : null;

  const {
    data: booksByTopic,
    isLoading: isLoadingByTopic,
    isError: isErrorByTopic,
  } = useGetBooksByTopicCode(topicCode);

  const {
    data: allBooks,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetBooks();

  const booksToDisplay = selectedCategory === "הכול" ? allBooks : booksByTopic;
  const isLoading = selectedCategory === "הכול" ? isLoadingAll : isLoadingByTopic;
  const isError = selectedCategory === "הכול" ? isErrorAll : isErrorByTopic;

  const categories = ["הכול", ...topics.map(t => t.name)];

  return (
    <Box sx={{ background: "linear-gradient(to bottom right, #f3f4f6, #e0e7ff)", minHeight: "100vh", py: 8 }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom sx={{ direction: "rtl" }}>
          מכירת ספרים
        </Typography>

        {/* קטגוריות */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5, my: 4 }}>
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
        {isLoading ? (
          <Typography textAlign="center">טוען ספרים...</Typography>
        ) : isError ? (
          <Typography color="error" textAlign="center">אירעה שגיאה בטעינת הספרים.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {booksToDisplay && booksToDisplay.length ? (
              booksToDisplay.map((book) => (
                <Grid item key={book._id}>
                  <BookCard
                    {...book}
                    onPurchaseClick={() => handleOpenModal(book)}
                  />
                </Grid>
              ))
            ) : (
              <Typography sx={{ mt: 4 }} textAlign="center">
                אין ספרים להצגה בקטגוריה זו
              </Typography>
            )}
          </Grid>
        )}

        {/* מודל רכישה */}
        <BookPurchaseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          book={selectedBook}
          onAddToCart={(item) => console.log('הוסף לסל:', item)}
        />
      </Container>
    </Box>
  );
};

export default BooksPage;
