import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px"
  },
  questionareWrapper: {
    marginBottom: "20px",
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
    margin: 0,
    marginBottom: "16px"
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
  packageSelectionWrapper: {
    margin: "40px 0"
  },
  packageSelectionTitle: {
    marginBottom: "20px",
    "& h3": {
      color: "#1F1F1F",
      fontSize: "20px",
      fontWeight: 600,
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
  }
}));
