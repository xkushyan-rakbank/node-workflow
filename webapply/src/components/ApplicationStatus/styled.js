import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    maxWidth: "650px",
    margin: "0 auto",
    "& > img": {
      width: "460px"
    }
  },
  message: {
    boxSizing: "border-box",
    maxWidth: "609px",
    textAlign: "center",
    color: "#373737",
    fontSize: 20,
    lineHeight: 1.5,
    "& > p": {
      marginBottom: "27px"
    }
  },
  appStatusLink: {
    color: "#373737",
    border: "solid 1px #373737",
    padding: "3px 9px",
    fontSize: 14,
    margin: "5px",
    borderRadius: 21,
    display: "block",
    transition: "all 0.2s ease",
    textTransform: "inherit",
    "&:hover": {
      backgroundColor: "#373737",
      color: "#fff"
    }
  },
  linkWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  appErrorLink: {
    background: "#1F1F1F",
    color: "#FFFFFF",
    width: "auto",
    height: "40px",
    marginRight: "16px",
    borderRadius: "21px",
    fontSize: "24px",
    fontWeight: 400,
    padding: 20,
    textTransform: "inherit",
    "&:hover": {
      backgroundColor: "#373737",
      color: "#fff"
    }
  },
  appErrorStatusMain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minHeight: "100vh"
  },
  appErrorStatus: {
    padding: "40px",
    justifyContent: "center",
    width: "788px",
    height: "auto",
    background: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
  },
  errorMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  linkErrorWrapper: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: "40px"
  },
  title: {
    fontWeight: "500",
    fontSize: "28px",
    lineHeight: "36px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    color: "#1F1F1F"
  },
  subTitle: {
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "28px",
    display: "flex",
    alignItems: "center",
    marginRight: "8px",
    color: "#757575"
  },
  divider: {
    border: "1px solid #E6E6E6",
    width: "708px",
    marginTop: "40px"
  },
  info: {
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "28px",
    marginRight: "8px",
    color: "#757575",
    "& a": {
      color: "#0000FF",
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none"
      }
    }
  },
  header: {
    position: "absolute",
    top: 30,
    zIndex: 12,
    "& a": {
      display: "flex"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "270px"
    },
    [theme.breakpoints.up("sm")]: {
      left: 40
    },
    [theme.breakpoints.only("xs")]: {
      top: "20px",
      left: "16px"
    }
  }
}));
