import { createTheme } from "@mui/material/styles";
const buttonColor = "rgba(95,158,160,0.60)";
const buttonHoverColor = "rgba(95,158,160)";
const primaryText = "rgba(255,255,255,0.95)";
const secondaryText = "rgba(255,255,255,0.75)";
const bgColor = "rgba(18,18,18)";
const theme = createTheme({
  palette: {
    primary: {
      main: buttonHoverColor, // Warm orange color
    },
    secondary: {
      main: buttonColor, // Light yellow color
    },
    background: {
      default: bgColor, // Light gray background
    },
    text: {
      primary: primaryText, // Dark text color
      secondary: secondaryText, // Lighter text color
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(18,18,18,0.96)", // White background for cards
          color: primaryText, // Dark text color for card content
          borderColor: "rgba(255,255,255,0.2)",
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: buttonColor,
          color: secondaryText,
          "&:hover": {
            backgroundColor: buttonHoverColor,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "20%",
          backgroundColor: buttonColor,
          color: secondaryText,
          "&:hover": {
            backgroundColor: buttonHoverColor,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "17.5%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "17.5%",
            boxSizing: "border-box",
          },
          backgroundColor: "rgb(37,36,36)",
          color: secondaryText,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          color: secondaryText,
          "&:hover": {
            backgroundColor: "rgba(48,52,52,0.66)",
            borderRadius: "12px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.4)",
          borderRadius: "10px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: bgColor,
          "&:hover": {
            backgroundColor: buttonColor,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: bgColor,
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: bgColor,
          borderRadius: "15px",
        },
      },
    },
  },
});

export default theme;
