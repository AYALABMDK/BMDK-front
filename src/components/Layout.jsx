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
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
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
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const isAdmin = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const adminMenuItems = [
    {
      text: "דף מנהל",
      shortText: "מנהל",
      icon: <DashboardIcon />,
      path: `${BASE_PATH}/admin/dashboard`,
      hoverColor: "#90caf9",
    },
    {
      text: "הזמנות",
      shortText: "הזמנות",
      icon: <ShoppingCartIcon />,
      path: `${BASE_PATH}/admin/orders`,
      hoverColor: "#ffccbc",
    },
    {
      text: "ספרים",
      shortText: "ספרים",
      icon: <BookIcon />,
      path: `${BASE_PATH}/admin/books`,
      hoverColor: "#c8e6c9",
    },
    {
      text: "וידאו",
      shortText: "וידאו",
      icon: <VideoLibraryIcon />,
      path: `${BASE_PATH}/admin/videos`,
      hoverColor: "#e1bee7",
    },
    {
      text: "שיעורים",
      shortText: "שיעורים",
      icon: <SchoolIcon />,
      path: `${BASE_PATH}/admin/lessons`,
      hoverColor: "#fff9c4",
    },
    {
      text: "ניהול מלאי",
      shortText: "מלאי",
      icon: <InventoryIcon />,
      path: `${BASE_PATH}/admin/inventory`,
      hoverColor: "#b3e5fc",
    },
    {
      text: "נושאים",
      shortText: "נושאים",
      icon: <MenuSharpIcon />,
      path: `${BASE_PATH}/admin/topics`,
      hoverColor: "#d7ccc8",
    },
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
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {/* תוכן ראשי */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* הניווט העליון */}
        <AppBar
          position="fixed"
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
              <Button
                component={Link}
                to={`${BASE_PATH}/lessons`}
                sx={navButtonStyle}
              >
                הכשרה ומסלולים
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
                to={`${BASE_PATH}/gallery`}
                sx={navButtonStyle}
              >
                גלריה
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
                    <IconButton
                      onClick={handleLogoutClick}
                      size="large"
                      sx={{ color: "#333" }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row-reverse",
          minHeight: 0,
        }}
      >
        {/* תוכן העמוד */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflow: "auto",
             marginTop: "50px", // חשוב!
          }}
        >
          
          <Outlet />
        </Box>

        {/* סיידבר מנהל */}
        {isAdmin && (
          <Box
            sx={{
              width: collapsed ? 60 : 200,
              bgcolor: "white",
              borderLeft: "1px solid #ddd",
              transition: "width 0.3s",
              height: "auto", // חשוב! רק עד גובה התוכן
              alignSelf: "flex-start", // שהסיידבר לא יתפרס לגובה מלא
            }}
          >
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                mt: 1,
                fontSize: "2rem",
                ml: "7px",
                alignSelf: "center",
              }}
            >
              {collapsed ? (
                <MenuOpenSharpIcon sx={{ fontSize: "1.7rem" }} />
              ) : (
                <MenuOpenSharpIcon sx={{ fontSize: "1.7rem" }} />
              )}
            </IconButton>

            <List sx={{ width: "100%" }}>
              {adminMenuItems.map(
                ({ text, shortText, icon, path, hoverColor }) => {
                  const isActive = location.pathname === path;

                  return (
                    <Tooltip
                      key={text}
                      title={collapsed ? text : ""}
                      placement="right"
                    >
                      <ListItemButton
                        component={Link}
                        to={path}
                        sx={{
                          flexDirection: collapsed ? "column" : "row",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          py: collapsed ? 0.5 : 1,
                          minHeight: collapsed ? 48 : "auto",
                          "&:hover .icon-hover": {
                            color: hoverColor,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: collapsed ? 0 : 1,
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            className="icon-hover"
                            sx={{
                              color: isActive ? hoverColor : "gray", // צבע ברירת מחדל / אקטיבי
                              transition: "color 0.3s",
                            }}
                          >
                            {icon}
                          </Box>
                        </ListItemIcon>
                        {collapsed ? (
                          <Typography variant="caption" noWrap sx={{ mt: 0.5 }}>
                            {shortText}
                          </Typography>
                        ) : (
                          <ListItemText primary={text} />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  );
                }
              )}
            </List>
          </Box>
        )}
      </Box>

      {/* דיאלוג יצירת קשר */}
      <Dialog
        open={openContact}
        onClose={() => setOpenContact(false)}
        maxWidth="md"
        fullWidth
      >
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
