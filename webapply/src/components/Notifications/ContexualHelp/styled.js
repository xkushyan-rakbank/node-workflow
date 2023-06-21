import { makeStyles } from "@material-ui/core/styles";

const arrowGenerator = color => {
  return {
    "&[x-placement*='bottom'] $tooltip": {
      "&::before": {
        top: 0,
        left: "50%",
        transform: "rotate(135deg)"
      }
    },
    "&[x-placement*='top'] $tooltip": {
      "&::before": {
        marginLeft: "-0.5em",
        bottom: "-1em",
        left: "50%",
        transform: "rotate(-45deg)"
      }
    },
    "&[x-placement*='right'] $tooltip": {
      "&::before": {
        left: 0,
        top: "30%",
        marginLeft: "0",
        transform: "rotate(45deg)",
        borderWidth: "5px"
      }
    },
    "&[x-placement*='left'] $tooltip": {
      "&::before": {
        top: "50%",
        left: "auto",
        right: "-6px",
        transform: " translate(0, 50%) rotate(-135deg)",
        borderWidth: "0.3em",
        marginLeft: 0
      }
    }
  };
};

export const useStyles = makeStyles(theme => ({
  tooltip: {
    position: "relative",
    backgroundColor: "#E8E8E8",
    color: "#000000",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15);",
    fontSize: "10px",
    lineHeight: "16px",
    whiteSpace: "pre-line",
    padding: "5px 8px",
    borderRadius: "4px",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      marginLeft: "-0.5em",
      bottom: "-2em",
      left: "50%",
      boxSizing: "border-box",
      border: "5px solid #E8E8E8",
      transformOrigin: "0 0",
      transform: "rotate(-45deg)",
      borderColor: "transparent transparent #E8E8E8 #E8E8E8"
    }
  },
  popper: arrowGenerator("#E8E8E8")
}));
