import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    marginTop: "174px",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 15,
    [theme.breakpoints.only("xs")]: {
      marginTop: "30px"
    }
  },
  btnWrapper: {
    marginBottom: "80px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "auto"
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: 0
    }
  }
}));
