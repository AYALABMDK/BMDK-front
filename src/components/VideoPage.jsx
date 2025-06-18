import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useGetVideos } from "../hooks/useVideo";
import { useGetTopics } from "../hooks/useTopics"; // ודא שזה הנתיב הנכון
import { useCart } from "./Cart/CartContext";
import ProductCard from "../components/ProductCard";


const OnlineLearningPage = () => {
  const { data: videos = [], isLoading, isError } = useGetVideos();
    const { data: topics = [] } = useGetTopics();

  const { addToCart, openDrawer } = useCart();

  // פונקציה שמחזירה את שם הנושא לפי קוד
  const getTopicName = (code) => {
    const topic = topics.find((t) => t.id === code);
    return topic ? topic.name : `נושא ${code}`;
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        למידה מקוונת
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        בעמוד זה תוכלו להתרשם ממבחר שיעורים מקוונים בנושאים מגוונים
      </Typography>

      {isLoading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : isError ? (
        <Typography color="error" sx={{ mt: 4 }}>
          שגיאה בטעינת השיעורים. נסה שוב מאוחר יותר.
        </Typography>
      ) : (
        
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ marginTop: 4 }}>
  {videos.map((video, index) => (
    <Grid item xs={12} md={4} key={video._id || index}>
      <ProductCard
        title={video.title}
        author={getTopicName(video.topicCode)}
        description={`מחיר: ₪${video.price}`}
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
  );
};

export default OnlineLearningPage;
