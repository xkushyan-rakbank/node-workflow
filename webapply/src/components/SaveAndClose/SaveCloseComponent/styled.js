import { makeStyles } from "@material-ui/styles";
import { theme } from "../../../theme";

export const useStyles = makeStyles({
  saveCloseContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "2vh",
    right: "1vh",
    [theme.breakpoints.up("sm")]: {
      position: "unset",
      right: "unset",
      paddingTop: "40px",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },

  saveButtonContainer: {
    marginLeft: "auto",
  },

  saveCloseBtn: {
    width: "125px",
    height: "40px",
    color: "white",
    borderColor: "white",
    borderRadius: "21px",

    [theme.breakpoints.up("sm")]: {
      color: "black",
      borderColor: "black",
    },

    "& .MuiButton-label": {
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "16px",
      textTransform: "none",
    },
  },

  saveCloseLabel: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",
    color: "#FFF",
    [theme.breakpoints.up("sm")]: {
      color: "black",
    },
  },

  saveCloseProgressContainer: {
    marginLeft: "auto",
    marginTop: "7px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "unset",
    },
  },

  progressLayout: {
    display: "inline-flex",
  },

  circularProgress: {
    color: "white",
    marginRight: "8px",
    marginTop: "2px",
    [theme.breakpoints.up("sm")]: {
      color: "black",
    },
  },
});
