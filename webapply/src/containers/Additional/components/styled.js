import { makeStyles } from "@material-ui/core/styles";
import { contentWidth } from "../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px"
  },
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  additionalSelectionButton: {
    boxSizing: "border-box",
    [theme.breakpoints.up("sm")]: {
      width: contentWidth
    },
    border: "1px solid #CCCCCC",
    background: "#FFFFFF",
    borderRadius: "10px",
    marginTop: "24px",
    display: "flex",
    flexDirection: "row",
    padding: "24px",
    alignItems: "center",
    justifyContent: "space-between"
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
    fontWeight: 600,
    [theme.breakpoints.only("xs")]: {
      fontSize: 16
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
    marginTop: "60px"
  },
  actionButton: {
    width: "105px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 500,
    padding: 20,
    letterSpacing: "normal"
  },
  btnAdd: {
    background: "#FFFFFF",
    color: "#1F1F1F",
    marginRight: "16px"
  },
  buttonWrap: {
    display: "flex",
    alignItems: "center"
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
    background: "#ECF9F2",
    color: "#157947",
    minWidth: "98px"
  },
  incompleted: {
    background: "#FDE7E8",
    color: "#8D0C10",
    minWidth: "99px"
  },
  additionalCompanyInfoContainer: {
    marginTop: "25px",
    [theme.breakpoints.up("ls")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "95vh"
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
    [theme.breakpoints.up("ls")]: {
      fontSize: "20px",
      lineHeight: "24px"
    }
  },
  companyInfoDetailWrapper: {
    marginTop: "40px",
    borderRadius: "10px",
    padding: "24px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
  },
  sectionLabel: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#1F1F1F",
    margin: 0,
    marginBottom: "16px"
  },
  addMoreButton: {
    border: "1px solid #1F1F1F",
    borderRadius: "21px",
    padding: "9px 24px",
    color: "#1F1F1F",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    textTransform: "none",
    width: "max-content"
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
    marginRight: "6px"
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
    padding: "1px 24px",
    background: "#F4F8FC",
    borderRadius: "10px",
    marginTop: "16px",
    marginBottom: "16px"
  },
  customLabel: {
    margin: "12px 0 10px"
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
    marginBottom: "0px",
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
  }
}));
