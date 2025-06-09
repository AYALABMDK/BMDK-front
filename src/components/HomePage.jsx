import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
  CircularProgress,
} from "@mui/material";
import { Star, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useGetTopics } from "../hooks/useTopics";

const Hero = () => (
  <Box
    sx={{
      height: "60vh", // קצר יותר
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
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
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        "דרך קצרה"
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: 600, mb: 4 }}>
        בית מדרש ללימודי דיינות
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ borderRadius: "30px", px: 4 }}
        endIcon={<ArrowForward />}
      >
        קניית ספרים
      </Button>
    </motion.div>
  </Box>
);


const FeatureCard = ({ title, text }) => (
  <Card
    sx={{
      background: "#fff",
      borderRadius: 4,
      p: 2,
      minWidth: 250,
      maxWidth: 250,
      textAlign: "center",
      boxShadow: 5,
      transition: "transform 0.3s ease",
      "&:hover": { transform: "scale(1.05)" },
    }}
  >
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">{text}</Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: "center" }}>
      <Button size="small" endIcon={<Star />}>
        קרא עוד
      </Button>
    </CardActions>
  </Card>
);

const Features = () => {
  const { data: topics, isLoading, isError } = useGetTopics();

  if (isLoading) {
    return (
      <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">שגיאה בשליפת הנושאים</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
      >
        הכשרה ומסלולים
      </Typography>

      {topics.length === 0 ? (
        <Typography align="center">אין נושאים זמינים כרגע</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mt: 2 }}
        >
          {topics.map((topic) => (
            <Grid item key={topic._id} xs={12} sm={6} md={2.4}>
              <FeatureCard title={topic.name} text={topic.notes} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const Footer = () => (
  <Box
    sx={{ py: 4, backgroundColor: "#111", color: "#aaa", textAlign: "center" }}
  >
    <Typography>© 2025 כל הזכויות שמורות - דרך קצרה</Typography>
  </Box>
);

const HomePage = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Hero />
      <Features />
      <Footer />
    </>
  );
};

export default HomePage;
