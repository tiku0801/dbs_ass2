import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#023556",
    },
    secondary: {
      main: "#560234",
    },
    background: {
      default: "#e9f3f9",
    },
  },
  typography: {
    h6: {
      fontSize: "1.4rem",
    },
    body1: {
      fontWeight: 400,
    },
  },
});
