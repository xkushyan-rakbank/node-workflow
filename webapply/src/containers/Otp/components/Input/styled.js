import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  squareInput: {
    marginRight: 20,
    marginTop: 48,
    marginBottom: 40,
    borderRadius: 8,
    width: "110px",
    "&:last-child": {
      marginRight: 0
    },
    "& fieldset": {
      borderRadius: 8,
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#373737"
    },
    "& input": {
      boxSizing: "border-box",
      maxWidth: 85,
      height: 88,
      textAlign: "center",
      fontSize: 46,
      fontWeight: 600,
      fontFamily: "Open Sans, sans-serif",
      "&:focus-visible": {
        outline: 'none !important',
      }, 
    },
    [theme.breakpoints.down("md")]: {
      width: 85,
      "& input": {
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
        height: 48,
        fontSize: 24,
        padding: "11px 12px 13px"
      }
    }
  }
}));
