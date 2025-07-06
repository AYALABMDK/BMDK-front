// import { Card, CardContent, Typography, Button, Box } from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// const ProductCard = ({ title, author, description, type, onPurchaseClick }) => {
//   return (

//     <Card
//       sx={{
//         width: 260,
//         height: 270, // גובה קבוע
//         borderRadius: 1,
//         boxShadow: 3,
//         color: "#fff",
//         backgroundImage: 'url("/assets/bg6.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         border: "10px solid white",
//         // display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         position: "relative",
//         p: 2,
//       }}
//     >
//         {/* אייקון של וידאו */}
//   {type === "video" && (
//     <Box
//       sx={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         opacity: 0.4,
//         zIndex: 1,
//       }}
//     >
//       <PlayArrowIcon sx={{ fontSize: 80, color: "white" }} />
//     </Box>
//   )}
//       {/* תוכן גמיש */}
//       <CardContent sx={{ flexGrow: 1, p: 0 }}>
//         {/* פס לבן עליון */}
//         <Box
//           sx={{
//             height: 2,
//             backgroundColor: "white",
//             borderRadius: 2,
//             mx: 1,
//             mb: 2,
//           }}
//         />

//         <Typography
//           variant="h5"
//           fontWeight="bold"
//           gutterBottom
//           textAlign="center"
//           sx={{ minHeight: 48 }} // גובה מינימלי כדי לא לשבור את הגובה
//         >
//           {title}
//         </Typography>

//         <Typography
//           variant="h6"
//           gutterBottom
//           textAlign="center"
//           sx={{ minHeight: 32 }}
//         >
//           {author}
//         </Typography>

//         <Typography
//           variant="body2"
//           textAlign="center"
//           sx={{ mb: 2, minHeight: 48 }}
//         >
//           {description}
//         </Typography>
//       </CardContent>

//       {/* כפתור בתחתית הכרטיס */}
//       <Button
//         variant="contained"
//         fullWidth
//         onClick={onPurchaseClick}
//         sx={{
//           backgroundColor: "#252e49",
//           color: "white",
//           minHeight: "40px", // שומר על גובה קבוע לכפתור
//           "&:hover": {
//             backgroundColor: "white",
//             color: "#252e49",
//           },
//         }}
//       >
//         קנה עכשיו
//       </Button>
//     </Card>
//   );
// };

// export default ProductCard;




// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";
// import { Star } from "@mui/icons-material";

// const ProductCard = ({ title, author, description, onPurchaseClick }) => {
//   return (
//     <Card
//       sx={{
//         background: "#fff",
//         borderRadius: 4,
//         p: 2,
//         minWidth: 250,
//         maxWidth: 250,
//         textAlign: "center",
//         boxShadow: 5,
//         transition: "transform 0.3s ease",
//         "&:hover": { transform: "scale(1.05)" },
//         height: "100%", // כדי שכל הקלפים יהיו באותו גובה
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="subtitle2" color="text.secondary">
//           {author}
//         </Typography>
//         <Typography variant="body2" sx={{ mt: 1 }}>
//           {description}
//         </Typography>
//       </CardContent>
//       <CardActions sx={{ justifyContent: "center", mt: "auto" }}>
//         <Button
//           size="small"
//           endIcon={<Star />}
//           onClick={onPurchaseClick}
//         >
//           הוסף לעגלה
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductCard;


import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const ProductCard = ({ title, author, description, onPurchaseClick }) => {
  return (
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {author}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mt: "auto" }}>
        <Button
          size="small"
          startIcon={<LocalGroceryStoreIcon sx={{ color: "#558e9e"  , transition: "all 0.3s ease",
 }} />}
          onClick={onPurchaseClick}
        >
          הוסף לעגלה
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
