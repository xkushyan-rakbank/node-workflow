import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  stepItem: {
    position: "relative",
    color: "rgba(255,255,255,.5)",
    listStyleType: "none",
    fontSize: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "60px",
    fontWeight: "400",
    lineHeight: "26px",
    "&:not(:last-child)": {
      paddingBottom: "20px"
    },
    "& span": {
      position: "absolute",
      left: "20px",
      marginLeft: "0"
    },
    [theme.breakpoints.only("xs")]: {
      marginLeft: "-15px",
      paddingLeft: "40px",
      fontSize: "16px",
      "& span": {
        left: "10px"
      }
    },
    "&:before": {
      display: props => (props.hideProgress ? "none" : "inline"),
      content: "''",
      position: "absolute",
      left: "0",
      top: "0",
      height: "100%",
      width: "2px",
      backgroundColor: "#fff",
      opacity: ".4"
    }
  },
  activeStepItem: {
    fontWeight: "600",
    color: "#fff",
    "&:last-child:after": {
      height: "100%"
    },
    "&:after": {
      display: props => (props.hideProgress ? "none" : "inline"),
      content: "''",
      position: "absolute",
      left: "0",
      top: "0",
      height: "calc(100% - 20px)",
      width: "2px",
      backgroundColor: "#fff"
    }
  },
  filledStepItem: {
    "&:before": {
      opacity: "1"
    }
  },
  circle: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    height: "24px",
    lineHeight: "24px",
    opacity: 0.5,
    borderRadius: "50%",
    border: "1px solid #fff",
    boxSizing: "border-box"
  },
  activeCircle: {
    borderColor: "#fff",
    borderWidth: "2px",
    opacity: 1
  },
  doneIcon: {
    width: "20px",
    fill: "#fff"
  },
  activeIcon: {
    width: "17px"
  }
}));
