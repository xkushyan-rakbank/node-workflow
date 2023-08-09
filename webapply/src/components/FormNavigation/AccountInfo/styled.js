import { makeStyles } from "@material-ui/core/styles";

const buttonMobile = {
  marginTop: "initial",
  marginRight: "auto",
  marginBottom: "30px"
};

export const useStyles = makeStyles(theme => ({
  contentContainer: {
    margin: 0,
    width: "100%",
    maxWidth: 340,
    [theme.breakpoints.up("xl")]: {
      maxWidth: "auto",
      width: "auto",
      paddingRight: "25px"
    },
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100% - 64px)"
    }
  },
  sectionTitle: {
    maxWidth: 340,
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 500,
    marginBottom: 20,
    "& + button": {
      marginTop: 60,
      [theme.breakpoints.only("xs")]: buttonMobile
    },
    [theme.breakpoints.only("sm")]: {
      display: ({ isHideTitleOnSmBreakpoint }) => (isHideTitleOnSmBreakpoint ? "none" : "block")
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 38
    },
    [theme.breakpoints.only("xs")]: {
      width: 328,
      marginTop: "auto",
      marginBottom: props => (props.isShowApply ? 10 : "auto"),
      fontSize: 32,
      lineHeight: "36px"
    }
  },
  sectionTitleMain: {
    paddingLeft: "40px",
    fontSize: "48px"
  },
  sectionTitleImg: {
    width: "340px",
    [theme.breakpoints.only("xs")]: {
      width: "328px"
    },
    [theme.breakpoints.only("sm")]: {
      width: "340px"
    }
    //paddingLeft: "10"
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    maxWidth: 300,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    whiteSpace: "pre-wrap",
    "& + button": {
      marginTop: 60,
      [theme.breakpoints.only("xs")]: buttonMobile
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: "auto"
    }
  },
  sectionLandingSubtitle: {
    fontSize: "24px",
    lineHeight: "1.5",
    color: "#fff",
    maxWidth: 300,
    display: "block",
    fontWeight: 600,
    paddingLeft: "40px",
    fontFamily: "Open Sans",
    whiteSpace: "pre-wrap",
    "& + button": {
      marginTop: 60,
      [theme.breakpoints.only("xs")]: buttonMobile
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: "auto",
      fontSize: "24px"
    }
  },
  sectionButton: {
    marginTop: 60,
    [theme.breakpoints.only("xs")]: buttonMobile
  }
}));
