import { makeStyles } from "@material-ui/styles";
import { theme } from "../../../theme";

export const useStyles = makeStyles({
  hideSaveCloseBtn: {
    display: "none!important"
  },
  saveCloseContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      position: "static",
      padding: 0,
      textAlign: "center"
    },
  },

  saveButtonContainer: {
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0
    }
  },

  saveCloseBtn: {
    width: "139px",
    height: "18px",
    border: "none",
    color: "#830000",

    [theme.breakpoints.up("sm")]: {
      border: "none",
      width: "auto"
    },

    "& .MuiButton-label": {
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "18px",
      textTransform: "none",
      [theme.breakpoints.up("sm")]: {
        color: "#830000",
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: "28px"
      },
    },
  },

  saveCloseLabel: {
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",
    color: "#FFF",
    [theme.breakpoints.up("sm")]: {
      color: "#757575",
    },
  },

  saveCloseProgressContainer: {
    marginLeft: "auto",
    marginTop: "7px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginTop: "0px",
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
