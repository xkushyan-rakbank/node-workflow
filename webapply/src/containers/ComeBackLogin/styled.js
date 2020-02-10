import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    marginTop: "174px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      marginTop: "50px",
      padding: "0 16px",
      boxSizing: "border-box"
    }
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.only("sm")]: {
      marginTop: "30px"
    },
    [theme.breakpoints.only("sm")]: {
      height: "auto"
    }
  },
  btnWrapper: {
    marginBottom: "80px",
    [theme.breakpoints.only("sm")]: {
      marginLeft: "auto"
    },
    [theme.breakpoints.only("sm")]: {
      marginBottom: 0
    }
  }
}));
