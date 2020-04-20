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
    marginBottom: 0,
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "block",
      fontSize: 38,
      lineHeight: "46px"
    }
  }
}));
