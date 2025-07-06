import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Fade,
} from "@mui/material";

const lessons = [
  {
    id: 1,
    title: "שיעור ראשון",
    hours: "2",
    city: "הוד השרון",
    teacher: "ר' כהן",
    day: "יום ראשון",
    time: "10:00",
    status: "פעיל",
    level: "מתחילים",
    audience: "תלמידים",
    price: "50₪",
    startDate: "01/06/2025",
    endDate: "01/07/2025",
  },
  {
    id: 2,
    title: "שיעור מתקדם",
    city: "ירושלים",
    hours: "3",
    teacher: "ר' לוי",
    day: "יום שלישי",
    time: "14:00",
    status: "פעיל",
    level: "מתקדמים",
    audience: "בוגרים",
    price: "70₪",
    startDate: "05/06/2025",
    endDate: "05/07/2025",
  },
];

export default function SubjectDetails() {
  return (
    <Box sx={{ px: 2, py: 6, maxWidth: "1000px", mx: "auto" }}>
      <Fade in timeout={800}>
        <Box>
          <Typography variant="h3" gutterBottom textAlign="center">
חושן משפט          </Typography>
          <Typography variant="body1" sx={{ mb: 5, textAlign: "center" }}>
            כאן תמצאו שיעורים מעמיקים לפי נושא, עם מידע מלא על כל שיעור והתאמה לרמות שונות.
          </Typography>

          <Grid container spacing={3}>
            {lessons.map((lesson) => (
              <Grid item xs={12} key={lesson.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 2,
                  }}
                >
                  <CardContent sx={{ flex: 1 ,textAlign: "right" }}>
                    <Typography variant="h6" gutterBottom>
                      {lesson.city}
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">שעות: {lesson.hours}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">ריע: {lesson.teacher}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">יום: {lesson.day}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">שעה: {lesson.time}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">סטטוס: {lesson.status}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">תומכ: {lesson.audience}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">ןונגס: {lesson.level}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">מחיר: {lesson.price}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">התחלה: {lesson.startDate}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body2">סיום: {lesson.endDate}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
}


