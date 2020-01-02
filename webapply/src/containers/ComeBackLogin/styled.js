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
  form: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px"
    }
  },
  btnWrapper: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto"
    }
  }
}));
