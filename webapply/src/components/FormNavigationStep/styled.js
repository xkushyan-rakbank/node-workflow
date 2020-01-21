import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  stepItem: {
    position: "relative",
    color: "rgba(255,255,255,.5)",
    listStyleType: "none",
    fontSize: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "64px",
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
    "@media only screen and (max-width: 1300px)": {
      marginLeft: "-15px",
      paddingLeft: "40px",
      fontSize: "16px",
      "& span": {
        left: "10px"
      }
    },
    "&:before": {
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
      content: "''",
      position: "absolute",
      left: "0",
      top: "0",
      height: "50%",
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
    width: "24px",
    height: "24px",
    opacity: 0.5,
    borderRadius: "50%",
    border: "1px solid #fff"
  },
  activeCircle: {
    borderColor: "#fff",
    opacity: 1
  },
  doneIcon: {
    fill: "#fff"
  }
});
