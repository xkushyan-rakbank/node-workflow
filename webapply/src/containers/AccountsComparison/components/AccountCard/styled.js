/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
//import { portraitOrientationQueryIPads } from "../../../../constants/styles";
export const useStyles = makeStyles(theme => ({
  accountTypeWrapper: {
    display: "flex",
    border: "0.5px solid #ADADAD",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    gap: "16px",
    "&.islamicAccountType": {
      border: 0,
      "&:nth-child(3)": {
        border: 0,
        background: "rgba(230, 242, 236, 0.20)"
      },
      "&:nth-child(4)": {
        border: 0,
        background: "#E6F2EC"
      }
    },
    "&:nth-child(3)": {
      background: "rgba(253, 231, 232, 0.20)",
      border: "0.5px solid #E6E6E6"
    },
    "&:nth-child(4)": {
      background: "#FCE8E9",
      border: "0.5px solid #E6E6E6"
    },

    [theme.breakpoints.up("sm")]: {
      display: "flex",
      gap: "24px",
      border: 0,
      background: "#FFF",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      "&.islamicAccountType": {
        "&:nth-child(2)": {
          background: "rgba(230, 242, 236, 0.20)"
        },
        "&:nth-child(3)": {
          background: "rgba(230, 242, 236, 0.60)"
        },
        "&:last-child": {
          background: "#E6F2EC"
        }
      },
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
    height: "165px",
    padding: "16px 10px",
    gap: "16px",
    transition: "all 0.2s linear",

    [theme.breakpoints.up("sm")]: {
      height: "auto",
      padding: "24px 24px",
      width: "unset",
    }
  },

  mobileAccountCard: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  desktopAccountCard: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    }
  }
}));
