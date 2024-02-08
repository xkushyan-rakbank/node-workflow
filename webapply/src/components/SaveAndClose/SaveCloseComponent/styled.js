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
    }
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
      }
    }
  },

  saveCloseLabel: {
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "2px",
    color: "#757575",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.875rem",
      lineHeight: "18px"
    }
  },

  saveCloseProgressContainer: {
    marginLeft: "19px",
    marginTop: "0px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginTop: "0px"
    }
  },

  progressLayout: {
    display: "inline-flex",
    gap: "2px",
    [theme.breakpoints.up("sm")]: {
      gap: "unset"
    }
  },

  circularProgress: {
    width: "8px !important",
    height: "8px !important",
    color: "black",
    [theme.breakpoints.up("sm")]: {
      width: "14px !important",
      height: "14px !important",
      display: "block",
      color: "black",
      marginRight: "8px",
      marginTop: "2px"
    }
  }
});
