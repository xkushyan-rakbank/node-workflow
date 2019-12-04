import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
    flexDirection: "column",
    marginTop: "45px"
  },
  veiwRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridColumnGap: 20,
    gridRowGap: 20,
    marginTop: "45px"
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    marginTop: "174px"
  }, //grid css start
  gridContainer: {
    flex: "0 0 50%",
    height: "263px"
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
    fontWeight: "600",
    color: "#263d4c",
    lineHeight: "1.7",
    zIndex: 1
  },
  account: {
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
    marginBottom: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    width: "100%"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    padding: "24px 20px 19px 30px"
  },
  companyName: {
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
  }
});
