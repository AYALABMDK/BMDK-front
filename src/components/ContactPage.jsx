import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
        py: 8,
      }}
    >
      <Container maxWidth="md"> {/* שינוי מ-sm ל-md לרוחב גדול יותר */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 6,
              borderRadius: 4,
              backgroundColor: "#ffffff",
              textAlign: "right",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#203a43", textAlign: "center" }}
            >
              צור קשר
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 4, textAlign: "center", color: "#555" }}
            >
              נשמח לשמוע ממך! מלא את פרטיך ונחזור אליך בהקדם.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="שם מלא"
                  fullWidth
                  variant="outlined"
                  dir="rtl"
                //   InputLabelProps={{ style: { right: 0, left: "unset" } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="אימייל"
                  type="email"
                  fullWidth
                  variant="outlined"
                  dir="rtl"
                //   InputLabelProps={{ style: { right: 0, left: "unset" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="הודעה"
                  multiline
                  rows={5}
                  fullWidth
                  variant="outlined"
                  dir="rtl"
                //   InputLabelProps={{ style: { right: 0, left: "unset" } }}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: "30px",
                      background: "linear-gradient(45deg, #203a43, #2c5364)",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    שלח הודעה
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactPage;
