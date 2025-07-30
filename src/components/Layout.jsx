import React, { useState, useEffect } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";

import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookIcon from "@mui/icons-material/Book";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InventoryIcon from "@mui/icons-material/Inventory";
import SchoolIcon from "@mui/icons-material/School";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import { BASE_PATH } from "../config";
import { useAdminAuth } from "../hooks/useAdminAuth";
import api from "../services/api";
import ContactPage from "./Contact/ContactPage";

const navButtonStyle = {
  color: "#333",
  fontWeight: 500,
  fontSize: "1rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
};

const navItems = [
  { text: "דף הבית", path: `${BASE_PATH}/` },
  { text: "מסלולי הכשרה", path: `${BASE_PATH}/lessons` },
  { text: "קניית ספרים", path: `${BASE_PATH}/OrderBook` },
  { text: "למידה מקוונת", path: `${BASE_PATH}/OnlineLearning` },
  { text: "הסל שלי", path: `${BASE_PATH}/cart` },
  { text: "אודות", path: `${BASE_PATH}/about` },
  { text: "גלריה", path: `${BASE_PATH}/gallery` },
  { text: "שיעורים לדוגמא", path: `${BASE_PATH}/LessonExample` },
  { text: "יצירת קשר", path: "#" }, // נתיב מיוחד עבור יצירת קשר
];

// קומפוננטת הניווט הרספונסיבי למעלה
const ResponsiveNav = ({ onOpenContact }) => {
  const [visibleItems, setVisibleItems] = useState(navItems);
  const [overflowItems, setOverflowItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width > 1200) {
        setVisibleItems(navItems);
        setOverflowItems([]);
      } else if (width > 900) {
        setVisibleItems(navItems.slice(0, 6));
        setOverflowItems(navItems.slice(6));
      } else if (width > 600) {
        setVisibleItems(navItems.slice(0, 4));
        setOverflowItems(navItems.slice(4));
      } else {
        setVisibleItems(navItems.slice(0, 2));
        setOverflowItems(navItems.slice(2));
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" gap={1} alignItems="center" flexWrap="nowrap" sx={{ overflow: "hidden" }}>
      {visibleItems.map(({ text, path }) =>
        path === "#" ? (
          <Button key={text} onClick={onOpenContact} sx={navButtonStyle}>
            {text}
          </Button>
        ) : (
          <Button key={text} component={Link} to={path} sx={navButtonStyle}>
            {text}
          </Button>
        )
      )}

      {overflowItems.length > 0 && (
        <>
          <IconButton onClick={handleMoreClick} sx={{ color: "#333" }} aria-label="עוד תפריט">
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMoreClose}>
            {overflowItems.map(({ text, path }) => (
              <MenuItem
                key={text}
                component={path !== "#" ? Link : "div"}
                to={path !== "#" ? path : undefined}
                onClick={() => {
                  handleMoreClose();
                  if (path === "#") onOpenContact();
                }}
              >
                {text}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
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
  {
    text: "עריכת גלריה",
    shortText: "גלריה",
    icon: <PhotoLibraryIcon />,
    path: `${BASE_PATH}/admin/gallery-editor`,
    hoverColor: "#ffe0b2",
  },
];

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
            {/* ניווט רספונסיבי */}
            <ResponsiveNav onOpenContact={() => setOpenContact(true)} />

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
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Toolbar /> {/* ריווח לפי גובה ה-AppBar */}
          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
        </Box>

        {/* סיידבר מנהל */}
        {isAdmin && (
          <Box
            sx={{
              width: collapsed ? 60 : 200,
              flexShrink: 0,
              flexGrow: 0,
              flexBasis: collapsed ? 60 : 200,
              bgcolor: "white",
              borderLeft: "1px solid #ddd",
              height: "auto",
              alignSelf: "flex-start",
            }}
          >
            <Toolbar
              sx={(theme) => ({
                minHeight: 64,
                [theme.breakpoints.down(1178)]: {
                  minHeight: 96,
                },
              })}
            />
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                mt: 1,
                fontSize: "2rem",
                ml: "7px",
                alignSelf: "center",
              }}
            >
              {/* האייקון להרחבה/צמצום */}
              {collapsed ? <MenuSharpIcon sx={{ fontSize: "1.7rem" }} /> : <MoreVertIcon />}
            </IconButton>

            <List sx={{ width: "100%" }}>
              {adminMenuItems.map(({ text, shortText, icon, path, hoverColor }) => {
                const isActive = location.pathname === path;

                return (
                  <Tooltip key={text} title={collapsed ? text : ""} placement="right">
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
                            color: isActive ? hoverColor : "gray",
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
              })}
            </List>
          </Box>
        )}
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
