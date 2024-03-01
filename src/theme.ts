import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(255,143,0,0.82)", // Warm orange color
    },
    secondary: {
      main: "rgba(255,141,79,0.84)", // Light yellow color
    },
    background: {
      default: "#F5F5F5", // Light gray background
    },
    text: {
      primary: "#333333", // Dark text color
      secondary: "#363535", // Lighter text color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: "#423e39", // Warm orange for headings
    },
    h2: {
      color: "#423e39",
    },
    h3: {
      color: "#423e39",
    },
    h4: {
      color: "#333333", // Dark text color for subheadings
    },
    h5: {
      color: "#333333",
    },
    h6: {
      color: "#333333",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,224,198)", // White background for cards
          color: "#333333", // Dark text color for card content
        },
      },
    },
  },
});

export default theme;
