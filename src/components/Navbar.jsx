import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Dialog,
  IconButton as MuiIconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_PATH } from "../config";
import { Link } from "react-router-dom";
import ContactPage from "./Contact/ContactPage";

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
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* צד ימין – קישורים */}
          <Box display="flex" gap={1}>
            <Button
              component={Link}
              to={`${BASE_PATH}/`}
              sx={navButtonStyle}
            >
              דף הבית
            </Button>
            <Button
              component={Link}
              to={`${BASE_PATH}/OrderBook`}
              sx={navButtonStyle}
            >
              קניית ספרים
            </Button>
            <Button
              component={Link}
              to={`${BASE_PATH}/OnlineLearning`}
              sx={navButtonStyle}
            >
              למידה מקוונת
            </Button>
            <Button
              component={Link}
              to={`${BASE_PATH}/cart`}
              sx={navButtonStyle}
            >
              הסל שלי
            </Button>
            <Button
              component={Link}
              to={`${BASE_PATH}/about`}
              sx={navButtonStyle}
            >
              אודות
            </Button>
            <Button
              component={Link}
              to={`${BASE_PATH}/LessonExample`}
              sx={navButtonStyle}
            >
              שיעורים לדוגמא
            </Button>
            <Button onClick={() => setOpenContact(true)} sx={navButtonStyle}>
              יצירת קשר
            </Button>
          </Box>

          {/* צד שמאל – לוגו וכותרת */}
          <Box display="flex" alignItems="center">
            <Button
              component={Link}
              to={`${BASE_PATH}/`}
              sx={{
                ...navButtonStyle,
                fontWeight: "bold",
                fontSize: "1.25rem",
                textTransform: "none",
              }}
            >
              דרך קצרה
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* דיאלוג יצירת קשר */}
      <Dialog
        open={openContact}
        onClose={() => setOpenContact(false)}
        maxWidth="md"
        fullWidth
      >
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
