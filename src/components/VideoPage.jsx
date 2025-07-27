import React from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Container,
  Button,
} from "@mui/material";
import { useGetVideos } from "../hooks/useVideo";
import { useGetTopics } from "../hooks/useTopics";
import { useCart } from "./Cart/CartContext";
import ProductCard from "../components/ProductCard";
import PageHeaderImage from "./PageHeaderImage";
import { useNavigate } from "react-router-dom";

const OnlineLearningPage = () => {
  const { data: videos = [], isLoading, isError } = useGetVideos();
  const { data: topics = [] } = useGetTopics();
  const { addToCart, openDrawer } = useCart();

  const navigate = useNavigate();

  const getTopicName = (code) => {
    const topic = topics.find((t) => t.id === code);
    return topic ? topic.name : `נושא ${code}`;
  };

  return (
        <Box sx={{  minHeight: "100vh", py: 8 }}>
            <Container>
    <div
      style={{
        textAlign: "center",
        // display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
<PageHeaderImage src="/assets/ccc.png" alt="למידה מקוונת" />

      <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
        למידה מקוונת
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        בעמוד זה תוכלו להתרשם ממבחר שיעורים מקוונים בנושאים מגוונים
      </Typography>
 {/* כפתור לסרטון דוגמה */}
        <Box sx={{ mt: 2, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/LessonExample")} // כאן הנתיב לעמוד שיש לך
            sx={{
              px: 4,
              py: 2,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: 3,
              minWidth: "200px",
            }}
          >
            לסרטון דוגמה לחצו כאן
          </Button>
        </Box>
        {isLoading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : isError ? (
          <Typography color="error" sx={{ mt: 4 }}>
            שגיאה בטעינת השיעורים. נסה שוב מאוחר יותר.
          </Typography>
        ) : (
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
            sx={{
              marginTop: 4,
              maxWidth: 1200,
              marginX: "auto",
            }}
          >
            {videos.map((video, index) => (
              <Grid item xs={12} sm={6} md={3} key={video._id || index}>
                <ProductCard
                  title={video.title}
                  author={getTopicName(video.topicCode)}
                  description={`מחיר: ${video.price} ₪`}
                  type="video"
                  onPurchaseClick={() => {
                    const cartItem = {
                      ...video,
                      quantity: 1,
                      total: video.price,
                    };
                    addToCart(cartItem);
                    openDrawer();
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Container>
</Box>
  );
};

export default OnlineLearningPage;
