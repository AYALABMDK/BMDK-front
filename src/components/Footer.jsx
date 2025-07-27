import {
  Typography,
  Box,
  Grid,
  Link,
  Container
} from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#252e49", color: "#bbb", px: 4, pt: 6 }}>
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={3} textAlign="center">
            <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 ,fontSize: "1.2rem" }}>
              ראשי
            </Typography>
            <Link href="/" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>דרך קצרה</Link>
            <Link href="lessons" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>מסלולי הכשרה</Link>
            <Link href="OnlineLearning" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>למידה מקוונת</Link>
          </Grid>

          {/* Column 2 */}
          <Grid item sx={12} sm={6} md={3} textAlign="center">
            <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1, fontSize: "1.2rem" }}>
              מכירות
            </Typography>
            <Link href="OrderBook" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>קניית ספרים</Link>
            <Link href="OnlineLearning" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>קניית סרטונים</Link>
          </Grid>

          {/* Column 3 */}
          <Grid item sx={12} sm={6} md={3} textAlign="center">
            <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1,fontSize: "1.2rem" }}>
              סל הקניות
            </Typography>
            <Link href="cart" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>הסל שלי</Link>
          </Grid>

          {/* Column 4 */}
          <Grid item sx={12} sm={6} md={3} textAlign="center">
            <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 ,fontSize: "1.2rem" }}>
              אודות
            </Typography>
            <Link href="about" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>אודותינו</Link>
            <Link href="LessonExample" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>שיעורים לדוגמא</Link>
            <Link href="contactPage" underline="none" color="inherit" display="block" sx={{ fontSize: "1.1rem" }}>צור קשר</Link>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Line */}
      <Typography sx={{ py: 2, color: "#bbb", textAlign: "center", fontSize: "1.1rem", mt: 4 , fontWeight: "bold" }}>
        בית שמש | 1111* | bmdk110@gmail.com
      </Typography>

      {/* Bottom Line */}
      <Typography sx={{ py: 2, color: "#aaa", textAlign: "center" }}>
        © 2025 כל הזכויות שמורות - דרך קצרה
      </Typography>
    </Box>
  );
};

export default Footer;
