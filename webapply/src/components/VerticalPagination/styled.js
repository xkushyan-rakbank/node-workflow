import { makeStyles } from "@material-ui/core";
import { normalScrollHeight } from "../../constants";
export const transitionDuration = 400;

export const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      [`${theme.breakpoints.up("md")} and (min-height: ${normalScrollHeight + 1}px)`]: {
        overflow: "hidden"
      }
    }
  },
  paginationWrapper: {
    [`${theme.breakpoints.up("md")} and (min-height: ${normalScrollHeight + 1}px)`]: {
      position: "relative",
      height: "100vh",
      overflowY: "hidden"
    }
  },
  paginationContent: {
    [`${theme.breakpoints.up("md")} and (min-height: ${normalScrollHeight + 1}px)`]: {
      position: "absolute",
      left: 0,
      width: "100%",
      transform: ({ currentSectionIndex }) => `translateY(-${100 * currentSectionIndex}vh)`,
      transition: `transform ${transitionDuration}ms`
    }
  },
  childWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    paddingLeft: 26,
    paddingRight: 26,
    "&:last-of-type": {
      marginBottom: 0
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "100vh"
    },
    [theme.breakpoints.between("xl", "lg")]: {
      padding: "18vh 20px"
    },
    [theme.breakpoints.only("sm")]: {
      height: "auto",
      paddingLeft: 16,
      paddingRight: 16
    },
    [`${theme.breakpoints.only("sm")}, (max-height: ${normalScrollHeight}px)`]: {
      marginBottom: 40
    }
  },
  childWrapperWithHeader: {
    paddingTop: "35px",
    [theme.breakpoints.only("sm")]: {
      justifyContent: "flex-start"
    }
  },
  paginationDots: {
    position: "absolute",
    top: "50vh",
    right: "30px",
    width: "10px",
    zIndex: 2,
    transform: "translateY(-50%)",
    [theme.breakpoints.only("md")]: {
      right: "15px"
    },
    [`${theme.breakpoints.only("sm")}, (max-height: ${normalScrollHeight}px)`]: {
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
  }
}));
