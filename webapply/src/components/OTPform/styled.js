import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    marginTop: "174px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
      padding: "0 16px",
      boxSizing: "border-box"
    }
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
    marginBottom: "42px"
  },
  nextButton: {
    width: "auto",
    margin: 0
  },
  title: {},
  submitButton: {
    width: "auto",
    margin: 0
  }
}));
