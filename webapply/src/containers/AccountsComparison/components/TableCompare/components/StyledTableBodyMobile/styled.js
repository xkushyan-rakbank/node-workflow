import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

export const useStyles = makeStyles(theme => ({
  linkStyle: {
    margin: 0
  },
  buttonStyle: {
    height: 32
  },
  tableRowRoot: {
    "& td": {
      height: "auto",
      padding: "20px 5px",
      position: "relative",
      fontSize: "16px",
      fontFamily: "Open Sans"
    }
  },
  tableCellRoot: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    position: "relative",
    "& span": {
      display: "block"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888"
    },
    "& button": {
      marginTop: "5px"
    }
  },
  tableRoot: {
    tableLayout: "fixed",
    width: "100%",
    maxWidth: "100%",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    margin: "40px 0 30px 0",
    "& th, & td": {
      borderBottom: "none",
      zIndex: "1"
    },
    "& tr:not(:last-child) td": {
      "&:before": {
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        height: 1,
        backgroundColor: "#f7f8f9",
        display: "block",
        top: "-1px",
        [theme.breakpoints.only("xs")]: {
          content: "''"
        }
      }
    },
    "& tr:nth-of-type(even) td": {
      "&:before": {
        bottom: "0px"
      }
    },
    "& tr:nth-of-type(odd) td": {
      "&:before": {
        bottom: "0px"
      }
    },
    "& th:last-child, & td:last-child": {
      paddingRight: "0"
    },
    "& th:first-child, & td:first-child": {
      paddingLeft: "0"
    }
  },
  tableCellSelect: {
    paddingTop: "0!important",
    paddingBottom: "0!important",
    "&:before": {
      display: "none!important"
    }
  },
  relative: {
    position: "relative"
  }
}));

export const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 4,
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    width: "100%",
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #e8e8e8",
    fontSize: 14,
    textAlign: "left",
    padding: "13px 26px 13px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      backgroundColor: "#fff"
    }
  }
}))(InputBase);
