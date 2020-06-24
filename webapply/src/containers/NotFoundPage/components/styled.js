import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    maxWidth: 780,
    margin: "0 auto",
    [theme.breakpoints.only("xs")]: {
      height: "50vh"
    }
  },
  appStatusImg: {
    marginBottom: "40px",
    [theme.breakpoints.only("xs")]: {
      marginBottom: "15px"
    }
  },
  appStatusText: {
    marginBottom: "10px"
  }
}));
