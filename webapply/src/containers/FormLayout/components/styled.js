import { makeStyles } from "@material-ui/core/styles";

import {
  sideNavWidthSM,
  sideNavWidthMD,
  sideNavWidthLG,
  sideNavWidthCollapsed,
  contentWidthSM,
  contentWidth
} from "../../../constants/styles";
import { ELITE, ISLAMIC, STANDART } from "../../../utils/useBlobColor/constants";

export const useStyles = makeStyles(theme => ({
  formLayout: {
    position: "relative",
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap"
    },
    [theme.breakpoints.up("sm")]: {
      height: "100vh"
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1920px",
      "&:before": {
        content: "''",
        position: "fixed",
        zIndex: 11,
        left: 0,
        top: 0,
        width: "calc((100vw - 1920px) / 2 + 5px)",
        height: "100vh",
        background: ({ color }) => {
          switch (color) {
            case ELITE:
              return "linear-gradient(to bottom, #8E2141, #B55774)";
            case ISLAMIC:
              return "#417C35";
            case STANDART:
              return "linear-gradient(to bottom, #E9320F, #EA1C44)";
            default:
              return "transparent";
          }
        }
      }
    }
  },
  formWrapper: {
    flexBasis: "0%",
    flex: "1 1 auto",
    minHeight: "0px",
    minWidth: "1px",
    transition: theme.transitions.create("all"),
    "& h2": {
      fontSize: "46px",
      fontWeight: "600",
      marginBottom: "20px",
      marginTop: "0",
      color: "#373737",
      [theme.breakpoints.only("xs")]: {
        fontSize: "27px"
      }
    },
    [theme.breakpoints.only("sm")]: {
      paddingLeft: ({ isSmallContentWidth }) =>
        isSmallContentWidth ? sideNavWidthSM : sideNavWidthCollapsed
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: sideNavWidthMD
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: sideNavWidthLG
    }
  },
  formInner: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0 15px",
    "& nextButton": {
      margin: "42px 0 0 !important"
    },
    [theme.breakpoints.only("xs")]: {
      paddingRight: 16,
      paddingLeft: 16
    },
    [theme.breakpoints.up("sm")]: {
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  },
  mainContainer: {
    width: ({ hasVerticalPagination, isSmallContentWidth }) => {
      if (hasVerticalPagination) return "100%";
      if (isSmallContentWidth) return contentWidthSM;
      return contentWidth;
    },
    minWidth: "40vw",
    maxWidth: "100%",
    margin: "40px auto 0px",
    [theme.breakpoints.up("xl")]: {
      minWidth: "auto"
    },
    [theme.breakpoints.up("md")]: {
      margin: "40px auto 0px",
      width: "832px"
    }
  },
  mainContainerFullHeight: {
    padding: "0 50px 0"
  },
  paddingBottomForm: {
    paddingBottom: "150px"
  }
}));
