import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  paperRoot: {
    marginTop: "5px",
    boxSizing: "border-box",
    boxShadow: "none",
    position: "relative"
  },
  tableContainer: {
    position: "relative"
  },
  tableHead: {
    backgroundColor: "#f7f8f9"
  },
  rootCellName: {
    maxWidth: "180px",
    paddingLeft: "5px",
    paddingRight: "0",
    [theme.breakpoints.only("xs")]: {
      width: "75%"
    }
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    transition: "left .25s ease",
    [theme.breakpoints.only("xs")]: {
      height: "calc(100% + 30px)"
    },
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#fff"
  },
  tableRowRoot: {
    "& th": {
      fontSize: "14px",
      color: "#888888",
      padding: "0 3px 0 0",
      fontFamily: "Open Sans"
    },
    "& td": {
      height: "60px",
      padding: "0",
      position: "relative",
      fontSize: "16px",
      fontFamily: "Open Sans"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f7f8f9"
    }
  },
  tableHeaderCellRoot: {
    position: "relative",
    textAlign: "center"
  },
  tableHeaderCellHead: {
    color: "#373737",
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: "600",
    height: "60px",
    padding: 0,
    borderBottom: "none",
    width: "150px",
    [theme.breakpoints.up("lg")]: {
      width: "190px"
    }
  },
  tableCellRoot: {
    fontSize: "16px",
    color: "#373737",
    textAlign: "center",
    "& span": {
      display: "block"
    },
    "& span + span": {
      fontSize: "12px",
      color: "#888"
    },
    "& button": {
      minWidth: "120px",
      minHeight: "32px",
      "& span:first-child": {
        fontSize: "14px"
      }
    }
  },
  tableRoot: {
    tableLayout: "fixed",
    width: "780px",
    maxWidth: "780px",
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
        content: "''",
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        height: "2px",
        backgroundColor: "#f7f8f9",
        display: "block",
        top: "-1px"
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
    }
  },
  tableCellActive: {
    fontWeight: "bold",
    "& span:first-child": {
      fontWeight: "600"
    },
    "& span:last-child": {
      fontWeight: "400"
    },
    "& a": {
      minWidth: "150px",
      minHeight: "40px",
      height: "auto",
      "& div": {
        backgroundColor: "#000",
        height: "40px",
        "& span:first-child": {
          color: "#fff",
          fontSize: "16px"
        }
      }
    }
  },
  relative: {
    position: "relative"
  }
}));
