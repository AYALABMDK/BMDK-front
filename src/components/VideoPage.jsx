import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const videos = [
  {
    title: "חושן א",
    description: "תיאור קצר על נושא 1",
    videoUrl: "https://www.hidabroot.org/video/225277",
    price: "₪50",
  },
  {
    title: "חושן ב",
    description: "תיאור קצר על נושא 2",
    videoUrl: "https://www.hidabroot.org/video/225277",
    price: "₪75",
  },
  {
    title: "חושן ג",
    description: "תיאור קצר על נושא 3",
    videoUrl: "https://www.hidabroot.org/video/225277",
    price: "₪60",
  },
];

const OnlineLearningPage = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center", display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        למידה מקוונת
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        בעמוד זה תוכלו להתרשם ממבחר שיעורים מקוונים בנושאים מגוונים
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ marginTop: 4 }}
      >
        {videos.map((video, index) => (
          <Grid item xs={12} md={20} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {video.title}
                </Typography>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    src={video.videoUrl}
                    title={`video-${index}`}
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {video.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
                  מחיר: {video.price}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" sx={{ m: 2 }}>
                לרכישה
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OnlineLearningPage;
