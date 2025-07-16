import React from "react";
import { Box, Typography } from "@mui/material";

const images = [
  { id: 4, url: "/assets/gallery/gallery4.jpg", alt: "תמונה 4" },
  { id: 5, url: "/assets/gallery/gallery5.jpg", alt: "תמונה 5" },
  { id: 6, url: "/assets/gallery/gallery6.jpg", alt: "תמונה 6" },
  { id: 7, url: "/assets/gallery/gallery7.jpg", alt: "תמונה 7" },
  { id: 8, url: "/assets/gallery/gallery8.jpg", alt: "תמונה 8" },
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
              style={{ width: "100%", display: "block", borderRadius: "4px" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GalleryPage;
