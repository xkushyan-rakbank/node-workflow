import { makeStyles } from "@material-ui/core/styles/index";
import { normalScrollHeight } from "../../../../constants";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
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
      minHeight: "100vh",
      // this is for IE11 height should be less than min-height to work
      height: "1px"
    },
    [theme.breakpoints.between("xl", "lg")]: {
      padding: "18vh 20px"
    },
    [theme.breakpoints.only("xs")]: {
      height: "auto"
    },
    [`${theme.breakpoints.only("xs")}, (max-height: ${normalScrollHeight}px)`]: {
      marginBottom: 40,
      height: "auto"
    }
  },
  paginationWrapper: {
    position: "relative"
  },
  videoWrapper: {
    [theme.breakpoints.only("xs")]: {
      height: ({ isMobileNotificationActive }) => (isMobileNotificationActive ? 444 : 380),
      marginBottom: 40
    }
  },
  video: {
    [theme.breakpoints.up("sm")]: {
      bottom: 0,
      top: "auto"
    }
  }
}));
