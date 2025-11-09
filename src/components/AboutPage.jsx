import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatItem = ({ value, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const isCountable = /^[\d]+[%+]*$/.test(value);

  let parsedValue = 0;
  let suffix = "";

  if (isCountable) {
    parsedValue = parseInt(value.replace(/[^\d]/g, ""), 10);
    suffix = value.replace(/[\d]/g, "");
  }

  return (
    <Grid item xs={6} md={3} ref={ref}>
      <Box textAlign="center">
        <Typography variant="h2" fontWeight="bold">
          {isCountable ? (inView ? <CountUp end={parsedValue} duration={2} /> : 0) : value}
          {isCountable && suffix}
        </Typography>
        <Typography variant="subtitle1">{label}</Typography>
      </Box>
    </Grid>
  );
};



const AboutPage = () => {
  const features = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      title: "הצלחה מוכחת",
      description: ".שיטת לימוד שמביאה לתוצאות מעולות ולביטחון במבחנים",
    },
    {
      icon: <QueryStatsIcon sx={{ fontSize: 40 }} />,
      title: "הכנה ממוקדת",
      description: ".התאמה מלאה לדרישות מבחני הרבנות והדיינות",
    },
    {
      icon: <VideoCameraFrontIcon sx={{ fontSize: 40 }} />,
      title: "שיעורי זום אישיים",
      description:
        ".ליווי אישי וקבוצתי המביא להנאה רבה מהלימוד ולהצלחה במבחנים",
    },
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      title: "סיכומים ממוקדים",
      description:
        ".חומרי לימוד מוסברים היטב בצורה ברורה ההופכת כל לימוד לחוויה",
    },
  ];

  const stats = [
    { label: "זמינות לשאלות", value: "24/6" },
    { label: "בוגרים מוצלחים", value: "500+" },
    { label: "שנות ניסיון", value: "25" },
    { label: "אחוז הצלחה", value: "99%" },
  ];

  return (
    <Box
      sx={{
        direction: "rtl",
        py: 6,
        background: "linear-gradient(135deg, #252e49, #558e9e)",
        color: "white",
      }}
    >
      {/* תוכן דו-צדדי */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: 4,
          width: "90%",
          maxWidth: "1000px",
          mx: "auto",
        }}
      >
        {/* טופס צד ימין */}
        <Box
          component="form"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            px: 3,
            justifyContent: "flex-start",
            mt: 4.5,
            direction: "ltr",
          }}
        >
          <Typography
            variant="h6"
            mt={1}
            sx={{
              lineHeight: 2.3,
            }}
          >
            המטרה שלנו בבית המדרש היא להפוך את הלימוד לחוויה: במקום לעבור תקופות
            לימוד מתישות ולסיים לעיתים באכזבה – אצלנו תצליחו באמת. אנו מספקים
            כלים אפקטיביים, מסודרים וברורים שיקדמו אתכם צעד־אחר־צעד להצלחה.
          </Typography>

          <Box textAlign="center" sx={{ mt: 1 }}></Box>
        </Box>

        <Box
          sx={{
            alignSelf: "flex-start",
            mt: "53px",
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: {
                xs: "none",
                md: "block",
                borderRight: "4px solid white",
                height: "220px",
                mt: 44,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Typography variant="h1" fontWeight="bold">
            דרך{" "}
          </Typography>
          <Typography variant="h1" fontWeight="bold">
            קצרה{" "}
          </Typography>
          <Typography variant="h6" mb={4}>
            המענה המושלם לנבחני רבנות ודיינות
          </Typography>
        </Box>
      </Box>

      {/* Features */}
      <Grid container spacing={2} justifyContent="center" mb={9}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ textAlign: "center" }}
            >
              <Box sx={{ p: 2 }}>
                <Box mb={1}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {feature.title}
                </Typography>
                <Typography variant="body2">{feature.description}</Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Stats */}
      <Grid container spacing={4} justifyContent="center" mb={9}>
        {stats.map((stat, idx) => (
          <StatItem key={idx} value={stat.value} label={stat.label} />
        ))}
      </Grid>

      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
        ?מוכנים להתחיל את המסע להצלחה
      </Typography>
      <Typography variant="h6" textAlign="center">
        .בית המדרש "דרך קצרה" נותן גם אפשרות לשיעורי זום שביחד עם הסיכומים
        מביאים את הלומדים להנאה רבה מהלימוד ולא רק מההצלחה
        <br />
        <strong>כי ההצלחה שלכם היא המטרה שלנו</strong>
      </Typography>
    </Box>
  );
};

export default AboutPage;

