import React, { useState } from "react";
import { TextField, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useAdminAuth } from "../hooks/useAdminAuth";

const EditableField = ({
  value,
  onSave,
  variant = "body1",
  sx = {},
  multiline = false,
}) => {
  const isAdmin = useAdminAuth();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleSave = () => {
    if (text !== value) {
      onSave(text);
    }
    setEditing(false);
  };

  // אם עדיין בטעינה – לא להציג כלום
  if (isAdmin === null) return null;

  // אם המשתמש לא מנהל – הצגה רגילה בלבד
  if (!isAdmin) {
    return (
      <Typography variant={variant} sx={sx}>
        {value}
      </Typography>
    );
  }

  // עריכה זמינה רק אם המשתמש מנהל
  return editing ? (
    <TextField
      fullWidth
      multiline={multiline}
      variant="outlined"
      size="small"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleSave}
      autoFocus
    />
  ) : (
    <Typography
      variant={variant}
      sx={{ ...sx, cursor: "pointer" }}
      onDoubleClick={() => setEditing(true)}
    >
      {value}
      {/* <IconButton size="small" sx={{ ml: 1 }} onClick={() => setEditing(true)}>
        <Edit fontSize="small" />
      </IconButton> */}
    </Typography>
  );
};

export default EditableField;
