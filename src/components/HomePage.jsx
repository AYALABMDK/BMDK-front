import {
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../config";
import AboutPage from "./AboutPage";
import LessonExample from "./LessonExample";
import BooksPage from "./OrderBook";
import ContactPage from "./Contact/ContactPage";
import OnlineLearningPage from "./VideoPage";
import LessonsPage from "./LessonsPage";
import GalleryPage from "./GalleryPage";


const Hero = ({ onOrderBookClick }) => (
  <Box
    sx={{
      height: "80vh", // קצר יותר
      background: "linear-gradient(135deg,#252e49, #558e9e, #558e9e)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      px: 3,
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Typography variant="h1" fontWeight="bold" gutterBottom>
        דרך קצרה
      </Typography>
      <Typography variant="h3" sx={{ maxWidth: 600, mb: 4 }}>
        בית מדרש ללימודי דיינות
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          borderRadius: "10px", px: 10, backgroundColor: "#252e49", color: "white",
          fontSize: "1.2rem",       // מגדיל את גודל הפונט
          padding: "12px 24px",     // מגדיל גובה ורוחב
          minWidth: "200px",        // רוחב מינימלי
        }}
        endIcon={<ArrowBack />}
        onClick={onOrderBookClick}
      >
        קניית ספרים
      </Button>
    </motion.div>
  </Box>
);

const HomePage = () => {
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${BASE_PATH}/OrderBook`);
  };

  return (
    <>
      <Hero onOrderBookClick={handleClick} />
      <LessonsPage />
     
      <LessonExample />
      <OnlineLearningPage /> <AboutPage />
      <BooksPage />
      <GalleryPage/>
      <ContactPage />
    </>
  );
};

export default HomePage;
