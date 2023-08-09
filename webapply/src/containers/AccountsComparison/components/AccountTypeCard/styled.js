/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  accountTypeTitle: {
    color: "#1F1F1F",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: "20px",
    margin: 0,
    marginBottom: "8px",
    fontStyle: "normal",
    textAlign: "left",
    [theme.breakpoints.only("sm")]: {
      textAlign: "center",
      color: "#1F1F1F",
      fontSize: "1.25rem",
      lineHeight: "22px",
    },

    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      fontSize: "1.75rem",
      lineHeight: "36px",
    }
  },
  accountTypeTitleSticky: {
    fontSize: "1.25rem",
    lineHeight: "22px",
    marginBottom: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.75rem",
      lineHeight: "36px"
    },
  },
  accountTypeDesc: {
    color: "#757575",
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "16px",
    margin: 0,
    textAlign: "left",

    [theme.breakpoints.up("sm")]: {
      color: "#757575",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "28px",
      margin: 0,
      textAlign: "inherit",
    },
  },
  applyBtn: {
    display: "inline-flex",
    padding: "20px 40px",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    borderRadius: "100px",
    background: "#1F1F1F",
    color: "#FFF",
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "32px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#1F1F1F",
    },
  },
  btnWrapper: {
    justifyContent: "center",
  },
  accountTypeCardBtn: {
    minHeight: "auto",
    height: "auto",
    padding: "10px  20px",
    borderRadius: "50px",
    [theme.breakpoints.only("sm")]: {
      padding: "12px 20px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
      padding: "12px 40px"
    }
  },
  accountTypeCardBtnLabel: {
    fontSize: "0.875rem",
    [theme.breakpoints.only("sm")]: {
      whiteSpace: "nowrap",
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem"
    }
  }
}));
