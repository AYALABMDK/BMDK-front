import { Box } from "@mui/material";

const PageHeaderImage = ({ src, alt = "כותרת", height = { xs: 180, md: 300 } }) => (
  <Box sx={{ width: "100%", height, mb: 4 }}>
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 2,
      }}
    />
  </Box>
);

export default PageHeaderImage;
