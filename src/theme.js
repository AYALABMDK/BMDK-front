// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   direction: 'rtl',
//   typography: {
//     fontFamily: 'Arial, sans-serif',
//   },
// });

// export default theme;


import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // 
  direction: 'rtl',
  typography: {
    fontFamily: 'Assistant, sans-serif',
    h1: { fontFamily: 'Heebo, sans-serif' },
    h2: { fontFamily: 'Heebo, sans-serif' },
    h3: { fontFamily: 'Heebo, sans-serif' },
    button: { fontFamily: 'Assistant, sans-serif' },
  },
   palette: {
    text: {
      primary: '#252e49',   // צבע טקסט עיקרי (כחול כהה לדוגמה)
      //  secondary: '#5c6bc0', // צבע טקסט משני
    },
  },
   palette: {
    primary: {
      main: '#558e9e', // הצבע שלך במקום כחול
    },
  },
  
});

export default theme;