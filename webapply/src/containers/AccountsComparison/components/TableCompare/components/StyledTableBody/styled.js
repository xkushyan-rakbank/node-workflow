import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
    "@media only screen and (max-width: 991px)": {
      width: "75%"
    }
  },
  selectedAccountContainer: {
    position: "absolute",
    zIndex: "1",
    top: "-15px",
    height: "calc(100% + 30px)",
    transition: "left .25s ease",
    "@media only screen and (max-height: 900px)": {
      height: "calc(100% + 30px)"
    },
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#fff"
  },
  containedButton: {
    boxShadow: "none",
    backgroundColor: "#fff",
    height: "auto",
    border: "1px solid #373737",
    padding: "3px 15px",
    minWidth: "120px",
    fontFamily: "Open Sans",
    "&:hover": {
      backgroundColor: "#000",
      "& span": {
        color: "#fff"
      }
    }
  },
  containedButtonLabelStyle: {
    color: "#373737",
    fontSize: "14px",
    textAlign: "center",
    display: "block"
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
    width: "190px",
    maxWidth: "190px",
    "@media only screen and (max-width: 1360px)": {
      width: "150px"
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
      marginTop: "5px"
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
    "& button": {
      minWidth: "150px",
      minHeight: "40px",
      height: "auto",
      backgroundColor: "#000",
      "& span:first-child": {
        color: "#fff",
        fontSize: "16px"
      }
    }
  },
  relative: {
    position: "relative"
  }
});
