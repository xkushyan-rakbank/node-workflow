import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "calc(100vh - 175px)",
    backgroundColor: "#ffffff",
    maxWidth: 780,
    margin: "0 auto"
  },

  buttonText: {
    "& svg": {
      width: "24px",
      height: "24px"
    }
  }
});
