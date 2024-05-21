import { createTheme } from "@mui/material/styles";
const buttonColor = "rgba(95,158,160,0.60)";
const buttonHoverColor = "rgba(95,158,160,0.8)";
const primaryText = "rgba(255,255,255,0.95)";
const secondaryText = "rgba(255,255,255,0.75)";
const bgColor = "rgba(18,18,18)";
const cardBorderColor = "rgba(255,255,255,0.2)";
const theme = createTheme({
  palette: {
    primary: {
      main: buttonColor, // Warm orange color
    },
    secondary: {
      main: buttonHoverColor, // Light yellow color
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
          backgroundColor: buttonHoverColor,
          color: secondaryText,
          "&:hover": {
            backgroundColor: buttonColor,
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
          backgroundColor: "rgb(37,36,36)",
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
            backgroundColor: "rgba(48,52,52,0.66)",
            borderRadius: "12px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.60)",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.15)",
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
    MuiDivider: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderTop: `thin solid ${secondaryText}`,
          },
        },
      },
    },
  },
});

export default theme;
