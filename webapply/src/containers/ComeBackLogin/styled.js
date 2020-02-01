import { makeStyles } from "@material-ui/core/styles";

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
    }
  },
  title: {
    marginTop: "174px"
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px"
    }
  },
  btnWrapper: {
    marginBottom: "80px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto"
    }
  }
}));
