import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  landingAccordionRoot: {
    borderTop: "none",
    borderBottom: "1px solid #C4C4C4",
    paddingTop: "10px",
    paddingBottom: "10px",
    "&$expanded": {
      marginBottom: "24px"
    },
    [theme.breakpoints.only("sm", "md")]: {
      paddingTop: "0px",
      paddingBottom: "0px"
    }
  },
  landingAccordionSummaryContent: {
    "& .accordionTitle": {
      "& .title": {
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: "36px",
        color: "#1F1F1F",
        fontStyle: "normal",
        [theme.breakpoints.between("sm", "lg")]: {
          fontSize: "1.5rem"
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "1.75rem"
        }
      }
    }
  },
  landingAccordionExpandedRoot: {
    paddingBottom: "24px"
  },
  landingAccordionSummaryContentExpanded: {
    "& .activePanel": {
      display: "none"
    },
    "& .accordionTitle": {
      paddingLeft: 0
    }
  },
  accordionDetails: {
    paddingTop: "0px",
    marginTop: "0px",
    marginBottom: "0px"
  },
  expandIcon: {
    fill: "#000000",
    width: "20px",
    height: "10px",
    "& svg": {
      fill: "#000000"
    }
  },
  subTitle: {
    color: "#555",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "28px",
    marginBottom: "24px 0",
    [theme.breakpoints.between("sm", "lg")]: {
      fontSize: "1.125rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem"
    }
  },
  noborder: {
    borderBottom: 0
  }
}));
