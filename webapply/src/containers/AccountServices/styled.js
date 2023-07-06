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
    padding: "30px",
    borderRadius: "10px",
    border: "1px solid #cccccc",
    margin: "40px 0"
  },
  packageSelectionTitle: {
    paddingBottom: "24px",
    marginBottom: "16px",
    borderBottom: "1px solid #E6E6E6",
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
  packageListWrapper: {
    display: "flex",
    gap: 16,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  packageList: {
    padding: "40px 24px",
    borderRadius: "10px",
    background: "#F7F8F9"
  },
  packageListTitle: {
    paddingBottom: "24px",
    marginBottom: "24px",
    borderBottom: "1px solid #E6E6E6",
    "& h2": {
      color: "#1F1F1F",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "36px",
      margin: 0,
      marginBottom: 4
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
    fontSize: "16px",
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
    fontWeight: 400,
    lineHeight: "32px",
    textTransform: "none",
    padding: "10px 40px",
    textAlign: "center",
    color: "#3B3A3A",
    width: "80%",
    margin: "32px 40px 0",
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
    paddingTop: "30px",
    marginTop: "24px",
    marginBottom: "0px"
  }
}));
