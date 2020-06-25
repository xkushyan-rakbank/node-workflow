import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  heading: {
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "block",
      marginBottom: 40,
      marginTop: 0,
      fontSize: 38,
      lineHeight: "46px",
      letterSpacing: "normal"
    }
  },
  rootTitle: {
    color: "#373737",
    fontWeight: "600",
    lineHeight: "1.33"
  },
  rootChangeViewContainer: {
    backgroundColor: "#fff",
    boxShadow: "0 5px 12px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "& button": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      borderRadius: "5px",
      width: 32,
      height: 32,
      padding: 0,
      "&.selected": {
        backgroundColor: "#000"
      },
      "&.selected svg path": {
        fill: "#ffffff"
      },
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  viewColumn: {
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    flexDirection: "column",
    marginTop: "40px",
    marginBottom: "40px",
    borderRadius: "8px",
    [theme.breakpoints.only("xs")]: {
      boxShadow: "none",
      marginTop: 0
    }
  },
  veiwRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "20px"
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    marginTop: "174px",
    [theme.breakpoints.only("sm")]: {
      marginTop: 100
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "80px"
    }
  }, //grid css start
  gridContainer: {
    flex: "0 0 50%",
    marginTop: "20px",
    flexBasis: "calc(100% / 2)",
    height: "263px",
    maxWidth: "49%"
  },
  containerBg: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 0
  },
  application: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0))",
    padding: "37px 20px 10px",
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  title: {
    wordBreak: "break-all",
    fontWeight: "600",
    color: "#263d4c",
    lineHeight: "1.7",
    zIndex: 1
  },
  account: {
    wordBreak: "break-all",
    color: "#86868b",
    zIndex: 1
  },
  status: {
    borderRadius: 4,
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "1px 5px",
    marginTop: 40,
    zIndex: 1
  },
  blockAction: {
    marginTop: 40,
    zIndex: "1"
  }, //list css start
  wrapper: {
    width: "100%",
    "&:not(:last-child)": {
      borderBottom: "1px solid #e6e6e6",
      [theme.breakpoints.only("xs")]: {
        borderBottom: "none"
      }
    },
    [theme.breakpoints.only("xs")]: {
      borderBottom: "none"
    }
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "24px 20px 19px 30px",
    [theme.breakpoints.only("xs")]: {
      height: "180px",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      padding: "40px",
      marginBottom: "10px",
      boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)"
    }
  },
  oneThirdWidth: {
    width: "33%",
    [theme.breakpoints.only("xs")]: {
      width: "auto"
    }
  },
  fullWidth: {
    width: "100%"
  },
  companyName: {
    wordBreak: "break-all",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#263d4c"
  },
  listAccount: {
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5
  },
  listStatus: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "12px",
    color: "#373737",
    padding: "3px 5px"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  },
  statusNotes: {
    color: "#b5b5bb",
    fontStyle: "italic"
  },
  companyNameSkeleton: {
    width: "210px",
    height: "50px",
    marginBottom: "2px",
    borderRadius: "8px"
  },
  listStatusSkeleton: {
    width: "100px",
    height: "30px",
    marginBottom: "0px",
    marginLeft: "200px",
    borderRadius: "8px"
  },
  statusNotesSkeleton: {
    width: "200px",
    height: "40px",
    marginBottom: "0px",
    marginLeft: "50px",
    borderRadius: "8px"
  },
  hint: {
    fontSize: 14,
    lineHeight: 1.14,
    color: "#b5b5bb",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  noRecordsIcon: {
    marginBottom: "-55px",
    width: "460px",
    alignSelf: "center"
  },
  noRecordsText: {
    marginTop: "60px",
    alignSelf: "center",
    boxSizing: "border-box",
    maxWidth: "609px",
    textAlign: "center",
    color: "#373737",
    fontSize: 20,
    lineHeight: 1.5
  }
}));
