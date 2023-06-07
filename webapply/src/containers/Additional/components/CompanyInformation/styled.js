import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  additionalCompanyInfoContainer: {
    marginTop: "25px"
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
  financialTurnOverSliderInfo: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "10px",
    background: "#F5F5F5",
    "& svg": {
      fill: "#757575"
    },
    "& span": {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#525252",
      marginLeft: "8px"
    }
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
  }
}));
