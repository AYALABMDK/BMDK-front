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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Star } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { useGetTopics } from "../hooks/useTopics";
import { useGetLessonsByTopicCode } from "../hooks/useLessons";
import { useState } from "react";
import { HDate } from "@hebcal/core";

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
    </CardContent>
    <CardActions sx={{ justifyContent: "center" }}>
      <Button
        size="small"
        startIcon={<Star />}
        onClick={() => onReadMore({ id, title, text })}
      >
        שיעורים הנלמדים בנושא
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
    <Container sx={{ py: 6, minHeight: "95vh", mb: 10 }}>
      <Box sx={{ width: "100%", mb: 4 }}>
        <img
          src="/assets/a.png"
          alt="כותרת"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </Box>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ mb: 8 }}
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
    <Container sx={{ py: 2 }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        שיעורים בנושא {topic.title}
      </Typography>

      {lessons.length === 0 ? (
        <Typography align="center">אין שיעורים זמינים כרגע</Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {lessons.map((lesson) => (
            <Accordion
              key={lesson._id}
              disabled={lesson.status === "לא פעיל"}
              sx={{
                borderRadius: 3,
                background: "#fafafa",
                boxShadow: 3,
                overflow: "hidden",
                "&:before": { display: "none" },
                border:
                  lesson.status === "לא פעיל" ? "2px solid #e57373" : "none",
                opacity: lesson.status === "לא פעיל" ? 0.6 : 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#888" }} />}
                aria-controls="panel-content"
                id={`panel-header-${lesson._id}`}
                sx={{
                  bgcolor: "#fff",
                  borderBottom: "1px solid #eee",
                  minHeight: 64,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                }}
              >
                <LocationOnOutlinedIcon sx={{ mr: 1, color: "#888" }} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ flexGrow: 1, color: "#222" }}
                >
                  {lesson.city}
                </Typography>
                {lesson.status === "לא פעיל" && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <BlockOutlinedIcon sx={{ color: "#888" }} />
                    <Typography color="error" fontWeight="bold">
                      לא פעיל
                    </Typography>
                  </Box>
                )}
              </AccordionSummary>

              <AccordionDetails>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{ px: 1 }}
                >
                  {/* יום ושעה */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeOutlinedIcon sx={{ color: "#888" }} />
                    <Typography>
                      <b>יום:</b> {lesson.day} &nbsp;&nbsp; | &nbsp;&nbsp;{" "}
                      <b>שעה:</b> {lesson.hour}
                    </Typography>
                  </Box>

                  {/* תאריכים */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarTodayOutlinedIcon sx={{ color: "#888" }} />
                    <Typography>
                      <b>התחלה:</b> {formatDate(lesson.startDate)} &nbsp;&nbsp;
                      | &nbsp;&nbsp; <b>סיום:</b> {formatDate(lesson.endDate)}
                    </Typography>
                  </Box>

                  {/* תלמידים */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <GroupOutlinedIcon sx={{ color: "#888" }} />
                    <Typography>
                      <b>מספר תלמידים:</b> {lesson.studentsCount} &nbsp;&nbsp; |
                      &nbsp;&nbsp; <b>סוג:</b> {lesson.studentsType}
                    </Typography>
                  </Box>

                  {/* מחיר */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <MonetizationOnOutlinedIcon sx={{ color: "#888" }} />
                    <Typography>
                      <b>מחיר:</b> {lesson.price}₪
                    </Typography>
                  </Box>

                  {/* תיאור */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <InfoOutlinedIcon sx={{ color: "#888" }} />
                    <Typography>{lesson.description}</Typography>
                  </Box>

                  {/* הערות - אם קיימות */}
                  {lesson.notes && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <InfoOutlinedIcon sx={{ color: "#bbb" }} />
                      <Typography sx={{ fontStyle: "italic" }}>
                        הערות: {lesson.notes}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Container>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hdate = new HDate(date);
  const hebrewWithNikud = hdate.renderGematriya();
  const hebrewWithoutNikud = hebrewWithNikud.replace(/[\u0591-\u05C7]/g, "");
  return hebrewWithoutNikud;
};

const LessonsPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReadMore = (topic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Features onReadMoreClick={handleReadMore} />

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onExited={() => setSelectedTopic(null)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
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
    </>
  );
};

export default LessonsPage;
