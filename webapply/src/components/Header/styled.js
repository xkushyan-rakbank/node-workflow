import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  header: {
    position: "absolute",
    top: "30px",
    left: "40px",
    display: "block",
    width: "140px",
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
      width: "140px",
      "& img": {
        minWidth: "114px",
        width: "114px"
      }
    }
  },
  logo: {
    height: 44,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      height: 60
    }
  },
  disabled: {
    pointerEvents: "none"
  }
}));
