/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
//import { portraitOrientationQueryIPads } from "../../../../constants/styles";
export const useStyles = makeStyles(theme => ({
  accountTypeWrapper: {
    display: "flex",
    border: "0.5px solid #ADADAD",
    background: "#FFF",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    gap: "16px",

    [theme.breakpoints.up("sm")]: {
      display: "flex",
      gap: "20px",
      border: 0,
      background: "#FFF",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      "&:first-child": {
        background: "rgba(245, 245, 245, 0.50)"
      },
      "&:nth-child(2)": {
        background: "rgba(253, 231, 232, 0.20)"
      },
      "&:nth-child(3)": {
        background: "rgba(253, 231, 232, 0.60)"
      },
      "&:last-child": {
        background: "#FDE7E8"
      }
    }
  },
  accountType: {
    height: "165px",
    padding: "10px 10px",

    [theme.breakpoints.only("xs")]: {
      width: "50%"
    },
    [theme.breakpoints.only("sm")]: {
      height: "auto",
      padding: "35px 24px"
    },
    [theme.breakpoints.up("md")]: {
      height: "216px",
      padding: "35px 24px"
    }
  },
  accountTypeSticky: {
    // height: "165px",
    padding: "16px 10px",
    width: "50%",

    [theme.breakpoints.up("sm")]: {
      height: "auto",
      padding: "24px 24px",
      width: "unset",
      gap: "12px"
    }
  },

  mobileAccountCard: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));
