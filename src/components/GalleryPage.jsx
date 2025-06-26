import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";

const images = [
  { id: 1, url: "/assets/bg7.png", alt: "תמונה 1" },
  { id: 2, url: "/assets/bg7.png", alt: "תמונה 2" },
  { id: 3, url: "/assets/bg7.png", alt: "תמונה 3" },
  { id: 4, url: "/assets/bg7.png", alt: "תמונה 4" },
  { id: 5, url: "/assets/bg7.png", alt: "תמונה 5" },
  { id: 6, url: "/assets/bg7.png", alt: "תמונה 6" },
  // הוסף כמה תמונות שתרצה
];

const GalleryPage = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        גלריה
      </Typography>
      <Typography align="center" sx={{ mb: 4 }}>
        מבט חזותי על הפעילויות, האירועים והחוויה שלנו
      </Typography>
      <Grid container spacing={3}>
        {images.map((img) => (
          <Grid item xs={12} sm={6} md={4} key={img.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={img.url}
                alt={img.alt}
                sx={{
                  height: 240,
                  objectFit: "cover",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GalleryPage;
