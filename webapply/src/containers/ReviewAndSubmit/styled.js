import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px"
  },
  packageSelectionWrapper: {
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #cccccc",
    margin: "20px 0",
    [theme.breakpoints.up("lg")]: {
      padding: "30px",
      margin: "40px 0",
    }
  },
  accountServiceAccordionRoot: {
    borderTop: "none",
    minHeight: "40px!important"
  },
  accountServiceAccordionSummaryRoot: {
    minHeight: "40px!important"
  },
  accountServiceAccordionSummaryContent: {
    "& .accordionTitle": {
      "& .title": {
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "28px",
        color: "#000",
        alignItems: "self-end"
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
    paddingTop: "20px",
    marginTop: "16px",
    marginBottom: "0px",
    [theme.breakpoints.up("lg")]: {
      paddingTop: "30px"
    }
  },
  infoIcon: {
    width: "20px",
    height: "20px",
    color: "#757575",
    fontSize: "1.25rem"
  },
  infoSection: {
    display: "flex",
    padding: "15px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    alignSelf: "stretch",
    borderRadius: "15px",
    background: "#FAFAFA",
    marginBottom: "32px",
    "&:last-child": {
      marginBottom: "0px"
    }
  },
  bgColorChange: {
    background: "#F5F5F5"
  },
  infoSectionTitleWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  infoSectionTitle: {
    color: "#1F1F1F",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    margin: 0
  },
  divider: {
    height: "1px",
    background: "#E6E6E6",
    width: "100%"
  },
  infoWrapper: {
    width: "100%",
    display: "flex",
    gap: "16px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    }
  },
  infoLabelValue: {
    display: "flex",
    alignItems: "start",
    gap: "24px",
    "& label": {
      color: "#757575",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
      width: "190px",
      minWidth: "188px"
    },
    "& p": {
      color: "#525252",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px",
      margin: 0,
      wordBreak: "break-word"
    }
  },
  eidField: {
    border: 0,
    background: "transparent",
    color: "#525252",
    margin: 0,
    padding: 0,
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontFamily: "Open Sans",
    fontWeight: 600
  },
  infoListWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "8px"
  },
  iconWrapper: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    cursor: "pointer",
    "& span": {
      color: "#8D0C10",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px"
    }
  },
  disabledEditInfo: {
    opacity: "0.3",
    pointerEvents: "none"
  },
  noWrapText: {
    whiteSpace: "nowrap"
  },
  stakeholdersDetailWrapper: {
    paddingTop: "0px!important"
  },
  smallTitle: {
    color: "#1F1F1F",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "24px"
  }
}));
