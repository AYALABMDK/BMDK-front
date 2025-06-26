import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Dialog,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { BASE_PATH } from "../config";
import { Link, useNavigate } from "react-router-dom";
import ContactPage from "./Contact/ContactPage";
import { useAdminAuth } from "../hooks/useAdminAuth";
import api from "../services/api";

const Navbar = () => {
  const isAdmin = useAdminAuth();
  const navigate = useNavigate();

  const [openContact, setOpenContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = async () => {
    try {
      await api.post('/admin/logout');
      window.location.href = '/';
      navigate('/admin/login');
    } catch (err) {
      console.error("שגיאה בהתנתקות:", err);
    }
    handleMenuClose();
  };

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
            <Button component={Link} to={`${BASE_PATH}/`} sx={navButtonStyle}>דף הבית</Button>
            <Button component={Link} to={`${BASE_PATH}/lessons`} sx={navButtonStyle}>הכשרה ומסלולים</Button>
            <Button component={Link} to={`${BASE_PATH}/OrderBook`} sx={navButtonStyle}>קניית ספרים</Button>
            <Button component={Link} to={`${BASE_PATH}/OnlineLearning`} sx={navButtonStyle}>למידה מקוונת</Button>
            <Button component={Link} to={`${BASE_PATH}/cart`} sx={navButtonStyle}>הסל שלי</Button>
            <Button component={Link} to={`${BASE_PATH}/about`} sx={navButtonStyle}>אודות</Button>
             <Button component={Link} to={`${BASE_PATH}/gallery`} sx={navButtonStyle}>גלריה</Button>
            <Button component={Link} to={`${BASE_PATH}/LessonExample`} sx={navButtonStyle}>שיעורים לדוגמא</Button>
            <Button onClick={() => setOpenContact(true)} sx={navButtonStyle}>יצירת קשר</Button>
          </Box>

          {/* צד שמאל – לוגו + מנהל */}
          <Box display="flex" alignItems="center" gap={1}>
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

            {isAdmin && (
              <>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  ברוך הבא מנהל
                </Typography>

                <Tooltip title="התנתקות ממצב מנהל" arrow>
                  <IconButton onClick={handleLogoutClick} size="large" sx={{ color: '#333' }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="תפריט מנהל" arrow>
                  <IconButton
                    onClick={handleMenuOpen}
                    size="large"
                    sx={{ color: '#333' }}
                    aria-controls={Boolean(anchorEl) ? 'admin-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>

              <Menu
  id="admin-menu"
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <MenuItem component={Link} to={`${BASE_PATH}/admin/dashboard`} onClick={handleMenuClose}>
    דף מנהל
  </MenuItem>
  <MenuItem component={Link} to={`${BASE_PATH}/admin/orders`} onClick={handleMenuClose}>
    הזמנות
  </MenuItem>
  <MenuItem component={Link} to={`${BASE_PATH}/admin/books`} onClick={handleMenuClose}>
    ספרים
  </MenuItem>
  <MenuItem component={Link} to={`${BASE_PATH}/admin/videos`} onClick={handleMenuClose}>
    וידאו
  </MenuItem>
  <MenuItem component={Link} to={`${BASE_PATH}/admin/inventory`} onClick={handleMenuClose}>
    ניהול מלאי
  </MenuItem>
</Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* דיאלוג יצירת קשר */}
      <Dialog open={openContact} onClose={() => setOpenContact(false)} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", p: 2 }}>
          <IconButton
            onClick={() => setOpenContact(false)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
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
