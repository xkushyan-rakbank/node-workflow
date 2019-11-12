const style = {
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
    padding: "3px 0",
    width: "120px",
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
      padding: "0 5px 0 0",
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
  }
};

export default style;
