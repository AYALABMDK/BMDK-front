import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: " הרב אייל גיאת ",
    role: "ראש בית מדרש ללימודי דיינות",
    avatar: "https://i.pravatar.cc/150?img=1",
    description:
      "אילה מובילה את הצוות עם תשוקה להוראה ולחדשנות בחינוך.",
  },
//   {
//     name: "יוסי לוי",
//     role: "מנהל טכנולוגי",
//     avatar: "https://i.pravatar.cc/150?img=2",
//     description:
//       "מומחה טכנולוגיות עם ניסיון עשיר בפיתוח מערכות מתקדמות.",
//   },
//   {
//     name: "רותם ישראלי",
//     role: "מומחית תוכן",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     description:
//       "כותבת ומפתחת תוכן איכותי ומעמיק ללמידה יעילה.",
//   },
];

const AboutPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      background: "linear-gradient(135deg,#252e49, #558e9e, #558e9e)",
        py: 8,
        color: "white",
        direction: "rtl",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            עלינו
          </Typography>
  <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            שיטת לימוד "דרך קצרה"
          </Typography>

          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.1)",
              mb: 6,
              textAlign: "right",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            אנו ב"דרך קצרה" מאמינים בלמידה איכותית, חדשנית ונגישה לכל אדם.
            המטרה שלנו היא להעניק חווית למידה מעמיקה, מותאמת אישית, ועם דגש על תוכן עשיר וממוקד.
          </Paper>

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 4, textAlign: "center" }}
          >
מוסר השיעור          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map(({ name, role, avatar, description }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Paper
                    elevation={10}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <Avatar
                      src={avatar}
                      alt={name}
                      sx={{ width: 100, height: 100, mb: 2, border: "2px solid white" }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 2, fontStyle: "italic", opacity: 0.8 }}
                    >
                      {role}
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
//               