import React from "react";
import { Box, Typography } from "@mui/material";

const images = [
  { id: 1, url: "/assets/gallery/gallery1.jpg", alt: "תמונה 1" },
  { id: 2, url: "/assets/gallery/gallery2.jpg", alt: "תמונה 2" },
  { id: 3, url: "/assets/gallery/gallery3.jpg", alt: "תמונה 3" },
  { id: 4, url: "/assets/gallery/gallery4.jpg", alt: "תמונה 4" },
  { id: 5, url: "/assets/gallery/gallery5.jpg", alt: "תמונה 5" },
  // אפשר להוסיף עוד
];

const GalleryPage = () => {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        גלריה
      </Typography>
      <Typography align="center" sx={{ mb: 4 }}>
        מבט חזותי על הפעילויות, האירועים והחוויה שלנו
      </Typography>
      <Box
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: "8px",
        }}
      >
        {images.map((img) => (
          <Box key={img.id} sx={{ mb: "8px", breakInside: "avoid" }}>
            <img
              src={img.url}
              alt={img.alt}
              style={{ width: "100%", display: "block", borderRadius: "8px" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GalleryPage;
