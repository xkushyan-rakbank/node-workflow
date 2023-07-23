import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles((theme) => ({
  trackNSwitchAccountBtnWrapper: {
    display: "flex",
    left: 0,
    flexWrap: "nowrap",
    marginTop: "21px",
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
  },
}));
