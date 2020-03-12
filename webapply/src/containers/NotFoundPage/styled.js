import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  appStatus: {
    position: "absolute",
    top: "50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    maxWidth: 780,
    margin: "0 auto",
    transform: "translateY(-50%)"
  },

  buttonText: {
    "& svg": {
      width: "24px",
      height: "24px"
    }
  }
});
