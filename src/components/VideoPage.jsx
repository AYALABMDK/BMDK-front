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
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ marginTop: 4 }}
        >
          {videos.map((video, index) => (
            <Grid item xs={12} md={4} key={video._id || index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    {getTopicName(video.topicCode)}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    {video.title}
                  </Typography>

                  {video.subTopic && (
                    <Typography variant="body1" gutterBottom>
                      תת נושא: {video.subTopic}
                    </Typography>
                  )}

                  {video.signsTopic && (
                    <Typography variant="body1" gutterBottom>
                      סימנים: {video.signsTopic}
                    </Typography>
                  )}

                  {video.notes && (
                    <Typography variant="body2" gutterBottom>
                      הערות: {video.notes}
                    </Typography>
                  )}

                  <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
                    מחיר: ₪{video.price}
                  </Typography>
                </CardContent>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    const cartItem = {
                      ...video,
                      quantity: 1,
                      total: video.price,
                    };
                    addToCart(cartItem);
                    openDrawer(); // פותח את סל הקניות מיד
                  }}
                >
                  לרכישה
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default OnlineLearningPage;
