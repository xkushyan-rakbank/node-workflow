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
  }
}));
