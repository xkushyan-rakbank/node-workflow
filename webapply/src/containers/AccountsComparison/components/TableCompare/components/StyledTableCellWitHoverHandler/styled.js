import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  tableCellRoot: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    "& span": {
      display: "block"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888",
      [theme.breakpoints.only("xs")]: {
        fontSize: 10
      }
    },
    "& div": {
      fontSize: "14px",
      color: "#888",
      [theme.breakpoints.only("xs")]: {
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 143,
        lineHeight: "18px",
        letterSpacing: "normal"
      }
    },
    "& button": {
      marginTop: "5px"
    }
  },
  tableCellActive: {
    "& span:first-child": {
      fontWeight: "600"
    },
    "& span": {
      "&:before": {
        content: "''",
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        height: 1,
        backgroundColor: "#e8e8e8",
        display: "block",
        top: 0
      }
    }
  }
}));
