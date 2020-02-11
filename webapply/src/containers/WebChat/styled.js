import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  chat: {
    position: "absolute",
    left: "77px",
    bottom: "40px",
    color: "#fff",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      left: "15px"
    },
    [theme.breakpoints.only("xs")]: {
      position: "fixed"
    }
  },
  chatInner: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column"
    },
    "& span": {
      width: "66px",
      height: "66px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: " #fff",
      borderRadius: "50%",
      boxShadow: "0 2px 14px 0 rgba(0, 0, 0, 0.18)",
      marginRight: "20px",
      position: "relative"
    },
    "& p": {
      margin: "0"
    },
    "& a": {
      textDecoration: "underline",
      fontWeight: "600",
      fontSize: "18px",
      color: "#fff",
      marginLeft: "5px"
    },
    "& a + a": {
      marginLeft: "0px"
    },
    "& img": {
      width: "30px",
      height: "30px"
    },
    [theme.breakpoints.only("xs")]: {
      display: "none",
      "& span": {
        width: "48px",
        height: "48px",
        margin: 0
      },
      "& img": {
        width: "26px",
        height: "26px"
      },
      "& a": {
        marginLeft: 0
      }
    }
  },
  messagesCount: {
    top: 10,
    right: 11,
    minWidth: 20,
    height: 20,
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "#db1d2c",
    padding: 1,
    "& p": {
      fontSize: 13,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    }
  },
  chatWrapper: {
    position: "fixed",
    bottom: "40px",
    left: "40px",
    transition: "all 0.3s ease"
  },
  mimimized: {
    bottom: "-105%"
  }
}));
