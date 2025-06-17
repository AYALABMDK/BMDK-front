import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Star, ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useGetTopics } from "../hooks/useTopics";
import { useGetLessonsByTopicCode } from "../hooks/useLessons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../config";
import { HDate } from "@hebcal/core";
import AboutPage from "./AboutPage";
import LessonExample from "./LessonExample";
import BooksPage from "./OrderBook";
import ContactPage from "./Contact/ContactPage";
import OnlineLearningPage from "./VideoPage";

const Hero = ({ onOrderBookClick }) => (
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
        endIcon={<ArrowBack />}
        onClick={onOrderBookClick}
      >
        קניית ספרים
      </Button>
    </motion.div>
  </Box>
);

const FeatureCard = ({ title, text, id, onReadMore }) => (
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
      <Button
        size="small"
        endIcon={<Star />}
        onClick={() => onReadMore({ id, title, text })}
      >
        קרא עוד
      </Button>
    </CardActions>
  </Card>
);

const Features = ({ onReadMoreClick }) => {
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
    <Container sx={{ py: 6 }}>
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
              <FeatureCard
                title={topic.name}
                text={topic.notes}
                id={topic.id}
                onReadMore={onReadMoreClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const Lessons = ({ topic }) => {
  const {
    data: lessons,
    isLoading,
    isError,
  } = useGetLessonsByTopicCode(topic.id);

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
        <Typography color="error">שגיאה בשליפת השיעורים</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        style={{ fontWeight: "bold" }}
      >
        {topic.title}
      </Typography>

      {lessons.length === 0 ? (
        <Typography align="center">אין שיעורים זמינים כרגע</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {lessons.map((lesson) => (
            <Grid item key={lesson._id} xs={12} sm={10} md={8}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Only if status is inactive */}
                {lesson.status === "לא פעיל" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(56, 52, 52, 0.4)",
                      color: "rgb(255, 255, 255)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                      borderRadius: 3,
                      pointerEvents: "none", // So clicks go through (optional)
                    }}
                  >
                    <Typography variant="h1" fontWeight="bold">
                      לא פעיל
                    </Typography>
                  </Box>
                )}

                {/* Card Content */}
                <CardContent sx={{ zIndex: 1 }}>
                  <Typography variant="h5">{lesson.city}</Typography>
                  <Typography variant="h6">{lesson.description}</Typography>
                  <Typography>
                    יום: {lesson.day} | שעה: {lesson.hour}
                  </Typography>
                  <Typography>
                    תאריך התחלה: {formatDate(lesson.startDate)} | תאריך סיום:{" "}
                    {formatDate(lesson.endDate)} | סטטוס: {lesson.status}
                  </Typography>
                  <Typography>
                    מספר תלמידים: {lesson.studentsCount} | סוג תלמידים:{" "}
                    {lesson.studentsType}
                  </Typography>
                  <Typography>מחיר: {lesson.price}₪</Typography>
                  <Typography>הערות: {lesson.notes}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const formatDate = (dateString) => {
  // Hebrew diacritics
  const date = new Date(dateString);
  const hdate = new HDate(date);
  const hebrewWithNikud = hdate.renderGematriya();
  // Remove all nikud (Hebrew diacritics)
  const hebrewWithoutNikud = hebrewWithNikud.replace(/[\u0591-\u05C7]/g, "");
  return hebrewWithoutNikud;
  // If we want regular date
  // return new Intl.DateTimeFormat("he-IL").format(new Date(dateString));
};

const HomePage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReadMore = (topic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${BASE_PATH}/OrderBook`);
  };

  return (
    <>
      {/* <NavBar /> */}
      <Hero onOrderBookClick={handleClick} />
      <Features onReadMoreClick={handleReadMore} />

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onExited={() => setSelectedTopic(null)} // cleanup after animation
        fullWidth
        maxWidth="md"
      >
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          {selectedTopic && <Lessons topic={selectedTopic} />}
        </DialogContent>
      </Dialog>
      <AboutPage />
      <LessonExample />
      <BooksPage />
      <OnlineLearningPage/>
      <ContactPage />
    </>
  );
};

export default HomePage;
