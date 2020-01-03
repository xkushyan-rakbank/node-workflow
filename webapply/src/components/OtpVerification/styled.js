import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  squareInput: {
    marginRight: 20,
    marginTop: 48,
    marginBottom: 40,
    borderRadius: 8,
    height: 88,
    width: "110px",
    "&:last-child": {
      marginRight: 0
    },
    "& fieldset": {
      display: "none"
    },
    "& input": {
      boxSizing: "border-box",
      height: 88,
      maxWidth: "110px",
      textAlign: "center",
      fontSize: 46,
      fontWeight: 600,
      fontFamily: "Open Sans, sans-serif",
      borderRadius: 8,
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& input:focus": {
      border: "solid 2px rgba(0, 0, 0, 0.87)"
    },
    [theme.breakpoints.down("md")]: {
      width: 85,
      "& input": {
        maxWidth: "85px",
        height: 70
      }
    },
    [theme.breakpoints.down("sm")]: {
      margin: "30px 8px 30px 0",
      maxWidth: 48,
      minWidth: 1,
      flexBasis: 0,
      flexGrow: 1,
      "& input": {
        maxWidth: 48,
        height: 48,
        fontSize: 24,
        padding: "11px 12px 13px"
      }
    }
  }
}));
