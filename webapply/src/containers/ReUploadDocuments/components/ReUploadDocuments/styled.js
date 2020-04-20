import { makeStyles } from "@material-ui/core/index";

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "calc(100vh - 170px)",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "block",
      marginBottom: 40,
      marginTop: 0,
      fontSize: 38,
      lineHeight: "46px"
    }
  },
  heading: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 600,
    letterSpacing: "normal",
    color: "#373737",
    marginTop: 0,
    marginBottom: 10
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 68,
    fontSize: 20,
    lineHeight: "26px",
    letterSpacing: "normal",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 40
    }
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "auto",
    marginBottom: 80
  },
  submitBtn: {
    marginLeft: 40
  }
}));
