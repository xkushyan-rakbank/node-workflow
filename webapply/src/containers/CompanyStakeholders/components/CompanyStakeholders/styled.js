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
  },
  paper: {
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    width: "710px",
    borderRadius: "20px",
    textAlign: "left",
    padding: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.only("sm")]: {
      width: "70%"
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
      overflowY: "scroll",
      height: "auto"
    }
  },
  uploadModalErrorWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "16px 38px",
    marginTop: "8px",
    marginBottom: "24px",
    color: "#8D0C10",
    background: "#FDE7E8",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "10px"
  },
  errorIcon: {
    width: "13px",
    height: "13px",
    marginRight: "8px"
  },
  uploadModalCloseIcon: {
    position: "absolute",
    right: "18px",
    top: "20px",
    width: "16px",
    height: "16px",
    fill: "#525252",
    PointerEvent: "cursor",
    [theme.breakpoints.down("xs")]: {
      top: "50px"
    }
  },
  uploadModalTitle: {
    margin: "0px",
    marginBottom: "24px"
  },
  uploadModalSaveBtn: {
    marginTop: "40px",
    padding: "20px 40px",
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "32px",
    color: "#FFFFFF",
    background: "#1F1F1F",
    borderRadius: "100px",
    textTransform: "capitalize",
    "&:disabled": {
      color: "#FFFFFF",
      background: "#ADADAD"
    }
  },
  previewModalImageWrapper: {
    height: "min(580px, 70vh)",
    overflow: "auto"
  },
  previewImg: {
    width: "100%",
    height: "min(400px, 50vh)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    background: "#D9D9D9"
  },
  previewPDF: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%"
  },
  previewModalTitle: {
    color: "#1F1F1F",
    fontWeight: 500,
    fontSize: "28px",
    lineHeight: "36px",
    margin: "0px",
    textAlign: "left"
  },
  previewModalSubtitle: {
    margin: "0px",
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "28px",
    textAlign: "left",
    color: "#757575"
  },
  previewImgWrapper: {
    marginTop: "24px"
  },
  "mb-40": {
    marginBottom: "40px"
  },
  completedScanInfoWrapper: {
    background: "#ECF9F2",
    fontWeight: 500,
    fontSize: "14px",
    color: "#157947",
    padding: "16px",
    borderRadius: "10px",
    marginTop: "35px",
    "& span": {
      marginLeft: "10px"
    }
  },
  kfsSubTitle: {
    fontWeight: 400,
    fontSize: "20px",
    color: "#757575",
    margin: 0,
    marginBottom: "40px"
  },
  descriptionContent: {
    background: "#FFFFFF",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    marginBottom: "20px",
    border: "1px solid #E6E6E6"
  },
  kfsDescriptionContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  readBtn: {
    height: "40px",
    width: "124px",
    borderRadius: "21px",
    border: "1px solid #1F1F1F",
    background: "transparent",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "22px",
    letterSpacing: "0px",
    color: "#1F1F1F",
    textTransform: "none",
    padding: "9px 24px",
    marginTop: "20px"
  },
  readAcceptBtn: {
    height: "40px",
    width: "206px",
    borderRadius: "21px",
    background: "#1F1F1F",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "22px",
    letterSpacing: "0px",
    color: "#FFFFFF",
    textTransform: "none",
    padding: "9px 24px",
    marginTop: "20px",
    "&:hover": {
      color: "#000"
    }
  },
  completedWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "32px",
    minWidth: "98px",
    background: "#ECF9F2",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#157947"
  },
  notAcceptWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "32px",
    minWidth: "98px",
    background: "#FDE7E8",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#8D0C10"
  },
  kfsTitle: {
    margin: "0px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#1F1F1F"
  },
  authorisationsList: {
    paddingLeft: "24px",
    fontWeight: "400",
    fontSize: "14px",
    margin: "0px",
    color: "#757575",
    "& li": {
      marginBottom: "4px"
    }
  },
  qrCode: {
    width: "200px",
    height: "200px",
    lineHeight: "200px",
    backgroundColor: "#fff",
    marginTop: "20px 0px 14px",
    "& img": {
      lineHeight: "15px"
    }
  },
  qrScanInstructions: {
    padding: "24px",
    border: "1px solid #BCBDC0",
    borderRadius: "12px",
    margin: "40px 0",
    "& ol": {
      margin: "0px",
      padding: "0px",
      paddingLeft: "24px"
    },
    "& li": {
      fontSize: "14px",
      fontWeight: 400,
      color: "#1F1F1F",
      lineHeight: "20px",
      marginBottom: "4px"
    }
  },
  getHelpLink: {
    color: "#8D0C10",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    textDecoration: "none"
  },
  linkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between"
    },
    marginTop: "42px",
    marginBottom: "42px",
    "& > div": {
      width: "auto",
      margin: "0"
    }
  },
  btnWrapper: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  disclaimerInfo: {
    marginTop: "8px",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#757575"
  },
  progressIcon: {
    position: "relative",
    height: "60px",
    marginBottom: "40px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bottom: {
    color: "rgba(147, 147, 147, 0.1)",
    position: "absolute"
  },
  top: {
    color: "#848484",
    animationDuration: "550ms",
    position: "absolute"
  },
  circle: {
    strokeLinecap: "round"
  }
}));
