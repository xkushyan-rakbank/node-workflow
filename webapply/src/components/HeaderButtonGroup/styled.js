import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  trackNSwitchAccountBtnWrapper: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    marginTop: "21px"
  },
  trackNSwitchAccountBtn: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "22px",
    borderRadius: "21px",
    textTransform: "none",
    color: "#000",
    border: "1px solid #000"
  }
}));
