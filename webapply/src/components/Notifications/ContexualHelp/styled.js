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
        top: "20%",
        marginLeft: "0",
        transform: "rotate(45deg)",
        borderWidth: "0.3em"
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
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: "232px",
    whiteSpace: "pre-line",
    padding: "10px",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      marginLeft: "-0.5em",
      bottom: "-2em",
      left: "50%",
      boxSizing: "border-box",
      border: "0.5em solid black",
      transformOrigin: "0 0",
      transform: "rotate(-45deg)",
      boxShadow: "-1px 1px 3px 0 rgba(0, 0, 0, 0.1)",
      borderColor: "transparent transparent #fff #fff"
    }
  },
  popper: arrowGenerator(theme.palette.grey[700])
}));
