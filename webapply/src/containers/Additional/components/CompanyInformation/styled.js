import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
    fontWeight: 400
  },
  amountText: {
    color: "#1F1F1F",
    fontSize: "12px",
    fontWeight: 600
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
  }
}));
