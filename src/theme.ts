import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { lighten, darken } from "@material-ui/core";

const primaryColor = '#1976d2';
const secondaryColor = '#333';
const errorColor = '#f44336';
const warningColor = '#ff9800';
const infoColor = '#2196f3';
const successColor = '#4caf50';

const coef = 0.2;

const Theme: ThemeOptions = {
  palette: {
    primary: {
      light: lighten(primaryColor, coef),
      main: primaryColor,
      dark: darken(primaryColor, coef)
    },
    secondary: {
      light: lighten(secondaryColor, coef),
      main: secondaryColor,
      dark: darken(secondaryColor, coef)
    },
    error: {
      light: lighten(errorColor, coef),
      main: errorColor,
      dark: darken(errorColor, coef)
    },
    warning: {
      light: lighten(warningColor, coef),
      main: warningColor,
      dark: darken(warningColor, coef)
    },
    info: {
      light: lighten(infoColor, coef),
      main: infoColor,
      dark: darken(infoColor, coef)
    },
    success: {
      light: lighten(successColor, coef),
      main: successColor,
      dark: darken(successColor, coef)
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
};

export default Theme;
