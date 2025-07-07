import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
      primary: '#252e49',
    },
    primary: {
      main: '#558e9e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: '#558e9e', // צבע ההדגשה שלך 
          color: 'white',           // צבע הטקסט בזמן ההדגשה
        },
      },
    },
  },
});

export default theme;
