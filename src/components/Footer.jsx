import {
    Typography,
    Box,
    Grid,
    Link,
} from "@mui/material";

const Footer = () => {
    return <>
        <Box sx={{ backgroundColor: "#111", color: "#bbb", px: 4, pt: 6 }}>
            <Grid container spacing={4} justifyContent="center">
                {/* Column 1 */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>ראשי</Typography>
                    <Link href="/" underline="none" color="inherit" display="block">דרך קצרה</Link>
                    <Link href="lessons" underline="none" color="inherit" display="block">הכשרה ומסלולים</Link>
                    <Link href="OnlineLearning" underline="none" color="inherit" display="block">למידה מקוונת</Link>
                </Grid>

                {/* Column 2 */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>מכירות</Typography>
                    <Link href="OrderBook" underline="none" color="inherit" display="block">קניית ספרים</Link>
                    <Link href="OnlineLearning" underline="none" color="inherit" display="block">קניית סרטונים</Link>
                </Grid>

                {/* Column 3 */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>סל הקניות</Typography>
                    <Link href="cart" underline="none" color="inherit" display="block">הסל שלי</Link>
                </Grid>

                {/* Column 4 */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>אודות</Typography>
                    <Link href="about" underline="none" color="inherit" display="block">אודותינו</Link>
                    <Link href="LessonExample" underline="none" color="inherit" display="block">שיעורים לדוגמא</Link>
                    <Link href="contactPage" underline="none" color="inherit" display="block">צור קשר</Link>
                </Grid>
            </Grid>

            {/* Contact Line */}
            <Typography sx={{ py: 2, color: "#bbb", textAlign: "center", fontSize: "1.1rem", mt: 4 }}>
                בית שמש | 1111* | bmdk110@gmail.com
            </Typography>

            {/* Bottom Line */}
            <Typography sx={{ py: 2, color: "#aaa", textAlign: "center" }}>
                © 2025 כל הזכויות שמורות - דרך קצרה
            </Typography>
        </Box>
    </>
};

export default Footer;