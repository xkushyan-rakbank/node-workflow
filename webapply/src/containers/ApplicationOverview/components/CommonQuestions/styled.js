import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "550px",
    boxShadow: "none",
    borderRadius: "20px",
    border: "2px solid #E9E9E9",
    marginBottom: "24px",
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      marginBottom: "24px"
    },
    [theme.breakpoints.only("xs")]: {
      minWidth: "100%"
    }
  },
  expanded: {},
  summaryRoot: {
    minHeight: 60,
    "&$expanded": {
      minHeight: 60
    },
    [theme.breakpoints.only("xs")]: {
      padding: "8px 16px"
    }
  },
  summaryContent: {
    width: "calc(100% - 100px)",
    overflow: "hidden",
    "&$expanded": {
      margin: "12px 0"
    }
  },
  detailsRoot: {
    padding: "16px",
    borderTop: "1px solid rgba(239, 242, 244, .5)",
    borderBottom: "1px solid rgba(239, 242, 244, .5)",
    fontSize: 16
  },
  iconSize: {
    width: "20px",
    height: "10px"
  },
  iconStyle: {
    position: "relative",
    top: "4px",
    marginRight: "20px"
  },
  text: {
    color: "#1F1F1F",
    fontWeight: 400,
    paddingBottom: "5px",
    fontSize: "0.875rem",
    [theme.breakpoints.only("xs")]: {
      paddingBottom: 0
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem"
    }
  },
  textEllipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    [theme.breakpoints.only("xs")]: {
      whiteSpace: "normal",
      "& svg": {
        display: "none"
      }
    }
  },
  info: {
    paddingLeft: 10,
    whiteSpace: "pre-line",
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0
    },
    "& a": {
      color: "rgba(0, 0, 0, 0.87)",
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none"
      }
    }
  }
}));
