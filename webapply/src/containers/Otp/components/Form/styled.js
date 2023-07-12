import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      marginTop: 0,
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
    fontSize: "0.75rem",
    cursor: "pointer",
    opacity: 1,
    visibility: "visible",
    float: "right",
    marginRight: "45px",
    color: "#8D0C10",
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.064px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem"
    }
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
    marginTop: "42px",
    [theme.breakpoints.only("xs")]: {
      marginBottom: "80px"
    }
  },
  nextButton: {
    width: "auto",
    margin: 0
  },
  title: {
    marginTop: "40px",
    [theme.breakpoints.only("xs")]: {
      marginTop: 0
    }
  },
  submitButton: {
    width: "auto",
    margin: 0
  },
  otpExpireMsg: {
    color: "#757575",
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "16px",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem"
    }
  }
}));
