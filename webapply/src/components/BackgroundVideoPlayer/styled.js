import { makeStyles } from "@material-ui/core";
import { normalScrollHeight } from "../../constants";
import { sideNavWidthLG, sideNavWidthSM } from "../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "transform 400ms",
    overflow: "hidden",
    maxHeight: "100vh",
    zIndex: 10,
    [`${theme.breakpoints.up("sm")} and (min-height: ${normalScrollHeight + 1}px)`]: {
      transform: ({ currentSectionIndex }) => `translateY(-${100 * currentSectionIndex}vh)`
    },
    [theme.breakpoints.only("xs")]: {
      top: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 64 : 0)
    }
  },
  video: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: 0,
    minWidth: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      paddingTop: "130px",
      height: "min-content",
      minWidth: "none"
    }
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    zIndex: 15,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      left: sideNavWidthSM
    },
    [theme.breakpoints.up("lg")]: {
      left: sideNavWidthLG
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
    height: "auto",
    [theme.breakpoints.only("xs")]: {
      minHeight: "48px"
    }
  },
  expandMoreIc: {
    width: "22px",
    marginLeft: 18,
    pointerEvents: "none"
  }
}));
