/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
//import { portraitOrientationQueryIPads } from "../../../../constants/styles";
export const useStyles = makeStyles((theme) => ({
  accountTypeWrapper: {
    display: "flex",
    border: "0.5px solid #ADADAD",
    background: "#FFF",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",

    [theme.breakpoints.up("sm")]: {
      display: "flex",
      border: "1px solid #E6E6E6",
      background: "#FFF",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
    },
  },
  accountType: {
    height: "165px",
    padding: "10px 10px",

    [theme.breakpoints.only("xs")]: {
      width: "50%",
    },

    [theme.breakpoints.up("sm")]: {
      height: "260px",
      padding: "40px 24px",
    },
  },
  accountTypeSticky: {
    height: "165px",
    padding: "16px 10px",
    width: "50%",

    [theme.breakpoints.up("sm")]: {
      height: "auto",
      padding: "24px 24px",
      width: "unset",
    },
  },

  mobileAccountCard: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
