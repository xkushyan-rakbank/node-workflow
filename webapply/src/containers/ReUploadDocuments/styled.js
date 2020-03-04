import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    minHeight: "calc(100vh - 170px)",
    display: "flex",
    flexDirection: "column"
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
    letterSpacing: "normal"
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
});
