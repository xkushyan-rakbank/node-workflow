import { makeStyles } from "@material-ui/core/styles/index";
import {
  contentWidth,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthXL,
} from "../../../../constants/styles";
import { STANDART } from "../../../../utils/useBlobColor/constants";

const blobImages = {
  [`${STANDART}S`]: require("../../../../assets/images/bg-blobs/red-mobile-small-blob.svg"),
  [`${STANDART}M`]: require("../../../../assets/images/bg-blobs/red-mobile-small-blob.svg"),
};

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  externalLink: {
    color: "#888888",
    textDecoration: "underline",
  },
  landingPageHeader: {
    marginBottom: "40px",
    "& h3": {
      fontSize: "1.25rem",
      fontWeight: 501,
      paddingBottom: "8px",
      paddingTop: "150px",
      color: "#1F1F1F",
    },
    "& p": {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#757575",
    },

    [theme.breakpoints.up("sm")]: {
      "& h3": {
        fontSize: "1.75rem",
        fontWeight: 500,
        // margin: 0,
        paddingBottom: "4px",
        color: "#1F1F1F",
      },
      "& p": {
        fontSize: "1.25rem",
        fontWeight: 400,
        // margin: 0,
        color: "#757575",
      },
    },
  },
  // video: {
  //  [theme.breakpoints.up("sm")]: {
  //   bottom: 0,
  //   top: "0"
  //  }
  // },
  mainWrapper: {
    // marginTop: "100px",
    marginBottom: "50px",
  },
  bgContainer: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
    top: 0,
    right: 0,
  },
  accountInfoLandingPageHeader: {
    "&.small-menu-show": {
      display: "none",
    },
  },

  videoBg: {
    position: "absolute",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    right: "0",
    top: "20%",

    [theme.breakpoints.up("sm")]: {
      left: "6%",
      top: "unset",
    },

    [theme.breakpoints.between("sm", "md")]: {
      right: "0%",
      top: "unset",
      left: "unset",
    },
  },
  video: {
    display: "block",
  },
  blobMobile: {
    [theme.breakpoints.only("xs")]: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "42%",
      zIndex: 2,
      backgroundImage: ({ color }) => `url(${blobImages[`${color}S`]})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      transform: "rotate(360deg)",
    },
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
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG,
    },
    [theme.breakpoints.up("xl")]: {
      width: sideNavWidthXL,
    },
  },
  stickyDiv: {
    position: "sticky",
    top: "88px",
    zIndex: 55,

    [theme.breakpoints.only("xs")]: {
      "& .MuiGrid-container:first-child": {
        display: "none",
        position: "inherit",
      },

      "& .MuiInputBase": {
        display: "flex",
        gap: "20px",
      },

      "& .MuiGrid-item": {
        width: "50%",
        marginBottom: "16px",
      },
    },
  },
  featureSectionMobile: {
    marginTop: "80px",
    [theme.breakpoints.between("sm", "md")]: {
      display: "none",
    },
  },

  featureSection: {
    marginTop: "80px",

    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  featureSectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "28px",
    color: "#1F1F1F",
    padding: "0 19px",
    margin: 0,
    marginBottom: "9px",

    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: "36px",
      color: "#1F1F1F",
      padding: "0 40px",
      margin: 0,
      marginBottom: "18px",
    },
  },
  featureList: {
    display: "flex",
    padding: "24px 0px",
    justifyContent: "space-between",
    alignItems: "center",
    "& div:first-child": {
      textAlign: "left !important",
      paddingLeft: "20px",
      color: "#1F1F1F",
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "16px",
    },
    "& div": {
      flexGrow: 1,
      flexBasis: "auto",
      textAlign: "center",
      fontSize: "12px",
      padding: "0px 24px",
      whiteSpace: "pre-line",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#F7F8F9",
      borderRadius: "10px",
    },
    [theme.breakpoints.only("xs")]: {
      "& div:nth-child(4)": {
        display: "none",
      },
    },

    [theme.breakpoints.up("sm")]: {
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
        lineHeight: "24px",
      },
      "& div": {
        flexGrow: 1,
        flexBasis: "auto",
        textAlign: "center",
        fontSize: "inherit",
        padding: "0px 24px",
        whiteSpace: "pre-line",
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#F7F8F9",
        borderRadius: "10px",
      },
    },
  },
  infoText: {
    marginTop: "24px",
    whiteSpace: "pre-line",
  },
  featureInfo: {
    color: "#847F7F",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "16px",
    margin: 0,
    marginTop: "24px",
    "& p": {
      margin: 0,
    },
    "& a": {
      color: "#8D0C10",
      textDecoration: "underline",
    },
  },
  accountsInfoBannerContentWrapper: {
    position: "absolute",
    zIndex: 111,
    top: "10%",

    [theme.breakpoints.only("xs")]: {
      "& h2": {
        display: "none",
      },
      "& img": {
        display: "none",
      },
      "& p": {
        fontSize: "1.5rem",
        fontStyle: "normal",
        fontWeight: 600,
        color: "#FFFFFF",
        paddingLeft: "31px",
        lineHeight: "32px",
        paddingRight: "35px",
      },
    },
    [theme.breakpoints.up("sm")]: {
      top: "45%",
      transform: "translateY(-50%)",
      "& h2": {
        fontSize: "2.5rem",
        fontWeight: 500,
        lineHeight: "48px",
        color: "#FFFFFF",
        margin: 0,
        paddingLeft: "40px",
      },
      "& img": {
        width: "333px",
        height: "75px",
        flexShrink: 0,
        paddingLeft: "10px",
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
        paddingLeft: "40px",
      },
    },
  },
  welcomeText: {
    textAlign: "center",
  },
  accountInfoNav: {
    position: "fixed",
    top: 40,
    width: "100%",
    zIndex: 2,
  },
  accountInfoNavLinks: {
    display: "flex",
    justifyContent: "space-between",

    [theme.breakpoints.only("xs")]: {
      paddingLeft: "31px",
      "& div:nth-child(2)": {
        display: "none",
      },
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "60px",
      paddingRight: "80px",
    },
  },
  trackNSwitchAccountBtnWrapper: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: "12px",
  },
  trackNSwitchAccountBtn: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "22px",
    borderRadius: "21px",
    textTransform: "none",
  },
  black: {
    color: "#1F1F1F",
    border: "1px solid #1F1F1F",
  },
  white: {
    color: "#FFFFFF",
    border: "1px solid #FFF",
  },
  accountInfoMain: {
    position: "absolute",
    zIndex: 111,
    top: "70%",
    left: "70%",
    transform: "translate(-70%,-75%)",

    "& h2": {
      fontSize: "1.75rem",
      lineHeight: "36px",
      color: "#FFFFFF",
      width: "350px",
      fontWeight: 700,

      // desktop
      [theme.breakpoints.up("sm")]: {
        left: "65%",
        width: "708px",
        margin: 0,
        letterSpacing: " -5.5px",
        fontSize: "6.8rem",
        lineHeight: "100px",
      },

      //ipad devices pro devices
      [theme.breakpoints.between("sm", "md")]: {
        left: "65%",
        width: "708px",
        margin: 0,
        letterSpacing: " -5.5px",
        fontSize: "4.8rem",
        lineHeight: "100px",
      },
    },

    "& p": {
      margin: 0, // maybe required
      marginTop: "16px",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "24px",
      color: "#FFFFFF",

      [theme.breakpoints.up("sm")]: {
        margin: 0,
        marginTop: "24px",
        fontSize: "2rem",
        fontWeight: 500,
        lineHeight: "40px",
        color: "#FFFFFF",
      },

      [theme.breakpoints.between("sm", "md")]: {},
    },

    [theme.breakpoints.down("sm")]: {
      top: "80%",
      left: "70%",
      transform: "translate(-70%,-75%)",
    },

    [theme.breakpoints.between("sm", "md")]: {
      top: "36%",
      left: "66%",
      transform: "translate(-39%,-40%)",
    },
    [theme.breakpoints.up("md")]: {
      top: "55%",
      left: "65%",
      transform: "translate(-55%,-65%)",
    },
  },
  btnWrapper: {
    display: "flex",
    marginTop: "80px",
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "50px",
    },
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "28px",
    },
  },
  accountBtn: {
    marginRight: 30,
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "32px",
    padding: "20px 40px !important",
    "&:hover": {
      backgroundColor: "#333333",
      color: "#fff",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "20px 40px",
      borderRadius: "100px",
      background: "#fff",
    },
  },
  accountInfoNavScrolled: {
    backgroundColor: "#FFFFFF",
    position: "fixed",
    top: 0,
    paddingTop: "20px",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",

    [theme.breakpoints.up("sm")]: {
      height: "200px",
      backgroundColor: "#FFFFFF",
      position: "fixed",
      top: 0,
      paddingTop: "24px",
      boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    },
  },
  logo: {
    [theme.breakpoints.only("xs")]: {
      width: "110px",
      height: "50px",
    },
  },
  navOutline: {
    display: "flex",
    gap: "12px",
    paddingTop: "11px",
    paddingLeft: "26px",
    [theme.breakpoints.only("xs")]: {
      paddingTop: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navButton: {
    width: "144px",
    height: "40px",
    borderRadius: "21px",
    border: "1px solid #FFF",
    fontSize: "0.75rem",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1rem",
    color: "#fff",
    textTransform: "none",
  },
}));
