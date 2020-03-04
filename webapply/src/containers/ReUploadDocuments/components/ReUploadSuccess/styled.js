import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    marginBottom: 40
  },
  title: {
    marginBottom: 10,
    fontSize: 24,
    lineHeight: "32px",
    letterSpacing: "normal"
  },
  subtitle: {
    fontSize: 20,
    lineHeight: "26px",
    letterSpacing: "normal"
  },
  backLink: {
    marginTop: 58
  }
});
