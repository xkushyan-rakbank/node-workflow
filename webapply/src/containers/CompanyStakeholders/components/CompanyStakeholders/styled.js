import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  mainTitle: {
    fontSize: "24px",
    color: "#1F1F1F",
    lineHeight: "28px",
    fontWeight: 500,
    margin: 0,
    marginBottom: "8px",
    marginTop: "25px"
  },
  subTitle: {
    fontWeight: 400,
    fontSize: "1.25rem",
    color: "#757575",
    lineHeight: "1.75rem",
    fontFamily: "DM Sans",
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
    gap: "24px",
    padding: "24px",
    background: "#F7F8F9",
    borderRadius: "10px",
    marginTop: "16px",
    justifyContent: "space-between",
    "@media (max-width: 425px)": {
      flexDirection: "column",
      padding: "24px 10px"
    }
  },
  descriptionWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    "& div": {
      "& h6": {
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
        color: "#1F1F1F",
        margin: "0px",
        marginBottom: "4px",
        marginRight: "auto"
      },
      "& p": {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0em",
        textAlign: "left",
        margin: "0px",
        color: "#1F1F1F"
      }
    }
  },
  verifyMobileIcon: {
    width: "72px",
    height: "72px",
    "@media (max-width: 425px)": {
      width: "40px",
      height: "44px"
    }
  },
  continueBtn: {
    height: "40px",
    minWidth: "206px",
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
    maxHeight: "calc(100% - 70px)",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      padding: "32px",
      overflowX: "clip"
    },
    [theme.breakpoints.only("md")]: {
      width: "70%"
    }
  },
  uploadModalErrorWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "16px 16px",
    marginTop: "8px",
    marginBottom: "24px",
    color: "#8D0C10",
    background: "#FDE7E8",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "10px",
    fontStyle: "normal"
  },
  errorIcon: {
    width: "15px",
    height: "15px",
    marginRight: "8px"
  },
  uploadModalCloseIcon: {
    position: "absolute",
    right: "18px",
    top: "16px",
    width: "24px",
    height: "24px",
    fill: "#525252",
    PointerEvent: "cursor",
    [theme.breakpoints.down("xs")]: {
      top: "16px",
      width: "24px",
      height: "24px",
      right: "9.214px"
    }
  },
  uploadModalTitle: {
    color: "#1F1F1F",
    margin: "0px",
    marginBottom: "18px",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
      lineHeight: "36px",
      marginBottom: "24px"
    }
  },
  uploadModalSaveBtn: {
    marginTop: "40px",
    padding: "20px 40px",
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "32px",
    color: "#FFFFFF",
    width: "130px",
    height: "56px",
    background: "#1F1F1F",
    borderRadius: "28px",
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
    height: "min(250px, 35vh)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    objectFit: "contain",
    background: "#D9D9D9",
    [theme.breakpoints.up("sm")]: {
      height: "min(400px, 50vh)"
    }
  },
  previewPDF: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%"
  },
  previewModalTitle: {
    color: "#1F1F1F",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0px",
    textAlign: "left",
    [theme.breakpoints.up("sm")]: {
      fontSize: "28px",
      lineHeight: "36px"
    }
  },
  previewModalSubtitle: {
    margin: "0px",
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "18px",
    textAlign: "left",
    color: "#757575",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
      lineHeight: "28px"
    }
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
    width: "170px",
    height: "170px",
    lineHeight: "200px",
    backgroundColor: "#fff",
    margin: "20px 0px 14px",
    "& img": {
      lineHeight: "15px"
    },
    [theme.breakpoints.down("md")]: {
      margin: "10px 0"
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
    },
    [theme.breakpoints.down("md")]: {
      margin: "25px 0",
      padding: "18px"
    }
  },
  getHelpLink: {
    color: "#8D0C10",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    textDecoration: "none"
  },
  linkContainer1: {
    position: "fixed",
    zIndex: 1,
    bottom: "0px",
    left: "0px",
    right: "0px",
    margin: "0px",
    padding: "14px 82px 14px 0px",
    background: "#FFF",
    boxShadow: " 0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "24px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
      paddingLeft: "10px",
      paddingRight: "10px"
    },
    [theme.breakpoints.only("sm")]: {
      paddingLeft: "10px",
      paddingRight: "10px"
    },
    "& > div": {
      width: "auto",
      margin: "0"
    }
  },
  btnWrapper: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    },
    "& .MuiButton-label": {
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "24px"
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
  },
  companyStakeholdersWrapper: {
    display: "flex",
    padding: "30px",
    flexDirection: "column",
    gap: "32px",
    borderRadius: "10px",
    border: "1px solid #CCC",
    marginTop: "40px"
  },
  stakeholderContainer: {
    paddingTop: "0!important"
  },
  helperIcon: {
    color: "#525252",
    width: "16px",
    height: "16px",
    paddingBottom: "2px"
  },
  moveToMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "math-auto",
  },
  reviewDetails: {
    display: "flex",
    padding: "1rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
    borderRadius: "0.5rem",
    background: "#FAFAFA",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]:{
      flexWrap: "unset",
    }
  },
  reviewDetailsTitle: {
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1.5rem",
    margin: 0
  },
  infoLabelValue: {
    display: "flex",
    alignItems: "start",
    gap: "0px",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      gap: "24px",
      justifyContent: "unset"
    },
    "& label": {
      color: "#757575",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
      width: "120px",
      minWidth: "auto",
      [theme.breakpoints.up("sm")]: {
        minWidth: "188px",
        width: "190px",
      }
    },
    "& p": {
      color: "#525252",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px",
      margin: 0,
      wordBreak: "break-word",
      whiteSpace: "pre-line",
      flex: 1,
      flexBasis: "fit-content",
      minWidth: "auto",
      [theme.breakpoints.up("sm")]: {
        whiteSpace: "unset",
        flex: "unset",
        flexBasis: "unset",
      }
    }
  },
  radioButtonRoot: {
    border: "1px solid #cccccc",
    borderRadius: "50px",
    marginTop: "10px",
    marginLeft: 0
  },
  radioLabelRoot: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    paddingRight: "15px"
  },
  radioConatiner: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  informationQuestion: {
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1.5rem"
  },
  reviewRemarks: {
    color: "#757575",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.5rem"
  },
  informationGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
    alignSelf: "stretch"
  },
  actionButton: {
    minWidth: "105px",
    height: "40px",
    borderRadius: "1.3125rem",
    textTransform: "math-auto",
    fontSize: "14px",
    fontWeight: 500,
    background: "#1F1F1F",
    color: "#FFFFFF",
    letterSpacing: "normal",
    whiteSpace: "nowrap",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.56rem",
    paddingBottom: "0.69rem",
    width: "200px",
    "&:hover": {
      background: "#1F1F1F",
      color: "#FFFFFF"
    },
    "&:focus": {
      background: "#1F1F1F",
      color: "#FFFFFF"
    },
    "&:disabled": {
      background: "#CCCCCC",
      color: "#666666",
      cursor: "not-allowed"
    }
  },
  horizontalLine: {
    height: "1px",
    background: "#E6E6E6",
    margin: "24px 0"
  },
  stakeHolderPreviewHorizontal: {
    backgroundColor: "#E6E6E6",
    height: "1px",
    width: "100%"
  },
}));
