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
    "& .small-menu-show": {
      display: "none"
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: ({ isOpen, accountsComparisonPage }) =>
        isOpen && accountsComparisonPage ? "calc(-100vh + 220px)" : 0,
      width: "100%",
      paddingTop: 71,
      height: ({ isOpen, isSmallBg }) => {
        if (isOpen) return "calc(100vh - 50px)";
        if (isSmallBg) return 220;
        return 340;
      },
      transition: theme.transitions.create("height", {
        easing: theme.transitions.easing.linear,
        duration: theme.transitions.duration.short
      })
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
              return "linear-gradient(to bottom, #831334, #b1536f 90%, #b25470 100%)";
            case ISLAMIC:
              return "#417C35";
            case STANDART:
              return "linear-gradient(to bottom, #E9320F, #EA1C44)";
            default:
              return "transparent";
          }
        }
      }
    },
    [theme.breakpoints.only("sm")]: {
      "& .small-menu-hide": {
        opacity: 1,
        transition: theme.transitions.default
      },
      "& .small-menu-show": {
        display: ({ smallMenu }) => (smallMenu ? "block" : "none"),
        opacity: 0,
        transition: theme.transitions.default
      },
      "& $formNavContent": {
        pointerEvents: "auto"
      },
      width: ({ smallMenu }) => (smallMenu ? sideNavWidthMD : sideNavWidthSM),
      "&:not(:hover):not(.active), &:not(.active):not(:hover)": {
        width: ({ smallMenu }) => (smallMenu ? sideNavWidthCollapsed : sideNavWidthSM),
        "& .small-menu-hide": {
          opacity: ({ smallMenu }) => (smallMenu ? 0 : 1)
        },
        "& .small-menu-show": {
          opacity: ({ smallMenu }) => (smallMenu ? 1 : 0)
        },
        "& $formNavContent": {
          pointerEvents: ({ smallMenu }) => (smallMenu ? "none" : "auto")
        },
        "&:before": {
          width: ({ smallMenu }) =>
            smallMenu
              ? `calc(${sideNavWidthCollapsed}px - 380/768*100vh*0.4 + 50px)`
              : `calc(${sideNavWidthSM}px - 380/768*100vh*0.4 + 50px)`
        },
        "& > svg:first-child": {
          transform: ({ smallMenu }) =>
            smallMenu ? "translate(30%, -50%) scaleX(0.4)" : "translate(0, -50%) scaleX(1)",
          "& path": {
            "&:not(:first-child)": {
              fillOpacity: ({ smallMenu }) => (smallMenu ? 0 : 1)
            }
          }
        }
      }
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG,
      "&:before": {
        width: `calc(${sideNavWidthLG}px - 380/768*100vh + 50px)`
      }
    },
    "& ul": {
      margin: 0,
      paddingLeft: 0,
      padding: "5px 0 0 25px",
      marginLeft: "20px",
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
    display: "flex",
    flexDirection: "column",
    maxHeight: "100vh",
    overflow: "auto",
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
      height: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: sideNavWidthMD,
      paddingTop: 168,
      paddingLeft: 40,
      paddingRight: 40,
      padding: "168px 40px 20px",
      boxSizing: "border-box"
    },
    [theme.breakpoints.only("sm")]: {
      width: ({ smallMenu }) => (smallMenu ? sideNavWidthMD : sideNavWidthSM)
    },
    [theme.breakpoints.up("lg")]: {
      width: sideNavWidthLG,
      paddingLeft: 80
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
  chatButton: {
    minHeight: 66,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "77px",
    bottom: "40px",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      left: 40
    },
    [theme.breakpoints.only("xs")]: {
      position: "fixed",
      left: "15px"
    }
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 32,
    lineHeight: "36px",
    fontWeight: 600,
    fontFamily: "Open Sans",
    whiteSpace: "pre-line"
  }
}));
