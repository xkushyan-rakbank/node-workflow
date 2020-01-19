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
    border: "1px solid rgba(255,255,255,.5)",
    borderRadius: "50%"
  },
  filledCircle: {
    "&:before": {
      content: "''",
      position: "absolute",
      left: "10px",
      top: "6px",
      width: "4px",
      height: "9px",
      borderBottom: "1px solid rgba(255,255,255, .5)",
      borderRight: "1px solid rgba(255,255,255, .5)",
      transform: "rotate(45deg)"
    }
  },
  activeCircle: {
    borderColor: "#fff",
    "&:before": {
      content: "''",
      position: "absolute",
      left: "10px",
      top: "8px",
      width: "6px",
      height: "6px",
      borderTop: "2px solid #fff",
      borderRight: "2px solid #fff",
      transform: "rotate(45deg)"
    },
    "&:after": {
      content: "''",
      position: "absolute",
      left: "6px",
      top: "11px",
      width: "12px",
      height: "2px",
      backgroundColor: "#fff"
    }
  }
});
