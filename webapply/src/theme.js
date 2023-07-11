import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      // xs: 0,
      // ls: 769,
      // sm: 1024,
      // md: 1280,
      // lg: 1440,
      // xl: 1920
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1920
    }
  },
  transitions: {
    duration: 0.3
  },
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#517085"
    },
    action: {
      disabledBackground: "#d3d8db"
    },
    button: {
      color: "#263d4c",
      backgroundColor: "#ffffff"
    },
    text: {
      color: "#373737"
    }
  }
});
