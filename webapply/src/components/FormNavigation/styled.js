import { makeStyles } from "@material-ui/core/styles";

import { sideNavWidthLG, sideNavWidthXL } from "../../constants/styles";

const blobImages = {
  red: require("../../assets/images/bg-blobs/bg-blob-red.svg"),
  redS: require("../../assets/images/bg-blobs/bg-blob-s-red.svg"),
  redM: require("../../assets/images/bg-blobs/bg-blob-m-red.svg"),
  brown: require("../../assets/images/bg-blobs/bg-blob-brown.svg"),
  brownS: require("../../assets/images/bg-blobs/bg-blob-s-brown.svg"),
  brownM: require("../../assets/images/bg-blobs/bg-blob-m-brown.svg"),
  green: require("../../assets/images/bg-blobs/bg-blob-green.svg"),
  greenS: require("../../assets/images/bg-blobs/bg-blob-s-green.svg"),
  greenM: require("../../assets/images/bg-blobs/bg-blob-m-green.svg")
};

export const useStyles = makeStyles(theme => ({
  formNav: ({ isSmallBg, isOpen, hasVideo }) => ({
    position: "relative",
    zIndex: "11",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingTop: 70,
    paddingLeft: 16,
    paddingRight: 16,
    transition: "all .3s",
    height: isOpen ? "calc(100vh - 50px)" : isSmallBg ? 190 : 290,
    marginBottom: isOpen && hasVideo ? "calc(-100vh + 220px)" : 0,
    [theme.breakpoints.up("md")]: {
      paddingTop: "18vh",
      height: "100vh",
      boxSizing: "border-box",
      position: "fixed",
      top: 0,
      width: sideNavWidthLG
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG
    },
    [theme.breakpoints.up("xl")]: {
      width: sideNavWidthXL
    },
    "& ul": {
      margin: "0",
      padding: "5px 0 0 25px",
      marginLeft: "20px",
      height: "271px",
      overflowY: "auto",
      direction: "rtl",
      [theme.breakpoints.up("xl")]: {
        marginLeft: "40px"
      },
      "&::-webkit-scrollbar": {
        width: "2px",
        height: "5px"
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 1px rgba(255,255,255, 0.4)",
        backgroundColor: "rgba(255,255,255, 0.4)"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#fff",
        outline: "1px solid red"
      },
      "& li": {
        direction: "ltr"
      }
    }
  }),
  formNavBg: {
    [theme.breakpoints.only("sm")]: {
      backgroundImage: ({ color, isSmallBg }) =>
        `url(${blobImages[color + (isSmallBg ? "S" : "M")]})`,
      backgroundSize: "cover",
      backgroundPosition: "center bottom"
    },
    [theme.breakpoints.up("md")]: {
      backgroundImage: ({ color }) => `url(${blobImages[color]})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right center"
    }
  },
  contentContainer: {
    margin: 0,
    width: "100%",
    maxWidth: 340,
    [theme.breakpoints.up("lg")]: {
      marginLeft: 40
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: 80,
      width: "auto",
      paddingRight: "25px"
    }
  },
  sectionTitle: {
    maxWidth: 340,
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 600,
    fontFamily: "Open Sans",
    marginBottom: "20px",
    [theme.breakpoints.only("sm")]: {
      fontSize: 32,
      lineHeight: "36px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    marginBottom: 60,
    maxWidth: 289,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    whiteSpace: "pre-wrap",
    [theme.breakpoints.only("sm")]: {
      marginBottom: 30
    }
  }
}));
