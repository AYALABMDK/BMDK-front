import { Box, Typography, Container, Paper, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const LessonExample = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        py: 6,
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
            דוגמא לשיעור וספר
          </Typography>
          <Typography textAlign="center" mb={4}>
            כאן תוכלו להתרשם מדוגמה של שיעור וספרים - סרטון וקטע קריאה
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isSmall ? "column" : "row-reverse",
              gap: 4,
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            {/* סרטון */}
            <Paper elevation={4} sx={{ flex: 1, borderRadius: 4, overflow: "hidden" }}>
              <iframe
                title="video-preview"
                width="100%"
                height={isSmall ? 250 : 450}
                src="https://www.hidabroot.org/video/225277"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Paper>

            {/* PDF */}
            <Paper
              elevation={4}
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: "#f5f5f5",
                color: "#000",
                borderRadius: 4,
              }}
            >
              <Typography variant="h5" textAlign="center" gutterBottom>
                דוגמה לקריאה
              </Typography>
              <Box sx={{ height: isSmall ? 250 : 450 }}>
                <iframe
                  src="/a.pdf"
                  width="100%"
                  height="100%"
                  style={{ border: "none", borderRadius: "8px" }}
                ></iframe>
              </Box>
              {/* <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  הורד קובץ PDF
                </Button>
              </Box> */}
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LessonExample;
