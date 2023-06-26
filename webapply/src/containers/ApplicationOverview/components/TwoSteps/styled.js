import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: "55px",
    color: "green"
  },
  firstGroup: {
    width: "100%",
    marginTop: 40
  },
  indent: {
    margin: "0 -10px 30px",
    paddingTop: 20
  },
  secondGroup: {
    height: "300px",
    width: "100%",
    display: "flex",
    "& span": {
      maxWidth: "380px"
    },
    "& img": {
      maxWidth: "100%",
      objectFit: "contain",
      [theme.breakpoints.only("sm")]: {
        width: 440
      }
    },
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      flexDirection: "column-reverse",
      "& img": {
        margin: "20px auto 0"
      }
    }
  },
  secondGroupText: {
    marginRight: -110,
    zIndex: 1,
    [theme.breakpoints.only("xs")]: {
      marginRight: 0
    }
  },
  note: {
    marginBottom: "60px",
    fontSize: "12px",
    textAlign: "left",
    color: "#888888",
    [theme.breakpoints.only("xs")]: {
      marginBottom: "15px"
    }
  },
  title: {
    color: "#373737",
    fontSize: 20,
    lineHeight: "26px",
    margin: "22px 0 0 0",
    fontWeight: "600"
  },
  info: {
    color: "#373737",
    fontSize: 20,
    lineHeight: "26px"
  },
  divider: {
    height: "1px",
    background: "#E6E6E6"
  }
}));
