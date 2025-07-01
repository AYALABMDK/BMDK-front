import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Tooltip,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookIcon from "@mui/icons-material/Book";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InventoryIcon from "@mui/icons-material/Inventory";
import SchoolIcon from "@mui/icons-material/School";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BASE_PATH } from "../config";
import { useAdminAuth } from "../hooks/useAdminAuth";
import api from "../services/api";
import ContactPage from "./Contact/ContactPage";

const Layout = () => {
  const isAdmin = useAdminAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const [openContact, setOpenContact] = useState(false);

  const handleLogoutClick = async () => {
    try {
      await api.post("/admin/logout");
      window.location.href = "/";
      navigate("/admin/login");
    } catch (err) {
      console.error("שגיאה בהתנתקות:", err);
    }
  };

  const sidebarWidth = collapsed ? 60 : 200;

  const adminMenuItems = [
    { text: "דף מנהל", icon: <DashboardIcon />, path: `${BASE_PATH}/admin/dashboard` },
    { text: "הזמנות", icon: <ShoppingCartIcon />, path: `${BASE_PATH}/admin/orders` },
    { text: "ספרים", icon: <BookIcon />, path: `${BASE_PATH}/admin/books` },
    { text: "וידאו", icon: <VideoLibraryIcon />, path: `${BASE_PATH}/admin/videos` },
    { text: "שיעורים", icon: <SchoolIcon />, path: `${BASE_PATH}/admin/lessons` },
    { text: "ניהול מלאי", icon: <InventoryIcon />, path: `${BASE_PATH}/admin/inventory` },
  ];

  const navButtonStyle = {
    color: "#333",
    fontWeight: 500,
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* סיידבר מנהל */}
      {isAdmin && (
        <Box
          sx={{
            width: sidebarWidth,
            bgcolor: "white",
            borderRight: "1px solid #ddd",
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ mt: 1 }}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

          <List sx={{ width: "100%" }}>
            {adminMenuItems.map(({ text, icon, path }) => (
              <Tooltip key={text} title={collapsed ? text : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 1,
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={text} />}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Box>
      )}

      {/* תוכן ראשי */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* הניווט העליון */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "#ffffff",
            color: "#333",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            px: 2,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* קישורים */}
            <Box display="flex" gap={1}>
              <Button component={Link} to={`${BASE_PATH}/`} sx={navButtonStyle}>
                דף הבית
              </Button>
              <Button component={Link} to={`${BASE_PATH}/lessons`} sx={navButtonStyle}>
                הכשרה ומסלולים
              </Button>
              <Button component={Link} to={`${BASE_PATH}/OrderBook`} sx={navButtonStyle}>
                קניית ספרים
              </Button>
              <Button component={Link} to={`${BASE_PATH}/OnlineLearning`} sx={navButtonStyle}>
                למידה מקוונת
              </Button>
              <Button component={Link} to={`${BASE_PATH}/cart`} sx={navButtonStyle}>
                הסל שלי
              </Button>
              <Button component={Link} to={`${BASE_PATH}/about`} sx={navButtonStyle}>
                אודות
              </Button>
              <Button component={Link} to={`${BASE_PATH}/gallery`} sx={navButtonStyle}>
                גלריה
              </Button>
              <Button component={Link} to={`${BASE_PATH}/LessonExample`} sx={navButtonStyle}>
                שיעורים לדוגמא
              </Button>
              <Button onClick={() => setOpenContact(true)} sx={navButtonStyle}>
                יצירת קשר
              </Button>
            </Box>

            {/* לוגו / מנהל */}
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
                    <IconButton onClick={handleLogoutClick} size="large" sx={{ color: "#333" }}>
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* כאן יופיע התוכן של כל דף בהתאם לראוטינג */}
        <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>

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
    </Box>
  );
};

export default Layout;
