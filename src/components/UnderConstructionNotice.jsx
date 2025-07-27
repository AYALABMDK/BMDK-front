import React, { useState} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Slide
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UnderConstructionNotice = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="under-construction-title"
      aria-describedby="under-construction-description"
    >
      <DialogTitle
        id="under-construction-title"
        sx={{ textAlign: 'center', backgroundColor: '#ffe082' }}
      >
        <ConstructionIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} />
        האתר עדיין בבנייה 
      </DialogTitle>
      <DialogContent dividers sx={{ textAlign: 'center', padding: 3 }}>
        <Typography variant="body1" gutterBottom>
     תודה שנכנסת! האתר עדיין בפיתוח ועובר עיצוב,
        </Typography>
        
         <Typography variant="body1" gutterBottom>
נשמח שתיכנס להתרשם גם בהמשך.
 </Typography>
          <Typography variant="body2" gutterBottom>
צוות האתר </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            borderRadius: '20px',
            paddingX: 3,
            paddingY: 1,
            textTransform: 'none'
          }}
        >
          הבנתי
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnderConstructionNotice;
