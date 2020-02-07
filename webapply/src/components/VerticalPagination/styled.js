import { makeStyles } from "@material-ui/core";
import { mobileResolution, normalScrollHeight, tabletResolution } from "../../constants";
export const transitionDuration = 400;

export const useStyles = makeStyles({
  "@global": {
    body: {
      "@media (min-width: 956px) and (min-height: 741px)": {
        overflow: "hidden"
      }
    }
  },
  paginationWrapper: {
    [`@media only screen and (min-width: ${mobileResolution + 1}px) 
    and (min-height: ${normalScrollHeight + 1}px)`]: {
      position: "relative",
      height: "100vh",
      overflowY: "hidden"
    }
  },
  paginationContent: ({ currentSectionIndex }) => ({
    position: "absolute",
    left: 0,
    width: "100%",
    transform: `translateY(-${100 * currentSectionIndex}vh)`,
    transition: `transform ${transitionDuration}ms`,
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
      position: "static",
      top: "0!important",
      paddingBottom: 15
    }
  }),
  childWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "relative",
    boxSizing: "border-box",
    padding: "0 26px",
    [`@media only screen and
     (max-width: ${tabletResolution}px)
      and (min-width: ${mobileResolution}px)`]: {
      padding: "18vh 20px"
    },
    "@media only screen and (max-height: 900px)": {
      justifyContent: "center",
      paddingTop: "0px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
      height: "auto",
      padding: "40px 16px 0"
    }
  },
  childWrapperWithHeader: {
    paddingTop: "35px",
    "@media only screen and (max-height: 900px)": {
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
    "@media only screen and (max-width: 1360px)": {
      right: "15px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
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
});
