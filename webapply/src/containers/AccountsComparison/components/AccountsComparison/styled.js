import { makeStyles } from "@material-ui/core/styles/index";
import {
  contentWidth,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthXL
} from "../../../../constants/styles";
import { STANDART } from "../../../../utils/useBlobColor/constants";

const blobImages = {
  [`${STANDART}S`]: require("../../../../assets/images/bg-blobs/red-mobile-small-blob.svg"),
  [`${STANDART}M`]: require("../../../../assets/images/bg-blobs/red-mobile-small-blob.svg")
};

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
  landingPageHeader: {
    marginBottom: "40px",
    "& h3": {
      fontSize: "1.25rem",
      fontWeight: 500,
      marginBottom: "8px",
      paddingTop: "150px",
      color: "#1F1F1F",
    },
    "& p": {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#757575",
      lineHeight: "24px"
    },

    [theme.breakpoints.up("sm")]: {
      "& h3": {
        fontSize: "1.75rem",
        fontWeight: 500,
        margin: 0,
        marginBottom: "8px",
        color: "#1F1F1F",
        paddingTop: "80px",
      },
      "& p": {
        fontSize: "1.25rem",
        fontWeight: 400,
        margin: 0,
        color: "#757575",
        lineHeight: "28px"
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
    height: "100vh",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
    top: 0,
    right: 0,
  },
  accountInfoLandingPageHeader: {
    "&.small-menu-show": {
      display: "none",
    }
  },

  videoBg: {
    position: "absolute",
    // height: "100vh",
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
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    display: "block",
    zIndex: 2,
    height: "260px",
    backgroundImage: ({ color }) => `url(${blobImages[`${color}S`]})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    "@media (max-width: 375px) and (height: 548px)": {
      height: "260px!important",
    },
    [theme.breakpoints.only("xs")]: {
      height: "340px"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  blob: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    height: "100%",
    width: "350px",
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
    top: "76px",
    zIndex: 1111,
    overflow: "hidden",
    background: "#fff",

    [theme.breakpoints.only("xs")]: {
      "& .MuiInputBase": {
        display: "flex",
        gap: "20px",
      },

      "& .MuiGrid-item": {
        width: "50%",
        marginBottom: "16px",
      },
    },
    [theme.breakpoints.up("sm")]: {
      top: "75px"
    }
  },
  featureSectionMobile: {
    marginTop: "16px",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  featureSection: {
    // marginTop: "40px",

    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  featureSectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "28px",
    color: "#8D0C10",
    margin: 0,
    marginBottom: "9px",

    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: "32px",
      color: "#8D0C10",
      padding: "18px 0px 18px 24px",
      margin: 0,
    },
  },
  featureListWrapper: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
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
      "& div:nth-child(1)": {
        background: "#F7F8F9",
        minHeight: "120px",
        padding: "17px 20px"
      },
      "& div:nth-child(2)": {
        background: "rgba(252, 232, 233, 0.20)",
        padding: "17px 20px",
        minHeight: "120px"
      },
      "& div:nth-child(3)": {
        background: "#FCE8E9", 
        padding: "17px 20px",
        minHeight: "120px"
      },
      "& div": {
        flexGrow: 1,
        flexBasis: "auto",
        textAlign: "center",
        fontSize: "12px",
        padding: "0px 24px",
        whiteSpace: "pre-line",
        "& img": {
          width: "20px",
          height: "20px",
          [theme.breakpoints.up("lg")]: {
            "& img": {
              width: "24px",
              height: "24px"
            }
          }
        },
      },
    }
  },
  featureList: {
    color: "#1F1F1F",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: "24px",
    padding: "22px 20px",
    background: "rgba(245, 245, 245, 0.50)",
    textAlign: "center",
    whiteSpace: "pre-wrap",
    "&:first-child": {
      textAlign: "left",
      whiteSpace: "break-spaces"
    },
    "&:nth-child(2)": {
      background: "rgba(253, 231, 232, 0.20)"
    },
    "&:nth-child(3)": {
      background: "rgba(253, 231, 232, 0.60)"
    },
    "&:last-child": {
      background: "#FDE7E8"
    },
    "& img": {
      width: "20px",
      height: "20px"
    },
    [theme.breakpoints.only("md")]: {
      padding: "20px 15px",
    },
    [theme.breakpoints.up("md")]: {
      "& img": {
        width: "24px",
        height: "24px"
      }
    }
  },
  infoText: {
    marginTop: "24px",
    whiteSpace: "pre-wrap",
  },
  featureInfo: {
    color: "#847F7F",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "16px",
    margin: 0,
    marginTop: "40px",
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
    top: "10%",
    "& h2": {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
        fontSize: "2.5rem",
        fontWeight: 500,
        lineHeight: "48px",
        color: "#FFFFFF",
        margin: 0,
        paddingLeft: "40px"
      }
    },
    "& img": {
      display: "none",
      [theme.breakpoints.between("sm", "md")]: {
        display: "block",
        width: "250px",
        height: "60px",
        paddingLeft: "10px"
      },
      [theme.breakpoints.up("md")]: {
        display: "block",
        width: "333px",
        height: "75px",
        flexShrink: 0,
        paddingLeft: "10px"
      }
    },
    "& p": {
      fontSize: "1.5rem",
      fontStyle: "normal",
      fontWeight: 500,
      color: "#FFFFFF",
      paddingLeft: "31px",
      lineHeight: "32px",
      paddingRight: "35px",
      margin: 0,
      marginTop: "16px",
      [theme.breakpoints.between("sm", "md")]: {
        marginTop: "58px",
        fontSize: "1.75rem",
        lineHeight: "28px",
        whiteSpace: "pre-line"
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "58px",
        fontSize: "2rem",
        fontWeight: 500,
        lineHeight: "40px",
        alignText: "center",
        paddingLeft: "40px",
        whiteSpace: "pre-line"
      }
    },
    [theme.breakpoints.up("sm")]: {
      top: "45%",
      transform: "translateY(-50%)"
    },
  },
  welcomeText: {
    textAlign: "center"
  },
  accountInfoNav: {
    position: "fixed",
    top: 16,
    width: "100%",
    zIndex: 137,
    [theme.breakpoints.up("sm")]: {
      top: 40
    }
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
    fontWeight: 500,
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
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("xs")]: {
      left: "50%!important",
      transform: "translateX(-50%)",
      width: "80%",
      textAlign: "center",

      alignItems: "center",
      justifyContent: "center"
    },
    "& h2": {
      fontSize: "1.75rem",
      lineHeight: "36px",
      color: "#FFFFFF",
      width: "100%",
      fontWeight: 700,
      margin: 0,
      //ipad devices pro devices
      [theme.breakpoints.between("sm", "lg")]: {
        left: "65%",
        // width: "708px",
        letterSpacing: " -5.5px",
        fontSize: "4rem",
        lineHeight: "80px",
      },
      [theme.breakpoints.up("lg")]: {
        left: "65%",
        // width: "708px",
        letterSpacing: " -5.5px",
        fontSize: "6.8rem",
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
    },

    [theme.breakpoints.up("md")]: {
      height: "unset",
      top: "55% !important",
      left: "65% !important",
      transform: "translate(-55%,-65%)",
      width: "50%",
    },
  },
  btnWrapper: {
    display: "flex",
    marginTop: "20px",
    flexWrap: "wrap",
    flexDirection: "column",
    gap: "16px",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "28px",
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "50px",
      flexDirection: "row"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "80px",
      gap: "30px",
      flexDirection: "row"
    }
  },
  accountBtn: {
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
      height: "203px",
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
    marginTop: "40px",
    "@media (max-width: 375px) and (height: 548px)": {
      marginTop: "16px!important",
    },
    [theme.breakpoints.only("xs")]: {
      paddingTop: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    }
  },
  navButton: {
    // width: "144px",
    height: "40px",
    borderRadius: "21px",
    border: "1px solid #FFF",
    fontSize: "0.75rem",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1rem",
    color: "#fff",
    textTransform: "none"
  },
  termsAndConditionWrapper: {
    margin: 0,
    marginBottom: "10px",
    marginTop: "6px"
  },
  featureDataInfo: {
    margin: "40px 0 16px",
    "& p": {
      color: "#3B3A3A",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "24px",
      margin: 0
    },
    "& ul": {
      marginBottom: 0,
      paddingLeft: "15px"
    },
    "& li": {
      color: "#3B3A3A",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "20px"
    }
  }
}));
