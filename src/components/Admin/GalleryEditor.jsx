import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetImages,
  useUploadImage,
  useDeleteImage,
} from "../../hooks/useGallery";

const GalleryEditor = () => {
  const fileInputRef = useRef(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const { data: images = [], isLoading } = useGetImages();
  const uploadImage = useUploadImage();
  const deleteImage = useDeleteImage();

  // פותח את חלון בחירת קובץ
  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // כשנבחרת תמונה, מעלים אותה מיד
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage.mutate(file, {
        onSuccess: () => {
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      });
    }
  };

  // פותח דיאלוג מחיקה
  const handleDeleteDialogOpen = (public_id) => {
    setSelectedImageId(public_id);
    setDeleteDialogOpen(true);
  };

  // סוגר דיאלוג מחיקה
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedImageId(null);
  };

  // מוחק תמונה אחרי אישור
  const handleDeleteConfirm = () => {
    if (selectedImageId) {
      deleteImage.mutate(selectedImageId);
    }
    handleDeleteDialogClose();
  };

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        עריכת גלריה
      </Typography>
      {/* כפתור הוספת תמונה בעיצוב כמו בווידאו */}
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={uploadImage.isLoading}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddImageClick}
          disabled={uploadImage.isLoading}
          sx={{ minWidth: 180 }}
        >
          הוסף תמונה חדשה
        </Button>
      </Box>
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
              sx={{
                mb: "8px",
                breakInside: "avoid",
                position: "relative",
                "&:hover .delete-btn": { opacity: 1 },
              }}
            >
              <img
                src={img.url}
                alt={img.public_id}
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <IconButton
                className="delete-btn"
                aria-label="מחק תמונה"
                onClick={() => handleDeleteDialogOpen(img.public_id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "rgba(255,255,255,0.7)",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                  zIndex: 2,
                  ":hover": {
                    bgcolor: "error.main",
                    color: "#fff",
                    opacity: 1,
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* דיאלוג אישור מחיקה */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>מחיקת תמונה</DialogTitle>
        <DialogContent>
          האם אתה בטוח שברצונך למחוק את התמונה הזו? פעולה זו אינה הפיכה.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            ביטול
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GalleryEditor;
