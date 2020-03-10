import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    top: "30px",
    right: "40px",
    zIndex: 21,
    borderRadius: "6px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 16px",
      left: 0,
      top: ({ isMobileNotificationActive }) =>
        isMobileNotificationActive ? "calc(100vh - 64px)" : "100vh",
      transform: "translateY(-100%)",
      boxShadow: "none",
      width: "100%",
      flexWrap: "wrap",
      display: "flex",
      boxSizing: "border-box"
    }
  },
  grouped: {
    [theme.breakpoints.only("xs")]: {
      "&:not(:last-child)": {
        borderRadius: "8px",
        border: "0px"
      },
      "&:not(:first-child)": {
        borderRadius: "8px",
        border: "0px"
      }
    }
  },
  buttonStyle: {
    minWidth: "133px",
    padding: "2px 15px",
    outline: "none ",
    fontSize: "16px",
    textTransform: "none",
    textAlign: "center",
    backgroundColor: "#000",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.08)",
    "& svg": {
      display: "none"
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      height: 72,
      marginTop: 10,
      padding: "2px 20px",
      "&:hover": {
        backgroundColor: "#000"
      },
      "& svg": {
        display: "inline-block",
        verticalAlign: "inline-block",
        marginRight: 20,
        width: 32,
        height: 32,
        "& path": {
          stroke: "currentColor"
        }
      },
      "& > span": {
        justifyContent: "flex-start",
        lineHeight: "32px"
      }
    }
  },
  active: {
    backgroundColor: "#fff",
    "& $labelStyle": {
      color: "#373737"
    }
  },
  labelStyle: {
    textAlign: "center",
    color: "#ffffff"
  }
}));
