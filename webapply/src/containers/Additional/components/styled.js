import { makeStyles } from "@material-ui/core/styles";
import { contentWidth } from "../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px"
  },
  section: {
    padding: "20px 10px",
    borderRadius: "10px",
    [theme.breakpoints.up("sm")]: {
      border: "unset",
      padding: "unset",
      borderRadius: "unset",
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.between("sm", "md")]: {
        "@media (orientation: portrait)": {
          width: "unset"
        }
      }
    }
  },
  additionalSelectionButton: {
    boxSizing: "border-box",
    padding: "16px",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: contentWidth,
      padding: "24px",
      flexDirection: "row",
    },
    border: "1px solid #CCCCCC",
    background: "#FFFFFF",
    borderRadius: "10px",
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.between("sm", "md")]: {
      "@media (orientation: portrait)": {
        width: "unset"
      }
    }
  },
  additionalbtnSelected: {
    "&:hover": {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
    },
    cursor: "pointer"
  },
  buttonText: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: 450
    }
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    [theme.breakpoints.only("xs")]: {
      fontSize: 14,
      width: "50%"
    }
  },
  subTitle: {
    marginTop: 3,
    fontWeight: 400,
    fontSize: 16,
    color: theme.palette.text.secondary,
    [theme.breakpoints.only("xs")]: {
      fontSize: 10
    }
  },
  btnContainer: {
    // marginTop: "60px"
  },
  actionButton: {
    width: "auto",
    minWidth: "69px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "normal",
    padding: "8px",
    lineHeight: "1rem",
    [theme.breakpoints.up("sm")]: {
      lineHeight: "unset",
      height: "45px",
    }
  },
  btnAdd: {
    background: "#E6E6E6",
    color: "#332600",
    marginRight: "16px"
  },
  buttonWrap: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    [theme.breakpoints.up("sm")]: {
      alignSelf: "unset",
      position: "unset",
    }
  },
  completedWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "32px",
    borderRadius: "10px",
    fontSize: "12px",
    marginRight: "16px"
  },
  success: {
    display: "flex",
    background: "#ECF9F2",
    color: "#157947",
    minWidth: "50px",
    padding: "2px 5px",
    borderRadius: "10px",
    alignItems: "center",
    gap: "4px",
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
      minWidth: "98px",
      padding: "8px"
    }
  },
  incompleted: {
    display: "flex",
    background: "#E6E6E6",
    color: "#332600",
    width: "auto",
    minWidth: "69px",
    padding: "2px 5px", 
    borderRadius: "10px",
    alignItems: "center",
    gap: "4px",
    fontWeight: 500,
    [theme.breakpoints.up("sm")]:{
      padding: "8px",
    }
  },
  additionalCompanyInfoContainer: {
    marginTop: "25px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    fontSize: "12px",
    color: "#757575",
    fontWeight: 400,
    lineHeight: "16px",
    borderRadius: "10px",
    border: "1px solid #E6E6E6",
    marginTop: "15px"
  },
  infoIcon: {
    fill: "#757575",
    height: "16px",
    width: "16px",
    marginRight: "8px"
  },
  companyNameinfoContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "28px",
    textAlign: "left",
    marginBottom: "24px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
      lineHeight: "24px"
    }
  },
  companyInfoDetailWrapper: {
    borderRadius: "10px",
    padding: "24px",
    border: "1px solid #E6E6E6"
  },
  sectionLabel: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#1F1F1F",
    margin: 0,
    marginBottom: "16px"
  },
  boldLabel: {
    fontWeight: 500
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
    marginTop: "10px"
  },
  removeButton: {
    // position: "absolute",
    right: "5px",
    bottom: "5px",
    marginTop: "5px",
    padding: 0
  },
  percentageText: {
    color: "#1F1F1F",
    fontSize: "12px",
    fontWeight: 400,
    marginRight: "2px"
  },
  amountText: {
    color: "#1F1F1F",
    fontSize: "12px",
    fontWeight: 600,
    marginLeft: "6px"
  },
  definitionLink: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
    textDecoration: "underline",
    color: "#000000",
    marginRight: "18px",
    "&:hover": {
      textDecoration: "underline"
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
  activePassiveDesc: {
    color: "#757575",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px"
  },
  taxDeclarationQuestionare: {
    marginTop: "30px"
  },
  virtualOrPhysicalAddressSelection: {
    borderRadius: "10px",
    marginTop: "16px",
    marginBottom: "16px"
  },
  customLabel: {
    margin: "18px 0 10px",
    [theme.breakpoints.up("sm")]: {
      margin: "12px 0 10px"
    }
  },
  customUrlLabel: {
    margin: "0px"
  },
  supplierSection: {
    marginTop: "40px"
  },
  sectionLabelWithInfo: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
    "& span": {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      marginTop: "4px",
      color: "#757575"
    }
  },
  orSelection: {
    display: "block",
    overflow: "hidden",
    textAlign: "center",
    color: "#9D9D9D",
    fontWeight: 700,
    fontSize: "12px",
    margin: "30px 0",
    "&::after, &::before": {
      backgroundColor: "#C4C4C4",
      content: "''",
      display: "inline-block",
      height: "1px",
      position: "relative",
      verticalAlign: "middle",
      width: "50px"
    },

    "&::before": {
      right: "16px"
    },

    "&::after": {
      left: "16px"
    }
  },
  horizontalLine: {
    height: "1px",
    background: "#E6E6E6",
    margin: "30px 0"
  },
  anotherCountryTaxOption: {
    flexDirection: "column"
  },
  uploadModalErrorWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    marginTop: "16px",
    marginBottom: "10px",
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
  textAreaStyle: {
    borderRadius: 0,
    paddingTop: "10px",
    height: "200px",
    maxWidth: "100%"
  },

  sliderContainer: {
    padding: "0px 15px",
    display: "flex",
    flexDirection: "column"
  },
  slideValuePrice: {
    position: "relative"
  },
  helperIcon: {
    color: "#525252",
    width: "20px",
    height: "20px"
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    [theme.breakpoints.only("xs")]: {
      gap: "20px"
    },
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      gap: "8px"
    }
  },
  inProgress: {
    background: "#E6E6E6",
    color: "##332600",
    minWidth: "98px"
  },
  additionalInfoAccordionSummaryContent: {
    "& .accordionTitle": {
      "& .title": {
        fontWeight: 400
      }
    }
  },
  additionalInfoAccordionSummaryContentExpanded: {
    "& .accordionTitle": {
      paddingLeft: 0,
      "& .title": {
        fontWeight: 500
      }
    },
    "& .activePanel": {
      display: "none!important"
    }
  },
  descritionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  description: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    color: "#757575",
    width: "100%",
    textAlign: "left",

    [theme.breakpoints.up("sm")]: {
      whiteSpace: "break-spaces"
    }
  },
  descriptionSubField: {
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    color: "#757575",
    position: "relative",
    textAlign: "left",
    bottom: "15px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px"
    }
  },
  proofOfIncomePoints: {
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    color: "#757575",
    marginBottom: "24px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px"
    }
  },
  financialDescription: {
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    margin: 0,
    color: "#757575",
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px"
    }
  },
  virtualOrPhysicalContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",

    "& .MuiIconButton-label": {
      width: "24px",
      height: "24px",
      borderRadius: "4px",
      // border: "1px solid #1F1F1F"
      color: "#1F1F1F"
    }
  },
  virtualOfficeLabel: {
    fontSize: "14px",
    fontStyle: "normal",
    color: "#000",
    fontWeight: 500,
    lineHeight: "20px"
  },
  noteWrapper: {
    alignItems: "start !important",
    "& svg": {
      marginTop: "5px",
      fill: "#757575",
      width: "14px",
      height: "14px"
    },
  }
}));
