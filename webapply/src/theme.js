import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
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
