import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      marginTop: "50px",
      boxSizing: "border-box"
    }
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
    opacity: 1,
    visibility: "visible"
  },
  linkDisabled: {
    opacity: "0.5",
    cursor: "not-allowed"
  },
  error: {
    marginBottom: "10px"
  },
  linkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "42px"
  },
  nextButton: {
    width: "auto",
    margin: 0
  },
  title: {
    marginTop: "40px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0"
    }
  },
  submitButton: {
    width: "auto",
    margin: 0
  },
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
      fontFamily: "Open Sans, sans-serif"
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
