import { makeStyles } from "@material-ui/core/styles/index";
import {
  contentWidth,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthXL
} from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  externalLink: {
    color: "#888888",
    textDecoration: "underline"
  },
  withPadding: {
    paddingTop: "100px"
  },
  landingPageHeader: {
    marginBottom: "40px",
    "& h3": {
      fontSize: "1.75rem",
      fontWeight: 500,
      margin: 0,
      marginBottom: "4px",
      color: "#1F1F1F"
    },
    "& p": {
      fontSize: "1.25rem",
      fontWeight: 400,
      margin: 0,
      color: "#757575"
    }
  },
  // video: {
  //  [theme.breakpoints.up("sm")]: {
  //   bottom: 0,
  //   top: "0"
  //  }
  // },
  mainWrapper: {
    // marginTop: "100px",
    marginBottom: "50px"
  },
  bgContainer: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
    top: 0,
    right: 0
  },
  accountInfoLandingPageHeader: {
    "&.small-menu-show": {
      display: "none"
    }
  },
  videoBg: {
    position: "absolute",
    height: "100vh",
    left: "0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.between("md", "lg")]: {
      left: "5%",
      height: "unset"
    },
    [theme.breakpoints.up("lg")]: {
      left: "7%"
    }
  },
  video: {
    display: "block"
  },
  blob: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    height: "100%",
    width: sideNavWidthMD,
    pointerEvents: "none",
    [theme.breakpoints.only("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG
    },
    [theme.breakpoints.up("xl")]: {
      width: sideNavWidthXL
    }
  },
  stickyDiv: {
    position: "sticky",
    top: "88px"
  },
  featureSection: {
    marginTop: "80px"
  },
  featureSectionTitle: {
    fontSize: "1.75rem",
    fontWeight: 500,
    lineHeight: "36px",
    color: "#1F1F1F",
    padding: "0 40px",
    margin: 0,
    marginBottom: "18px"
  },
  featureList: {
    display: "flex",
    padding: "24px 0px",
    justifyContent: "space-between",
    alignItems: "center",
    "& div:first-child": {
      textAlign: "left !important",
      paddingLeft: "24px",
      color: "#1F1F1F",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px"
    },
    "& div": {
      flexGrow: 1,
      flexBasis: "auto",
      textAlign: "center",
      padding: "0px 24px",
      whiteSpace: "pre-line"
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#F7F8F9",
      borderRadius: "10px"
    }
  },
  infoText: {
    marginTop: "24px",
    whiteSpace: "pre-line"
  },
  featureInfo: {
    color: "#847F7F",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "16px",
    margin: 0,
    marginTop: "24px",
    "& p": {
      margin: 0
    },
    "& a": {
      color: "#8D0C10",
      textDecoration: "underline"
    }
  },
  accountsInfoBannerContentWrapper: {
    position: "absolute",
    zIndex: 111,
    top: "45%",
    transform: "translateY(-50%)",
    "& h2": {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: "48px",
      color: "#FFFFFF",
      margin: 0,
      paddingLeft: "40px"
    },
    "& img": {
      width: "333px",
      height: "75px",
      flexShrink: 0,
      paddingLeft: "10px"
    },
    "& p": {
      margin: 0,
      marginTop: "58px",
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "40px",
      color: "#FFFFFF",
      whiteSpace: "pre-line",
      alignText: "center",
      paddingLeft: "40px"
    }
  },
  welcomeText: {
    textAlign: "center"
  },
  accountInfoNav: {
    position: "fixed",
    top: 40,
    width: "100%"
  },
  accountInfoNavLinks: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "60px",
    paddingRight: "80px"
  },
  trackNSwitchAccountBtnWrapper: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: "12px"
  },
  trackNSwitchAccountBtn: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "22px",
    borderRadius: "21px",
    textTransform: "none"
  },
  black: {
    color: "#1F1F1F",
    border: "1px solid #1F1F1F"
  },
  white: {
    color: "#FFFFFF",
    border: "1px solid #FFF"
  },
  accountInfoMain: {
    position: "absolute",
    zIndex: 111,
    top: "55%",
    left: "65%",
    transform: "translate(-55%,-65%)",
    "& h2": {
      fontSize: "0.017rem",
      fontWeight: 700,
      lineHeight: "111px",
      color: "#FFFFFF",
      margin: 0,
      letterSpacing: " -5.5px",
      width: "708px",
      [theme.breakpoints.between("md", "lg")]: {
        fontSize: "6.8rem",
        lineHeight: "100px"
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "6.8rem",
        lineHeight: "111px"
      }
    },
    "& p": {
      margin: 0,
      marginTop: "24px",
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "40px",
      color: "#FFFFFF"
    },
    [theme.breakpoints.down("md")]: {
      top: "70%",
      left: "75%",
      transform: "translate(-70%,-75%)"
    }
  },
  btnWrapper: {
    display: "flex",
    // justifyContent: "center",
    marginTop: "80px",
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "50px"
    }
  },
  accountBtn: {
    marginRight: 30,
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "32px",
    padding: "20px 40px !important",
    "&:hover": {
      backgroundColor: "#333333",
      color: "#fff"
    }
  },
  accountInfoNavScrolled: {
    height: "200px",
    backgroundColor: "#FFFFFF",
    position: "fixed",
    top: 0,
    paddingTop: "24px",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)"
  }
}));
