import { makeStyles } from "@material-ui/core/styles";

import {
  sideNavWidthMD,
  sideNavWidthLG,
  sideNavWidthCollapsed,
  sideNavWidthSM
} from "../../constants/styles";
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

const blobGradient = {
  [STANDART]: "standart",
  [ELITE]: "elite",
  [ISLAMIC]: "islamic"
};

export const useStyles = makeStyles(theme => ({
  blob: {
    position: "absolute",
    top: "50%",
    width: "calc(380/768*100vh)",
    zIndex: -1,
    right: 0,
    minHeight: "100vh",
    pointerEvents: "none",
    [theme.breakpoints.only("xs")]: {
      display: "none"
    }
  },
  formNav: {
    position: "relative",
    zIndex: 11,
    transition: theme.transitions.default,
    "& $formNavContent": {
      display: "flex",
      flexDirection: "column",
      transition: theme.transitions.default
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: ({ isOpen, accountsComparisonPage }) =>
        isOpen && accountsComparisonPage ? "calc(-100vh + 220px)" : 0,
      width: "100%",
      paddingTop: 100,
      height: ({ isOpen, isSmallBg }) => {
        if (isOpen) return "calc(100vh - 50px)";
        if (isSmallBg) return 190;
        return 290;
      },
      "& $formNavContent": {
        paddingLeft: 16,
        paddingRight: 16
      }
    },
    [theme.breakpoints.up("sm")]: {
      width: sideNavWidthMD,
      height: "100vh",
      position: "fixed",
      top: 0,
      "& > svg:first-child": {
        transition: theme.transitions.default,
        transform: "translate(0, -50%)",
        "& path": {
          transition: theme.transitions.default,
          "&:nth-child(1)": {
            fill: ({ color }) => `url(#${blobGradient[color]}-3)`
          },
          "&:nth-child(2)": {
            fill: ({ color }) => `url(#${blobGradient[color]}-1)`
          },
          "&:nth-child(3)": {
            fill: ({ color }) => `url(#${blobGradient[color]}-2)`
          },
          "&:nth-child(4)": {
            fill: ({ color }) => `url(#${blobGradient[color]}-3)`
          }
        }
      },
      "&:before": {
        transition: theme.transitions.default,
        content: "''",
        position: "absolute",
        zIndex: -1,
        left: 0,
        top: 0,
        bottom: 0,
        minWidth: 50,
        width: `calc(${sideNavWidthMD}px - 380/768*100vh + 50px)`,
        pointerEvents: "none",
        background: ({ color }) => {
          switch (color) {
            case ELITE:
              return "linear-gradient(to bottom, #8E2141, #B55774)";
            case ISLAMIC:
              return "#417C35";
            default:
              return "linear-gradient(to bottom, #E9320F, #EA1C44)";
          }
        }
      },
      "& $formNavContent": {
        width: sideNavWidthMD,
        paddingTop: 168,
        paddingLeft: 40,
        paddingRight: 40,
        boxSizing: "border-box"
      }
    },
    [theme.breakpoints.only("sm")]: {
      width: ({ accountsComparisonPage }) =>
        accountsComparisonPage ? sideNavWidthMD : sideNavWidthSM,
      "& $formNavContent": {
        width: ({ accountsComparisonPage }) =>
          accountsComparisonPage ? sideNavWidthMD : sideNavWidthSM,
        opacity: 1
      },
      "& $logoSmall": {
        opacity: 0
      },
      "&:not(:hover):not(.active), &:not(.active):not(:hover)": {
        width: ({ accountsComparisonPage }) =>
          accountsComparisonPage ? sideNavWidthCollapsed : sideNavWidthSM,
        "&:before": {
          width: ({ accountsComparisonPage }) =>
            accountsComparisonPage
              ? `calc(${sideNavWidthCollapsed}px - 380/768*100vh*0.4 + 50px)`
              : `calc(${sideNavWidthSM}px - 380/768*100vh*0.4 + 50px)`
        },
        "& > svg:first-child": {
          transform: ({ accountsComparisonPage }) =>
            accountsComparisonPage
              ? "translate(30%, -50%) scaleX(0.4)"
              : "translate(0, -50%) scaleX(1)",
          "& path": {
            "&:not(:first-child)": {
              fillOpacity: ({ accountsComparisonPage }) => (accountsComparisonPage ? 0 : 1)
            }
          }
        },
        "& $formNavContent": {
          opacity: ({ accountsComparisonPage }) => (accountsComparisonPage ? 0 : 1)
        },
        "& $logoSmall": {
          opacity: ({ accountsComparisonPage }) => (accountsComparisonPage ? 1 : 0)
        }
      }
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG,
      "&:before": {
        width: `calc(${sideNavWidthLG}px - 380/768*100vh + 50px)`
      },
      "& $formNavContent": {
        width: sideNavWidthLG,
        paddingLeft: 80
      }
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
  },
  formNavContent: {
    [theme.breakpoints.only("sm")]: {
      opacity: ({ accountsComparisonPage }) => (accountsComparisonPage ? 0 : 1)
    }
  },
  logoSmall: {
    opacity: ({ accountsComparisonPage }) => (accountsComparisonPage ? 1 : 0),
    position: "absolute",
    pointerEvents: "none",
    top: 30,
    left: 40,
    transition: theme.transitions.default,
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "block"
    }
  },
  formNavBg: {
    [theme.breakpoints.only("xs")]: {
      backgroundImage: ({ color, isSmallBg }) =>
        `url(${blobImages[`${color}${isSmallBg ? "S" : "M"}`]})`,
      backgroundSize: "cover",
      backgroundPosition: "center bottom"
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 38
    },
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
