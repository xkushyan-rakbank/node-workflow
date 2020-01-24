import { makeStyles } from "@material-ui/core/styles";

import {
  portraitOrientationQueryIPads,
  sideNavWidthLG,
  sideNavWidthMD,
  sideNavWidthSM,
  sideNavWidthXL
} from "../../constants/styles";

import { mobileResolution, normalScrollHeight } from "../../constants";

const blobImages = {
  red: require("../../assets/images/bg-blobs/bg-blob-red.png"),
  redS: require("../../assets/images/bg-blobs/bg-blob-s-red.png"),
  redM: require("../../assets/images/bg-blobs/bg-blob-m-red.png"),
  brown: require("../../assets/images/bg-blobs/bg-blob-brown.png"),
  brownS: require("../../assets/images/bg-blobs/bg-blob-s-brown.png"),
  brownM: require("../../assets/images/bg-blobs/bg-blob-m-brown.png"),
  green: require("../../assets/images/bg-blobs/bg-blob-green.png"),
  greenS: require("../../assets/images/bg-blobs/bg-blob-s-green.png"),
  greenM: require("../../assets/images/bg-blobs/bg-blob-m-green.png")
};

export const useStyles = makeStyles({
  formNav: {
    flex: `0 0 ${(sideNavWidthMD / 1220) * 100}%`,
    minWidth: `${sideNavWidthXL}px`,
    // position: "relative",
    paddingTop: "18vh",
    zIndex: "11",
    [`@media only screen and (min-width: ${mobileResolution + 1}px)`]: {
      height: "100vh",
      boxSizing: "border-box"
    },
    [`@media only screen and (min-width: ${mobileResolution +
      1}px) and (max-height: ${normalScrollHeight}px)`]: {
      position: "sticky",
      top: 0
    },
    [portraitOrientationQueryIPads]: {
      paddingTop: "270px"
    },
    "@media only screen and (max-width: 1420px)": {
      minWidth: `${sideNavWidthLG}px`
    },
    "@media only screen and (max-width: 1300px)": {
      minWidth: `${sideNavWidthMD}px`
    },
    "@media only screen and (max-width: 1220px)": {
      minWidth: `${sideNavWidthSM}px`
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      display: "flex",
      overflow: "hidden",
      flexDirection: "column",
      transition: "all .3s",
      flex: "0 0 100%",
      height: "290px",
      paddingTop: "70px",
      marginBottom: -40,
      "&.small-bg": {
        height: "190px"
      },
      "&.open": {
        height: "calc(100vh - 50px)",
        "&.has-video": {
          marginBottom: "calc(-100vh + 220px)"
        }
      }
    },
    "& ul": {
      margin: "0",
      padding: "5px 0 0 25px",
      marginLeft: "40px",
      height: "271px",
      overflowY: "auto",
      direction: "rtl",
      "@media only screen and (max-width: 1250px)": {
        marginLeft: "20px"
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
  },
  formNavBg: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundImage: `url(${blobImages.red})`,
    "&.brown": {
      backgroundImage: `url(${blobImages.brown})`
    },
    "&.green": {
      backgroundImage: `url(${blobImages.green})`
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      backgroundSize: "cover",
      backgroundPosition: "center bottom",
      backgroundImage: `url(${blobImages.redM})`,
      "&.brown": {
        backgroundImage: `url(${blobImages.brownM})`
      },
      "&.green": {
        backgroundImage: `url(${blobImages.greenM})`
      },
      "&.small-bg": {
        backgroundImage: `url(${blobImages.redS})`,
        "&.brown": {
          backgroundImage: `url(${blobImages.brownS})`
        },
        "&.green": {
          backgroundImage: `url(${blobImages.greenS})`
        }
      }
    }
  },
  contentContainer: {
    width: 340,
    marginLeft: 80,
    "@media only screen and (max-width: 1300px)": {
      marginLeft: 40,
      width: "auto",
      paddingRight: "25px"
    },
    "@media only screen and (max-width: 1220px)": {
      marginLeft: 20
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      margin: 0,
      padding: "0 16px"
    }
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 600,
    fontFamily: "Open Sans",
    marginBottom: "50px",
    "@media only screen and (max-width: 1300px)": {
      paddingRight: "16px",
      fontSize: "40px"
    },
    "@media only screen and (max-width: 1220px)": {
      fontSize: "32px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      margin: "0 0 30px",
      padding: 0,
      maxWidth: "500px"
    },
    "@media only screen and (max-width: 374px)": {
      fontSize: "28px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    marginBottom: 50,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    "@media only screen and (max-width: 1220px)": {
      paddingRight: "25px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      fontSize: "14px",
      margin: "-20px 0 30px"
    }
  }
});
