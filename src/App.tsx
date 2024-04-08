import React from "react";
import "./utils/global.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "./utils/theme";

const theme = new Theme();

const rootStyle = getComputedStyle(document.documentElement);

const cssVariables = {
  secondary: rootStyle.getPropertyValue("--secondary").trim(),
  background: rootStyle.getPropertyValue("--background").trim(),
  textDark: rootStyle.getPropertyValue("--text-d").trim(),
  textLight: rootStyle.getPropertyValue("--text-l").trim(),
  textDisabled: rootStyle.getPropertyValue("--text-disabled").trim(),
};

const materialTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: theme.primary,
    },
    secondary: {
      main: cssVariables.secondary,
    },
    error: {
      main: theme.danger,
    },
    warning: {
      main: theme.alert,
    },
    info: {
      main: theme.info,
    },
    success: {
      main: theme.success,
    },
    background: {
      default: cssVariables.background,
    },
    text: {
      primary: cssVariables.textDark,
      secondary: cssVariables.textLight,
      disabled: cssVariables.textDisabled,
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
    },
    allVariants: {
      color: cssVariables.textLight,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

class App extends React.Component<any, any> {
  render() {
    return (
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        {this.props.children}
      </ThemeProvider>
    );
  }
}

export default App;
