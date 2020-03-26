import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
  },
  appStatusImg: {
    marginBottom: "40px"
  },
  appStatusText: {
    marginBottom: "10px"
  },
  buttonText: {
    "& svg": {
      width: "24px",
      height: "24px"
    }
  }
});
