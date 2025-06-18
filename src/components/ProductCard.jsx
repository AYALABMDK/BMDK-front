import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const ProductCard = ({ title, author, description, type, onPurchaseClick }) => {
  return (

    <Card
      sx={{
        width: 260,
        height: 270, // גובה קבוע
        borderRadius: 1,
        boxShadow: 3,
        color: "#fff",
        backgroundImage: 'url("/assets/bg6.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "10px solid white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
        p: 2,
      }}
    >
      {/* תוכן גמיש */}
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        {/* פס לבן עליון */}
        <Box
          sx={{
            height: 2,
            backgroundColor: "white",
            borderRadius: 2,
            mx: 1,
            mb: 2,
          }}
        />

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ minHeight: 48 }} // גובה מינימלי כדי לא לשבור את הגובה
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          sx={{ minHeight: 32 }}
        >
          {author}
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mb: 2, minHeight: 48 }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* כפתור בתחתית הכרטיס */}
      <Button
        variant="contained"
        fullWidth
        onClick={onPurchaseClick}
        sx={{
          backgroundColor: "#252e49",
          color: "white",
          minHeight: "40px", // שומר על גובה קבוע לכפתור
          "&:hover": {
            backgroundColor: "white",
            color: "#252e49",
          },
        }}
      >
        קנה עכשיו
      </Button>
    </Card>
  );
};

export default ProductCard;
