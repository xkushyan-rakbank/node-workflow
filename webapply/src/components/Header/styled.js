import { makeStyles } from "@material-ui/core";
import { LOGO_ELITE, LOGO_ELITE_ISLAMIC, LOGO_ISLAMIC, LOGO_STANDART } from "./constants";

export const useStyles = makeStyles(theme => ({
  header: {
    position: "absolute",
    top: 30,
    zIndex: 12,
    "& a": {
      display: "flex"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "270px"
    },
    [theme.breakpoints.up("sm")]: {
      left: ({ logoType }) => {
        switch (logoType) {
          case LOGO_ISLAMIC:
          case LOGO_ELITE_ISLAMIC:
            return 20;
          case LOGO_STANDART:
          case LOGO_ELITE:
          default:
            return 40;
        }
      }
    },
    [theme.breakpoints.only("xs")]: {
      top: "20px",
      left: "16px"
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
            return 220;
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
