import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px"
  },
  questionareWrapper: {
    marginBottom: "10px",
    "&:last-child": {
      marginBottom: "0px"
    }
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#1F1F1F",
    margin: 0
  },
  sectionLabelWithInfo: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "0px",
    "& span": {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      marginTop: "4px",
      color: "#757575"
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
  packageSelectionContainer: {
    marginTop: "40px"
  },
  packageSelectionWrapper: {
    padding: "30px",
    borderRadius: "10px",
    border: "1px solid #cccccc",
    margin: "40px 0"
  },
  packageSelectionTitle: {
    marginBottom: "20px",
    "& h3": {
      color: "#1F1F1F",
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "32px",
      margin: 0
    },
    "& p": {
      color: "#757575",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "28px",
      margin: 0
    }
  },
  packageList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "16px",
    padding: "40px 18px",
    paddingTop: "40px!important",
    paddingBottom: "40px!important",
    background: "rgba(245, 245, 245, 0.50)",
    "&:nth-child(2)": {
      background: "rgba(253, 231, 232, 0.60)"
    },
    "&:nth-child(3)": {
      background: "#FDE7E8"
    }
  },
  packageFeatureWrapper: {
    display: "table",
    textAlign: "center",
    padding: "22px 20px",
    paddingTop: "22px!important",
    paddingBottom: "22px!important",
    "&:first-child": {
      background: "rgba(245, 245, 245, 0.50)"
    },
    "&:nth-child(2)": {
      background: "rgba(253, 231, 232, 0.60)"
    },
    "&:nth-child(3)": {
      background: "#FDE7E8"
    }
  },
  selectedPackageList: {
    border: "2px solid #157947",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)"
  },
  packageListTitle: {
    "& h2": {
      color: "#830000",
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: "36px",
      margin: 0,
      marginBottom: 8
    },
    "& p": {
      color: "#1F1F1F",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "28px",
      margin: 0
    }
  },
  serviceList: {
    margin: 0,
    listStyle: "none",
    padding: 0,
    color: "#1F1F1F",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "28px",
    "& > li": {
      display: "flex",
      alignItems: "baseline"
    }
  },
  serviceListIcon: {
    marginRight: "16px",
    width: 16
  },
  serviceSubList: {
    paddingLeft: "16px",
    margin: "16px 0",
    listStyle: "disc",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "24px",
    color: "#757575"
  },
  selectBtn: {
    borderRadius: "100px",
    border: "1px solid #1F1F1F",
    outline: "none ",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "32px",
    textTransform: "none",
    padding: "10px 40px",
    textAlign: "center",
    color: "#3B3A3A",
    width: "80%",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#1F1F1F"
    }
  },
  selectBtnArrow: {
    width: "16px",
    height: "16px",
    marginLeft: "8px"
  },
  selectedPackageListBtn: {
    color: "#ffffff",
    backgroundColor: "#1F1F1F"
  },
  accountServiceAccordionRoot: {
    borderTop: "none"
  },
  accountServiceAccordionSummaryContent: {
    "& .accordionTitle": {
      "& .title": {
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "28px",
        color: "#000"
      }
    }
  },
  accordionSummaryContentExpanded: {
    "& .activePanel": {
      display: "none"
    },
    "& .accordionTitle": {
      paddingLeft: 0
    }
  },
  accordionDetails: {
    borderTop: "1px solid #E6E6E6",
    paddingTop: "30px",
    marginTop: "24px",
    marginBottom: "0px"
  },
  infoIcon: {
    width: "20px",
    height: "20px",
    color: "#757575",
    fontSize: "1.25rem"
  },
  headerWithHelperIcon: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  packagefeatureTitle: {
    color: "#8D0C10",
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: "32px",
    margin: "18px 25px"
  },
  featureDesc: {
    color: "#1F1F1F",
    textAlign: "left",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: "24px",
    margin: 0
  },
  featureValues: {
    color: "#1F1F1F",
    display: "table-cell",
    verticalAlign: "middle",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "24px",
    margin: 0
  },
  featureValueIcon: {
    display: "table-cell",
    verticalAlign: "middle",
    "& img": {
      width: "24px",
      height: "24px"
    }
  },
  generalDetailsGrid: {
    marginTop: 0,
    marginBottom: 0
  },
  verificationDetailsWrapper: {
    padding: "20px 10px",
    borderRadius: "10px",
    border: "1px solid #CCC",
    marginBottom: "8px",
    marginTop: "18px"
  },
  verificationDetailsGrid: {
    width: "100%",
    margin: "0 auto"
  },
  verificationDetailsInfoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "16px",
    color: "#757575"
  },
  verifyDetailInfoIcon: {
    width: "16px",
    height: "16px",
    fill: "#757575"
  },
  addMoreButton: {
    border: "1px solid #1F1F1F",
    borderRadius: "21px",
    padding: "9px 24px",
    color: "#1F1F1F",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22px",
    textTransform: "none",
    width: "max-content",
    margin: "24px 0"
  },
  textAreaRoot: {
    marginBottom: 0
  },
  title: {
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "28px",
    color: "#000",
    margin: 0,
    marginBottom: "30px"
  },
  kycSection: {
    marginTop: "32px"
  },
  rmVerificationRemarksTextarea: {
    margin: "24px 0"
  },
  addMoreKycButtonWrapper: {
    textAlign: "right",
    margin: "5px 0"
  },
  outsideLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    color: "#1F1F1F"
  },
  inputWithoutLabel: {
    padding: "20px 12px"
  },
  helperIcon: {
    color: "#525252",
    width: "20px",
    height: "20px"
  },
  roCodeWrapper: {
    marginTop: "0px",
    "& > div": {
      marginBottom: "15px"
    }
  },
  roCodeFormControl: {
    margin: 0,
    marginTop: "8px"
  }
}));
