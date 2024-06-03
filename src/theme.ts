import { createTheme } from "@mui/material/styles";
const primaryMain = "rgba(38,63,64)";
const secondaryMain = "rgb(112, 163, 164)";
const primaryText = "rgba(245,245,245,0.95)";
const secondaryText = "rgba(255,255,255,0.75)";
const bgColor = "rgba(12,12,12)";
const cardBorderColor = "rgba(255,255,255,0.2)";
const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain, // Warm orange color
    },
    secondary: {
      main: secondaryMain, // Light yellow color
    },
    background: {
      default: bgColor, // Light gray background
      paper: bgColor,
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
          backgroundColor: bgColor,
          color: primaryText,
          borderColor: cardBorderColor,
          borderRadius: "10px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "20%",
          backgroundColor: primaryMain,
          color: primaryText,
          "&:hover": {
            backgroundColor: "rgba(38,63,64,0.8)",
            transition: "background-color 0.3s ease",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorLeft: {
          width: "20%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "20%",
            boxSizing: "border-box",
          },
          backgroundColor: "rgb(28,28,28)",
          color: secondaryText,
          "@media (max-width: 820px)": {
            zIndex: 10,
            width: "fit-content",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          color: secondaryText,
          "&:hover": {
            backgroundColor: "rgb(35, 35, 35)",
            borderRadius: "12px",
            transition: "background-color 0.3s ease",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.05)",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: bgColor,
          "&:hover": {
            backgroundColor: primaryMain,
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: "transparent",
          fontSize: "2em",
          border: "1px solid rgba(255,255,255,0.20)",
          borderRadius: "5px",
        },
      },
    },
  },
});

export default theme;
