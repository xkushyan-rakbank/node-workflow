import { makeStyles } from "@material-ui/core/styles";

import { routerToAddPaddingInSlider, sideNavWidthLG, sideNavWidthXL } from "../../constants/styles";

export const useStyles = makeStyles(theme => ({
  formLayout: {
    position: "relative",
    display: "flex",
    height: "100%",
    [theme.breakpoints.only("sm")]: {
      flexWrap: "wrap"
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
        backgroundColor: ({ color }) =>
          color === "brown" ? "#b36446" : color === "green" ? "#407b35" : "#eb2f16"
      }
    }
  },
  formWrapper: {
    flexBasis: "0%",
    flex: "1 1 auto",
    minHeight: "0px",
    minWidth: "1px",
    "& h2": {
      fontSize: "46px",
      fontWeight: "600",
      marginBottom: "20px",
      marginTop: "0",
      color: "#373737",
      [theme.breakpoints.only("sm")]: {
        fontSize: "27px"
      }
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: sideNavWidthLG
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: sideNavWidthXL
    }
  },
  formInner: {
    display: "flex",
    height: "100%",
    padding: "0 15px",
    "& nextButton": {
      margin: "42px 0 0 !important"
    },
    [theme.breakpoints.up("md")]: {
      overflowY: "auto"
    }
  },
  mainContainer: {
    width: "832px",
    minWidth: "40vw",
    maxWidth: "100%",
    margin: "0 auto",
    padding: ({ pathname }) => (routerToAddPaddingInSlider.includes(pathname) ? "0" : "35px 0 0"),
    paddingTop: "35px",
    [theme.breakpoints.up("xl")]: {
      minWidth: "auto"
    }
  },
  mainContainerFullHeight: {
    padding: "0 50px 0"
  }
}));
