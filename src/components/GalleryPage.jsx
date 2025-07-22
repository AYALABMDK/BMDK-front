import React from "react";
import { Box, Typography } from "@mui/material";
import { useGetImages } from "../hooks/useGallery";

const GalleryPage = () => {
  const { data: images = [], isLoading } = useGetImages();

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        גלריה
      </Typography>
      <Typography align="center" sx={{ mb: 4 }}>
        מבט חזותי על הפעילויות, האירועים והחוויה שלנו
      </Typography>
      {isLoading ? (
        <Typography align="center">טוען תמונות...</Typography>
      ) : (
        <Box
          sx={{
            columnCount: { xs: 1, sm: 2, md: 3 },
            columnGap: "8px",
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={img.public_id || idx}
              sx={{ mb: "8px", breakInside: "avoid" }}
            >
              <img
                src={img.url}
                alt={img.public_id}
                style={{ width: "100%", display: "block", borderRadius: "8px" }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GalleryPage;
