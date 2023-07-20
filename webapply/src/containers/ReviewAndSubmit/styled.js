import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px"
  },
  packageSelectionWrapper: {
    padding: "30px",
    borderRadius: "10px",
    border: "1px solid #cccccc",
    margin: "40px 0"
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
    fontWeight: 600,
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
    gap: "10px",
    marginBottom: "8px",
    "& label": {
      color: "#757575",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
      width: "120px",
      minWidth: "120px"
    },
    "& p": {
      color: "#525252",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px",
      margin: 0
    }
  },
  eidField: {
    border: 0,
    background: "transparent",
    color: "#525252",
    margin: 0,
    padding: 0,
    fontSize: "0.875rem",
    fontStyle: "normal"
  },
  infoListWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1
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
  }
}));
