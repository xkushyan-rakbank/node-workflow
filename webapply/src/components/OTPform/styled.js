import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      marginTop: "50px",
      padding: "0 16px",
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
    marginTop: "42px",
    marginBottom: "80px"
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
  }
}));
