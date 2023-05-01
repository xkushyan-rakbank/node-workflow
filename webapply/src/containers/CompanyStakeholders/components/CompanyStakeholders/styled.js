import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  mainTitle: {
    fontSize: "28px",
    color: "#1F1F1F",
    lineHeight: "36px",
    fontWeight: 500,
    margin: 0,
    marginBottom: "8px",
    marginTop: "25px"
  },
  subTitle: {
    fontWeight: 400,
    fontSize: "20px",
    color: "#757575",
    margin: 0
  },
  buttonStyle: {
    width: "346px",
    height: "56px",
    borderRadius: "28px",
    textTransform: "none",
    fontSize: "18px",
    padding: "0 20px 0 32px",
    fontWeight: "normal",
    letterSpacing: "normal",
    justifyContent: "space-between"
  },
  buttonsWrapper: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    marginTop: "24px"
  },
  stakeholdersTitleWrapper: {
    margin: "60px 0",
    display: "flex",
    alignItems: "center"
  },
  stakeholderTitle: {
    marginLeft: "10px",
    fontSize: "14px"
  },
  iconSize: {
    width: "24px",
    height: "24px"
  },
  verifyMobileWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "24px",
    background: "#F7F8F9",
    borderRadius: "10px",
    marginBottom: "40px",
    marginTop: "16px",
    "@media (max-width: 425px)": {
      flexDirection: "column",
      padding: "24px 10px"
    }
  },
  descriptionWrapper: {
    display: "flex",
    alignItems: "center",
    "& div": {
      marginLeft: "24px",
      "& h6": {
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
        color: "#1F1F1F",
        margin: "0px",
        marginBottom: "4px"
      },
      "& p": {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0em",
        textAlign: "left",
        margin: "0px",
        color: "#757575"
      }
    }
  },
  verifyMobileIcon: {
    width: "18px",
    height: "22px",
    "@media (max-width: 425px)": {
      width: "40px",
      height: "44px"
    }
  },
  continueBtn: {
    height: "40px",
    width: "206px",
    borderRadius: "21px",
    border: "1px solid #1F1F1F",
    background: "transparent",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "22px",
    letterSpacing: "0px",
    textAlign: "center",
    color: "#1F1F1F",
    textTransform: "none",
    padding: "9px 24px",
    whiteSpace: "nowrap",
    "@media (max-width: 425px)": {
      marginTop: "24px"
    }
  },
  horizontalLine: {
    height: "1px",
    background: "#E6E6E6",
    margin: "40px 0"
  },
  uploadComponent: {
    marginTop: "24px"
  },
  ocrScannerMainContainer: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    [theme.breakpoints.only("xs")]: {
      minHeight: "calc(100vh - 10px)"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
}));
