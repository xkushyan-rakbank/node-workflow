import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.9",
    color: "#373737"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    marginTop: "30px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0 0"
  },
  relative: {
    position: "relative"
  },
  tablet: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: "20px"
    }
  },
  container: {
    top: "15px",
    right: "-100px",
    [theme.breakpoints.only("xs")]: {
      top: "70px",
      right: "12px"
    }
  },
  marginBottom: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: "45px"
    }
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "40px 0"
  },
  dnfbpStyle: {
    fontWeight: "normal",
    marginBottom: "0px",
    marginTop: "0px"
  },
  dnfbpTitleWrapper: {
    margin: "15px 0",
    display: "flex",
    alignItems: "center"
  },
  dnfbpHelp: {
    marginLeft: "5px",
    fontSize: "12px",
    textDecoration: "underline",
    textTransform: "none"
  },
  iconSize: {
    width: "24px",
    height: "24px"
  }
}));
