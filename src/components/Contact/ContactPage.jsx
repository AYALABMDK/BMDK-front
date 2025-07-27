import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Container,
} from "@mui/material";
import { useSendContactForm } from "../../hooks/useSendContactForm";
import PageHeaderImage from "../PageHeaderImage";

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
    <Box sx={{ direction: "rtl", py: 1 }}>
  <Container>
<PageHeaderImage src="/assets/d.png" alt="צור קשר" />

      {/* תוכן דו-צדדי */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs: "column-reverse", md: "row"  },
          gap: 4,
          width: "90%",
          maxWidth: "1000px",
          mx: "auto",
        }}
      >
        {/* טופס צד ימין */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 3,

          }}
        >
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

          <Box textAlign="center" sx={{ mt: 1 }}>
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
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block", } }} />  
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            p: 3,
          }}
        >        <Typography variant="h4" fontWeight="bold" gutterBottom >
צור קשר          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ?איך נוכל לעזור
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            אם יש לך שאלה, בקשה או הצעה – נשמח לשמוע ממך. מלא את הטופס ונחזור אליך בהקדם האפשרי.
          </Typography>

          <Typography variant="body2" color="text.secondary">
             bmdk110@gmail.com<strong> דוא"ל</strong><br />
            <strong>טלפון </strong> 0527154646<br />
            <strong>שעות פעילות </strong> א׳–ה׳ 9:00–17:00
          </Typography>
        </Box>
      </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
