import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useGetPageByKey, useUpdatePage } from "../hooks/usePages";
import EditableField from "../components/EditableField";

const AboutPage = () => {
  const { data, isLoading } = useGetPageByKey("about");
  const updatePageMutation = useUpdatePage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  const handleFieldSave = (fieldName, newValue) => {
    setPageData((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
    updatePageMutation.mutate({
      key: "about",
      updateData: { [fieldName]: newValue },
    });
  };

  if (isLoading || !pageData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="white">
          טוען...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#252e49, #558e9e, #558e9e)",
        py: 8,
        color: "white",
        direction: "rtl",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <EditableField
            variant="h3"
            value={pageData.title}
            onSave={(val) => handleFieldSave("title", val)}
            sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
          />

          <EditableField
            variant="h6"
            value={pageData.subtitle}
            onSave={(val) => handleFieldSave("subtitle", val)}
            sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
          />
          

          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.1)",
              mb: 6,
              textAlign: "right",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            <EditableField
              value={pageData.description}
              onSave={(val) => handleFieldSave("description", val)}
              multiline
              variant="body1"
            />
          </Paper>

          <EditableField
            variant="h4"
            value={pageData.teacherTitle}
            onSave={(val) => handleFieldSave("teacherTitle", val)}
            sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
          />

          <Grid container spacing={4} justifyContent="center">
            {pageData.teamMembers?.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={member.name + index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Paper
                    elevation={10}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 2,
                        border: "2px solid white",
                      }}
                    />
                    <EditableField
                      variant="h6"
                      value={member.name}
                      onSave={(val) => {
                        const updatedMembers = [...pageData.teamMembers];
                        updatedMembers[index].name = val;
                        handleFieldSave("teamMembers", updatedMembers);
                      }}
                      sx={{ fontWeight: "bold" }}
                    />
                    <EditableField
                      variant="subtitle2"
                      value={member.role}
                      onSave={(val) => {
                        const updatedMembers = [...pageData.teamMembers];
                        updatedMembers[index].role = val;
                        handleFieldSave("teamMembers", updatedMembers);
                      }}
                      sx={{
                        mb: 2,
                        fontStyle: "italic",
                        opacity: 0.8,
                      }}
                    />
                    <EditableField
                      variant="body2"
                      value={member.description}
                      onSave={(val) => {
                        const updatedMembers = [...pageData.teamMembers];
                        updatedMembers[index].description = val;
                        handleFieldSave("teamMembers", updatedMembers);
                      }}
                      multiline
                    />
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
