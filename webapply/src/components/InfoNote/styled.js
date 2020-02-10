import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "25px",
    display: "block",
    [theme.breakpoints.only("sm")]: {
      fontSize: "10px"
    }
  }
}));
