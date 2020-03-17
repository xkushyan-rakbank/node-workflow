import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  buttonToggler: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 16,
    right: 16,
    border: 0,
    padding: 0,
    zIndex: 10,
    cursor: "pointer",
    transition: "all .3s",
    transform: ({ isSwitcherShow }) => (isSwitcherShow ? "rotate(180deg)" : "rotate(0deg)"),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    "& svg": {
      verticalAlign: "top"
    },
    "& path": {
      fill: "#fff"
    },
    "&:focus": {
      outline: "none"
    }
  },
  switcherWrapper: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: "100px 16px 0",
    border: 0,
    cursor: "pointer",
    transition: "all .3s",
    [theme.breakpoints.only("xs")]: {
      opacity: ({ isSwitcherShow }) => (isSwitcherShow ? 1 : 0),
      pointerEvents: ({ isSwitcherShow }) => (isSwitcherShow ? "auto" : "none")
    }
  },
  children: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  arrowDownIcon: {
    width: "32px",
    height: "32px"
  }
}));
