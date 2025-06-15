import React, { useState } from "react";
import { Fab, Tooltip, Dialog, IconButton, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ContactPage from "./ContactPage";

const ContactFab = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="צרו איתנו קשר" placement="left">
        <Fab
          color="primary"
          aria-label="contact"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 140,
            left: 20,
            width: 80,
            height: 80,
            zIndex: 1200,
          }}
        >
          <EmailIcon sx={{ fontSize: 40 }} />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <ContactPage />
        </Box>
      </Dialog>
    </>
  );
};

export default ContactFab;
