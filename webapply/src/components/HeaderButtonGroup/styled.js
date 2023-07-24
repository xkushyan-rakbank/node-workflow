import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles((theme) => ({
  trackNSwitchAccountBtnWrapper: {
    display: "flex",
    left: 0,
    flexWrap: "nowrap",
    marginTop: "21px",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
  },
  trackNSwitchAccountBtn: {
    width: "144px",
    height: "40px",
    borderRadius: "21px",
    border: "1px solid black",
    fontSize: "0.75rem",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1rem",
    color: "black",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      width: "unset",
      height: "unset",
      textAlign: "unset",
      fontStyle: "unset",
      borderRadius: "21px",
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "22px",
      color: "#000",
      border: "1px solid #000",
    },
  },
}));
