"use client";

import { createTheme } from "@mui/material/styles";

export const formaSaludMuiTheme = createTheme({
  palette: {
    primary: {
      main: "#0E6E63",
      dark: "#073F38",
      light: "#2A9D8F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0F2942",
      dark: "#081826",
      light: "#1A3E61",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#C6992E",
      light: "#EFDFAE",
      contrastText: "#182430",
    },
    info: {
      main: "#0284C7",
      light: "#E0F2FE",
    },
    success: {
      main: "#059669",
      light: "#D1FAE5",
    },
    error: {
      main: "#DC2626",
      light: "#FEE2E2",
    },
    background: {
      default: "#F4F7F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#182430",
      secondary: "#57626D",
    },
    divider: "#E1E7E4",
  },
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
    h5: {
      fontWeight: 700,
      color: "#0F2942",
    },
    h6: {
      fontWeight: 600,
      color: "#0F2942",
    },
    subtitle1: {
      fontWeight: 600,
      color: "#182430",
    },
    subtitle2: {
      fontWeight: 500,
      color: "#57626D",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 18px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(14, 110, 99, 0.2)",
          },
          "&.MuiButton-containedPrimary": {
            backgroundColor: "#0E6E63",
            "&:hover": {
              backgroundColor: "#073F38",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E1E7E4",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            "& fieldset": {
              borderColor: "#E1E7E4",
            },
            "&:hover fieldset": {
              borderColor: "#0E6E63",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0E6E63",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E1E7E4",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0E6E63",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0E6E63",
            borderWidth: 2,
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 600,
          fontSize: "0.85rem",
          "&.Mui-active": {
            color: "#0E6E63",
            fontWeight: 700,
          },
          "&.Mui-completed": {
            color: "#0F2942",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#E1E7E4",
          "&.Mui-active": {
            color: "#0E6E63",
          },
          "&.Mui-completed": {
            color: "#059669",
          },
        },
      },
    },
  },
});
