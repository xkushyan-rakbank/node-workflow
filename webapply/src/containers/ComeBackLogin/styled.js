import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  centeredContainer: {
    marginTop: 174,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      marginTop: 110
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "50px",
      padding: "0 16px",
      boxSizing: "border-box"
    }
  },
  title: {
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "block",
      marginBottom: 40,
      fontSize: 38,
      lineHeight: "46px"
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
