import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
      padding: "0 16px",
      boxSizing: "border-box"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      height: "auto",
      marginTop: 0
    }
  },
  title: {
    marginTop: "174px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      marginTop: "80px"
    }
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      height: "auto"
    }
  },
  btnWrapper: {
    marginBottom: "80px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      marginBottom: 0
    }
  }
}));
