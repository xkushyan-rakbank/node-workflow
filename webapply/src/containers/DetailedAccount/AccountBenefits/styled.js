import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  indent: {
    marginBottom: "20px"
  },
  notification: {
    width: "100%",
    paddingTop: "20px",
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    top: "calc(100vh - 290px)",
    position: "absolute"
  },
  icon: {
    width: "56px",
    height: "56px",
    [theme.breakpoints.up("lg")]: {
      width: "64px",
      height: "64px"
    }
  },
  styleInfoNotes: {
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 65,
      left: 0,
      right: 0
    }
  }
}));
