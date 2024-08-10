import { createTheme } from "@mui/material";
import { ruRU } from "@mui/material/locale";

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1100,
        lg: 1440,
        xl: 1920,
      },
    }, 
    typography: {
      fontFamily: [
        'Manrope',
        'Quicksand',
        'sans-serif'
      ].join(','),
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#47997A',
        light: '#BBE8D7',
        dark: '#47997A',
        contrastText: '#fff',
      },
      secondary: {
        main: '#FFC539',
        light: '#E6DC61',
        dark: '#FFC539',
        contrastText: '#000',
      },
    },
  }, ruRU);

export default theme;