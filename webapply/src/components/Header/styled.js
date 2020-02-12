import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  header: {
    position: "absolute",
    top: "30px",
    left: "40px",
    display: "flex",
    zIndex: 12,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "270px"
    },
    "& img": {
      minWidth: "140px",
      width: "140px"
    },
    "& a": {
      display: "flex"
    },
    [theme.breakpoints.only("xs")]: {
      position: "absolute",
      margin: 0,
      padding: 0,
      top: "20px",
      left: "16px",
      "& img": {
        minWidth: "114px",
        width: "114px"
      }
    }
  },
  accountType: {
    position: "relative",
    fontFamily: "Open Sans",
    fontSize: "12px",
    marginLeft: "10px",
    paddingLeft: "10px",
    paddingTop: "4px",
    color: "#fff",
    fontWeight: "600",
    "&::before": {
      content: "''",
      display: "block",
      width: "2px",
      height: "20px",
      backgroundColor: "#fff",
      position: "absolute",
      left: "0",
      top: "3px"
    }
  },
  disabled: {
    pointerEvents: "none"
  }
}));
