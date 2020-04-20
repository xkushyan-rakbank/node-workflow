import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 40,
    [theme.breakpoints.up("sm")]: {
      boxSizing: "border-box",
      minHeight: "100vh",
      paddingTop: "15vh",
      marginBottom: 0
    }
  },
  heading: {
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "block",
      marginTop: 0,
      marginBottom: 0,
      fontSize: 38,
      lineHeight: "46px"
    }
  }
}));
