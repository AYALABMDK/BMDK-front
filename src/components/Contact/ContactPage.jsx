import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSendContactForm } from "../../hooks/useSendContactForm";

const ContactPage = () => {
  const {
    mutate: sendContact,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSendContactForm();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
   e.preventDefault();
  sendContact(formData, {
    onSuccess: () => {
      setFormData({ name: "", email: "", message: "" });
    },
  });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "80%",
        maxWidth: 600,
        minHeight: "60vh",
        mx: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        direction: "rtl",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <MailOutlineIcon fontSize="large" />
        צור קשר
      </Typography>

      <TextField
        name="name"
        label="שם"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        inputProps={{ dir: "rtl" }}
      />

      <TextField
        name="email"
        label="אימייל"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        inputProps={{ dir: "rtl" }}
      />

      <TextField
        name="message"
        label="הודעה"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        fullWidth
        required
        inputProps={{ dir: "rtl" }}
      />

      <Box textAlign="center" sx={{ mb: 2 }}>
        {" "}
        {/* רווח בתחתית */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending}
          sx={{ minWidth: 120 }}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : "שלח"}
        </Button>
      </Box>

      {isSuccess && <Alert severity="success">ההודעה נשלחה בהצלחה!</Alert>}
      {isError && (
        <Alert severity="error">
          שגיאה בשליחה: {error?.response?.data?.message || "נסה שוב מאוחר יותר"}
        </Alert>
      )}
    </Box>
  );
};

export default ContactPage;
