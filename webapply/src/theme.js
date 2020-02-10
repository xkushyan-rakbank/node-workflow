import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  breakpoints: {
    keys: ["sm", "md", "lg", "xl"],
    values: {
      sm: 0,
      md: 1024,
      lg: 1280,
      xl: 1920
    }
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
