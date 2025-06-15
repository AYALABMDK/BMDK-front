import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  IconButton as MuiIconButton,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_PATH } from "../config";
import { Link } from "react-router-dom";
import ContactPage from "./ContactPage";

const Navbar = () => {
  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "#ffffff",
          color: "#333",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          px: 2,
          direction: "rtl",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* צד ימין – לוגו וכותרת */}
          <Box display="flex" alignItems="center">
            <IconButton edge="start" sx={{ color: "#1976d2", ml: 1 }}>
              <MenuBookIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              דרך קצרה
            </Typography>
          </Box>

          {/* צד שמאל – קישורים */}
          <Box display="flex" gap={1}>
            <Button component={Link} to={`${BASE_PATH}/`} sx={navButtonStyle}>
              דף הבית
            </Button>
            <Button component={Link} to={`${BASE_PATH}/OrderBook`} sx={navButtonStyle}>
              קניית ספרים
            </Button>
            <Button component={Link} to={`${BASE_PATH}/Cart`} sx={navButtonStyle}>
              הסל שלי
            </Button>
            <Button component={Link} to={`${BASE_PATH}/about`} sx={navButtonStyle}>
              אודות
            </Button>
             <Button component={Link} to={`${BASE_PATH}/LessonExample`} sx={navButtonStyle}>
              שיעורים לדוגמא
            </Button>
            <Button onClick={() => setOpenContact(true)} sx={navButtonStyle}>
              יצירת קשר
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* דיאלוג יצירת קשר */}
      <Dialog open={openContact} onClose={() => setOpenContact(false)} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", p: 2 }}>
          <MuiIconButton
            onClick={() => setOpenContact(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </MuiIconButton>
          <ContactPage />
        </Box>
      </Dialog>
    </>
  );
};

const navButtonStyle = {
  color: "#333",
  fontWeight: 500,
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
};

export default Navbar;
