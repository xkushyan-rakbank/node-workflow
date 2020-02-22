import { makeStyles } from "@material-ui/core/styles";

import { sideNavWidthSM, sideNavWidthLG } from "../../constants/styles";
import { ELITE, ISLAMIC, STANDART } from "../../utils/useBlobColor/constants";

const blobImages = {
  [STANDART]: require("../../assets/images/bg-blobs/bg-blob-red.svg"),
  [`${STANDART}S`]: require("../../assets/images/bg-blobs/bg-blob-s-red.svg"),
  [`${STANDART}M`]: require("../../assets/images/bg-blobs/bg-blob-m-red.svg"),
  [ELITE]: require("../../assets/images/bg-blobs/elite-web-blob.svg"),
  [`${ELITE}S`]: require("../../assets/images/bg-blobs/elite-mobile-blob_small.svg"),
  [`${ELITE}M`]: require("../../assets/images/bg-blobs/elite-mobile-blob_medium.svg"),
  [ISLAMIC]: require("../../assets/images/bg-blobs/bg-blob-green.svg"),
  [`${ISLAMIC}S`]: require("../../assets/images/bg-blobs/bg-blob-s-green.svg"),
  [`${ISLAMIC}M`]: require("../../assets/images/bg-blobs/bg-blob-m-green.svg")
};

export const useStyles = makeStyles(theme => ({
  formNav: ({ isSmallBg, isOpen, hasVideo }) => ({
    position: "relative",
    zIndex: "11",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingTop: 100,
    paddingLeft: 16,
    paddingRight: 16,
    transition: "all .3s",
    height: (() => {
      if (isOpen) return "calc(100vh - 50px)";
      if (isSmallBg) return 190;
      return 290;
    })(),
    marginBottom: isOpen && hasVideo ? "calc(-100vh + 220px)" : 0,
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      paddingTop: "18vh",
      paddingLeft: 42,
      paddingRight: 0,
      boxSizing: "border-box",
      position: "fixed",
      top: 0,
      width: sideNavWidthSM
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG,
      paddingLeft: 80
    },
    "& ul": {
      margin: "0",
      padding: "5px 0 0 25px",
      marginLeft: "20px",
      height: "271px",
      overflowY: "auto",
      direction: "rtl",
      [theme.breakpoints.up("sm")]: {
        marginLeft: 0,
        paddingLeft: 15
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
    [theme.breakpoints.only("xs")]: {
      backgroundImage: ({ color, isSmallBg }) =>
        `url(${blobImages[`${color}${isSmallBg ? "S" : "M"}`]})`,
      backgroundSize: "cover",
      backgroundPosition: "center bottom"
    },
    [theme.breakpoints.up("sm")]: {
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
    [theme.breakpoints.up("xl")]: {
      maxWidth: "auto",
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
    marginBottom: 20,
    whiteSpace: "pre-line",
    [theme.breakpoints.only("xs")]: {
      marginBottom: 10,
      fontSize: 32,
      lineHeight: "36px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    marginBottom: 60,
    maxWidth: 300,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    whiteSpace: "pre-wrap",
    [theme.breakpoints.only("xs")]: {
      marginBottom: 57
    }
  }
}));
