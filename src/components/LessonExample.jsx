import {
  Box,
  Typography,
  Container,
  Paper,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { motion } from "framer-motion";

const LessonExample = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #252e49, #558e9e)",
        color: "white",
        py: 8,
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ fontSize: isSmall ? "2rem" : "3rem", mb: 2 }}
          >
            דוגמה לשיעור וספר
          </Typography>

          <Typography
            variant="h6"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto", opacity: 0.9 }}
            gutterBottom
          >
            צפו בשיעור לדוגמה והורידו סיכום לדוגמה מתוך אחד הספרים שלנו.
          </Typography>

          {/* סרטון למעלה */}
          <Paper
            elevation={6}
  
            sx={{
    position: "relative",
    paddingTop: isSmall ? "56.25%" : "50%", // יחס של 16:9 או מותאם
    width: "100%",
  }}
          >
            <iframe
    title="video-preview"
    src="https://drive.google.com/file/d/1kjzmEUn5B3morF7-GDghXYtKID-sDROL/preview"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none",
    }}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
          </Paper>

          {/* כפתור להורדה בלבד */}
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CloudDownloadIcon />}
              href="/a.pdf"
              target="_blank"
              sx={{
                borderRadius: "50px",
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              להורדת קובץ סיכומים לדוגמה
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LessonExample;
