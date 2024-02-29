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
      flexDirection: "row"
    }
  },
  packageSelectionContainer: {
    marginTop: "40px"
  },
  packageSelectionWrapper: {
    padding: "0px",
    borderRadius: "10px",
    border: "unset",
    margin: "40px 0",
    [theme.breakpoints.up("sm")]: {
      padding: "30px",
      border: "1px solid #cccccc"
    }
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
    padding: "15px 0px",
    paddingTop: "15px!important",
    paddingBottom: "15px!important",
    background: "rgba(245, 245, 245, 0.50)",
    [theme.breakpoints.up("sm")]: {
      padding: "40px 18px",
      paddingTop: "40px!important",
      paddingBottom: "40px!important"
    },
    "&:nth-child(1)": {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    "&:nth-child(2)": {
      background: "rgba(252, 232, 233, 0.20)",
      [theme.breakpoints.up("sm")]: {
        background: "rgba(253, 231, 232, 0.60)"
      }
    },
    "&:nth-child(3)": {
      background: "rgba(253, 231, 232, 0.60)",
      width: "50%",
      [theme.breakpoints.up("sm")]: {
        background: "#FDE7E8",
        width: "unset"
      }
    }
  },
  packageFeatureWrapper: {
    display: "table",
    textAlign: "center",
    padding: "18px 11px",
    paddingTop: "22px !important",
    paddingBottom: "20px !important",
    width: "33.33%",
    tableLayout: "fixed",
    [theme.breakpoints.between("sm", "md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "18px 17px"
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "0px !important",
      paddingBottom: "20px !important"
    },
    "&:first-child": {
      background: "rgba(245, 245, 245, 0.50)",
      textAlign: "left",
      [theme.breakpoints.up("sm")]: {
        alignItems: "left"
      }
    },
    "&:nth-child(2)": {
      background: "rgba(253, 231, 232, 0.60)"
    },
    "&:nth-child(3)": {
      background: "#FDE7E8"
    },
    [theme.breakpoints.up("sm")]: {
      width: "unset",
      padding: "22px 20px"
    }
  },
  selectedPackageList: {
    border: "2px solid #157947",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)"
  },
  packageListTitle: {
    "& h2": {
      color: "#830000",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "20px",
      margin: 0,
      marginBottom: 8,
      [theme.breakpoints.up("sm")]: {
        color: "#830000",
        fontSize: "1.75rem",
        fontWeight: 500,
        lineHeight: "36px",
        margin: 0,
        marginBottom: 8
      }
    },
    "& p": {
      color: "#1F1F1F",
      fontSize: "14px",
      textAlign: "left",
      fontWeight: 500,
      lineHeight: "1.5rem",
      margin: 0,
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
        textAlign: "unset",
        fontWeight: 400,
        lineHeight: "28px",
        margin: 0
      }
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
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    textTransform: "none",
    padding: "15px 16px",
    textAlign: "center",
    color: "#3B3A3A",
    width: "75%",
    [theme.breakpoints.up("sm")]: {
      background: "unset",
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
        backgroundColor: "#1F1F1F",
        width: "75%",
        [theme.breakpoints.up("sm")]: {
          width: "80%"
        }
      }
    }
  },
  selectBtnArrow: {
    width: "16px",
    height: "16px",
    marginLeft: "8px"
  },
  selectedPackageListBtn: {
    color: "#ffffff",
    backgroundColor: "#1F1F1F",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#1F1F1F"
    }
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
    marginTop: "24px",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    marginBottom: "0px",
    [theme.breakpoints.up("sm")]: {
      paddingTop: "30px",
      paddingBottom: "unset"
    }
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
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "22px",
    margin: "18px 0px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      // margin: "unset",
      marginTop: "10px"
    }
  },
  featureDesc: {
    color: "#1F1F1F",
    textAlign: "left",
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "16px",
    margin: 0,
    width: "100px",
    whiteSpace: "break-spaces",
    display: "inline",
    [theme.breakpoints.up("sm")]: {
      color: "#1F1F1F",
      whiteSpace: "unset",
      textAlign: "left",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "24px",
      margin: 0,
      width: "unset"
    }
  },
  featureValues: {
    color: "#1F1F1F",
    display: "table-cell",
    verticalAlign: "middle",
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "20px",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "24px"
    }
  },
  featureValueIcon: {
    display: "table-cell",
    verticalAlign: "middle",
    "& img": {
      width: "24px",
      height: "24px",
      paddingTop: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        paddingTop: "unset",
        paddingBottom: "unset"
      }
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
  textAreaStyle: {
    height: "100px",
    [theme.breakpoints.up("sm")]: {
      height: "150px"
    }
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
  },

  packageListWrapper: {
    display: "flex",
    flexDirection: "row",

    "& > div:first-child": {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      "& > div:first-child": {
        display: "block"
      }
    }
  },
  accordionTitle: {
    color: "#8D0C10",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "28px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px"
    }
  },
  disclaimer: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "0.95rem",
    color: "#3B3A3A",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
      lineHeight: "0.85rem"
    }
  },
  noteWrapper: {
    marginTop: "16px",
    alignItems: "start !important",
    "& svg": {
      marginTop: "5px",
      fill: "#757575",
      width: "14px",
      height: "14px"
    }
  },
  debitCardWrapper: {
    padding: "10px 0px"
  },
  priceGuideInfo: {
    color: "#847F7F",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1rem"
  },
  priceGuideLink: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "22px",
    textDecoration: "underline",
    color: "#8D0C10",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  accountCurrenciesWrapper: {
    margin: "10px 0px 30px 5px"
  },
  flagIconStyle: {
    borderRadius: "50%",
    width: "1.5rem",
    height: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      width: "1.625rem",
      height: "1.625rem"
    }
  },
  rootCheckbox: {
    marginRight: "0px"
  },
  checkboxFormControlRoot: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "flex-start"
  },
  accountCurrenciesLabel: {
    fontWeight: 500
  },
  currencyWrapper: {
    display: "flex",
    alignItems: "center",
    color: "#1F1F1F",
    fontSize: "0.875rem",
    fontWeight: 500,
    gap: "0.5rem"
  },
  currencyExtraInfoLabel: {
    color: "#ADADAD",
    fontSize: "0.75rem",
    fontWeight: 400
  },
  defaultCurrencyLabel: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1rem"
  }
}));
