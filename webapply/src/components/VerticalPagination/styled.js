import { makeStyles } from "@material-ui/core";
import { normalScrollHeight } from "../../constants";
export const transitionDuration = 400;

export const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      [`${theme.breakpoints.up("sm")} and (min-height: ${normalScrollHeight + 1}px)`]: {
        overflow: "hidden"
      },
      scrollBehavior: "smooth"
    }
  },
  paginationWrapper: {
    position: "relative"
  },
  childWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    minHeight: 1,
    padding: "15px 0",
    "&:last-of-type": {
      marginBottom: 0
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: "100vh"
    },
    [theme.breakpoints.between("xl", "lg")]: {
      padding: "18vh 20px"
    },
    [theme.breakpoints.only("xs")]: {
      height: "auto"
    },
    [`${theme.breakpoints.only("xs")}, (max-height: ${normalScrollHeight}px)`]: {
      marginBottom: 40
    }
  },
  childWrapperWithHeader: {
    paddingTop: "35px",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "flex-start"
    }
  },
  paginationDots: {
    position: "fixed",
    top: "50vh",
    right: "30px",
    width: "10px",
    zIndex: 2,
    transform: "translateY(-50%)",
    [theme.breakpoints.only("sm")]: {
      right: 15
    },
    [`${theme.breakpoints.only("xs")}, (max-height: ${normalScrollHeight}px)`]: {
      display: "none"
    }
  },
  paginationDot: {
    width: "10px",
    height: "10px",
    "& + &": {
      marginTop: "15px"
    },
    "&:focus": {
      outline: "none"
    },
    border: 0,
    padding: 0,
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0, .2)",
    cursor: "pointer"
  },
  current: {
    backgroundColor: "#020f21",
    cursor: "auto"
  },
  videoWrapper: {
    height: "100vh",
    [theme.breakpoints.only("xs")]: {
      height: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 444 : 380),
      marginBottom: 40
    }
  }
}));
