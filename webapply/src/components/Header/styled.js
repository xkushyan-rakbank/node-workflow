import { makeStyles } from "@material-ui/core";
import { LOGO_ELITE, LOGO_ELITE_ISLAMIC, LOGO_ISLAMIC, LOGO_STANDART } from "./constants";

export const useStyles = makeStyles(theme => ({
  header: {
    position: "absolute",
    top: "30px",
    left: "40px",
    zIndex: 12,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "270px"
    },
    "& img": {
      minWidth: "140px",
      width: "140px"
    },
    "& a": {
      display: "flex"
    },
    [theme.breakpoints.only("xs")]: {
      position: "absolute",
      margin: 0,
      padding: 0,
      top: "20px",
      left: "16px",
      "& img": {
        minWidth: "114px",
        width: "114px"
      }
    }
  },
  logo: {
    height: 44,
    width: ({ logoType }) => {
      switch (logoType) {
        case LOGO_ISLAMIC:
        case LOGO_ELITE_ISLAMIC:
          return 247;
        case LOGO_STANDART:
        case LOGO_ELITE:
        default:
          return 114;
      }
    },
    [theme.breakpoints.up("sm")]: {
      height: 60,
      width: ({ logoType }) => {
        switch (logoType) {
          case LOGO_ISLAMIC:
          case LOGO_ELITE_ISLAMIC:
            return 300;
          case LOGO_STANDART:
          case LOGO_ELITE:
          default:
            return 160;
        }
      }
    }
  },
  disabled: {
    pointerEvents: "none"
  }
}));
