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
import { Star } from "@mui/icons-material";
import { useGetTopics } from "../hooks/useTopics";
import { useGetLessonsByTopicCode } from "../hooks/useLessons";
import { useState } from "react";
import { HDate } from "@hebcal/core";
import PageHeaderImage from "./PageHeaderImage";

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
            {/* <Typography variant="body2">{text}</Typography> */}
        </CardContent>
        <CardActions sx={{ justifyContent: "center"}}>
            {/* <Button
                size="small"
                endIcon={<Star />}
                onClick={() => onReadMore({ id, title, text })}
                // color='#252e49' 
            >
שיעורים בנושא            </Button> */}
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
        <Box sx={{  minHeight: "100vh", py: 8 }}>
        <Container>
           
            <PageHeaderImage src="/assets/a.png" alt="מסלולי הכשרה" />

            <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom  sx={{ mb: 8 }}>
                מסלולי הכשרה
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
         </Box>
        );
};

        const Lessons = ({topic}) => {
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
        </>);
};

        export default LessonsPage;