import { makeStyles } from "@material-ui/core/styles";

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
