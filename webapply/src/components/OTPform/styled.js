import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
      padding: "0 16px",
      boxSizing: "border-box"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      marginTop: 0
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
    marginTop: "174px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      marginTop: "80px"
    }
  },
  submitButton: {
    width: "auto",
    margin: 0
  }
}));
