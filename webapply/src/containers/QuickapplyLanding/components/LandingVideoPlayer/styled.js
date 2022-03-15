import { makeStyles } from "@material-ui/core";
import {
  sideNavWidthCollapsed,
  sideNavWidthLG,
  sideNavWidthMD
} from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "transform 400ms",
    overflow: "hidden",
    minHeight: "100vh",
    zIndex: 10,
    [theme.breakpoints.only("xs")]: {
      top: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 220 : 0),
      height: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 735 : 671),
      maxHeight: "none"
    },
    [theme.breakpoints.between("ls", "sm")]: {
      top: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 100 : 0),
      height: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 735 : 671),
      maxHeight: "none"
    }
  },
  video: {
    position: "absolute",
    zIndex: 10,
    left: "50%",
    transform: "translateX(-50%)",
    top: 0,
    minWidth: "100%",
    minHeight: "100vh",
    //overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      paddingTop: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 130 : 195),
      height: "min-content",
      minWidth: "none"
    }
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  labelStyle: {
    fontSize: 36,
    color: "#fff",
    fontWeight: 600,
    textAlign: "center"
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "15%",
    zIndex: 15,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      left: sideNavWidthCollapsed,
      bottom: "30%"
    },
    [theme.breakpoints.up("md")]: {
      left: sideNavWidthMD,
      bottom: "40%"
    },
    [theme.breakpoints.up("lg")]: {
      left: sideNavWidthLG,
      bottom: "45%"
    }
  },
  scrollButton: {
    minWidth: "195px",
    minHeight: "56px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    boxShadow: "none",
    fontSize: "18px",
    textTransform: "inherit",
    letterSpacing: "normal",
    padding: "12px 30px",
    [theme.breakpoints.only("xs")]: {
      minHeight: "48px",
      minWidth: 160
    }
  },
  expandMoreIc: {
    width: "22px",
    marginLeft: 18,
    pointerEvents: "none"
  },
  loanBtn: {
    backgroundColor: "#252525",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#333333",
      color: "#fff"
    }
  },
  accountBtn: {
    marginRight: 30,
    [theme.breakpoints.only("xs")]: {
      marginRight: 10,
      padding: 12
    }
  }
}));
