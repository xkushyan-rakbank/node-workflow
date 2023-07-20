/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  accountTypeTitle: {
    color: "#1F1F1F",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: "20px",
    margin: 0,
    marginBottom: "8px",
    fontStyle: "normal",
    textAlign: "left",

    [theme.breakpoints.up("sm")]: {
      textAlign: "inherit",
      color: "#1F1F1F",
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: "36px",
      margin: 0,
      marginBottom: "8px",
    },
  },
  accountTypeTitleSticky: { fontSize: "1.5rem" },
  accountTypeDesc: {
    color: "#757575",
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "16px",
    margin: 0,
    textAlign: "left",

    [theme.breakpoints.up("sm")]: {
      color: "#757575",
      fontSize: "1.25rem",
      fontWeight: 400,
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
  stickyBtn: {
    minHeight: "10px",
    padding: "16px",
    [theme.breakpoints.up("sm")]: {
      minHeight: "10px",
      padding: "9px 24px",
    },
  },
}));
