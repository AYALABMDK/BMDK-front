// import { Box, Typography, Container, Paper, useMediaQuery } from "@mui/material";
// import { motion } from "framer-motion";
// import { useTheme } from "@mui/material/styles";

// const LessonExample = () => {
//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         // background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//               background: "linear-gradient(135deg,#252e49, #558e9e, #558e9e)",

//         color: "white",
//         py: 6,
//       }}
//     >
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
//             דוגמא לשיעור וספר
//           </Typography>
//           <Typography textAlign="center" mb={4}>
//             כאן תוכלו להתרשם מדוגמה של שיעור וספרים - סרטון וקטע קריאה
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: isSmall ? "column" : "row-reverse",
//               gap: 4,
//               alignItems: "stretch",
//               justifyContent: "center",
//             }}
//           >
//             {/* סרטון */}
//             <Paper elevation={4} sx={{ flex: 1, borderRadius: 4, overflow: "hidden" }}>
//               <iframe
//                 title="video-preview"
//                 width="100%"
//                 height={isSmall ? 250 : 450}
//                 src="https://www.hidabroot.org/video/225277"
//                 style={{ border: "none" }}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </Paper>

//             {/* PDF */}
//             <Paper
//               elevation={4}
//               sx={{
//                 flex: 1,
//                 p: 3,
//                 backgroundColor: "#f5f5f5",
//                 color: "#000",
//                 borderRadius: 4,
//               }}
//             >
//               <Typography variant="h5" textAlign="center" gutterBottom>
//                 דוגמה לקריאה
//               </Typography>
//               <Box sx={{ height: isSmall ? 250 : 450 }}>
//                 <iframe
//                   src="/a.pdf"
//                   width="100%"
//                   height="100%"
//                   style={{ border: "none", borderRadius: "8px" }}
//                 ></iframe>
//               </Box>
//               {/* <Box sx={{ textAlign: "center", mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   href="/sample.pdf"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   הורד קובץ PDF
//                 </Button>
//               </Box> */}
//             </Paper>
//           </Box>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default LessonExample;



// import {
//   Box,
//   Typography,
//   Container,
//   Paper,
//   useMediaQuery,
//   Button,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import { motion } from "framer-motion";

// const LessonExample = () => {
//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #252e49, #558e9e)",
//         color: "white",
//         py: 8,
//       }}
//     >
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Typography
//             variant="h3"
//             fontWeight="bold"
//             textAlign="center"
//             gutterBottom
//             sx={{ fontSize: isSmall ? "2rem" : "3rem", mb: 2 }}
//           >
//             דוגמה לשיעור וספר
//           </Typography>

//           <Typography
//             variant="h6"
//             textAlign="center"
//             sx={{ maxWidth: 600, mx: "auto", opacity: 0.9 }}
//             gutterBottom
//           >
//             צפו בשיעור לדוגמה וקראו קטע מתוך אחד הספרים שלנו.
//           </Typography>

//           {/* סרטון למעלה */}
//           <Paper
//             elevation={6}
//             sx={{
//               mt: 6,
//               mb: 6,
//               borderRadius: 4,
//               overflow: "hidden",
//               backgroundColor: "#000",
//             }}
//           >
//             <iframe
//               title="video-preview"
//               width="100%"
//               height={isSmall ? 250 : 500}
//               src="https://www.hidabroot.org/video/225277"
//               style={{ border: "none" }}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </Paper>

//           {/* קטע קריאה והורדה */}
//           <Paper
//             elevation={6}
//             sx={{
//               p: 4,
//               background: "rgba(255, 255, 255, 0.1)",
//               backdropFilter: "blur(8px)",
//               borderRadius: 4,
//               color: "#fff",
//               textAlign: "center",
//             }}
//           >
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               gutterBottom
//               sx={{ mb: 3 }}
//             >
//               קטע קריאה לדוגמה
//             </Typography>

//             <Box
//               sx={{
//                 height: isSmall ? 300 : 500,
//                 mb: 3,
//                 borderRadius: "8px",
//                 overflow: "hidden",
//               }}
//             >
//               <iframe
//                 src="/a.pdf"
//                 width="100%"
//                 height="100%"
//                 style={{ border: "none" }}
//               ></iframe>
//             </Box>

//             <Button
//               variant="contained"
//               color="primary"
//               size="large"
//               startIcon={<CloudDownloadIcon />}
//               href="/a.pdf"
//               target="_blank"
//               sx={{
//                 borderRadius: "50px",
//                 px: 5,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 fontSize: "1rem",
//                 // background: "linear-gradient(45deg, #558e9e, #3b3b3b)",
//                 // "&:hover": {
//                 //   background: "linear-gradient(45deg, #3b3b3b, #558e9e)",
//                 // },
//               }}
//             >
//               הורדת הקובץ
//             </Button>
//           </Paper>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default LessonExample;



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
              mt: 6,
              mb: 6,
              borderRadius: 4,
              // overflow: "hidden",
              // backgroundColor: "#000",
            }}
          >
            <iframe
              title="video-preview"
              width="100%"
              height={isSmall ? 250 : 500}
              src="https://www.hidabroot.org/video/225277"
              style={{ border: "none" }}
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
