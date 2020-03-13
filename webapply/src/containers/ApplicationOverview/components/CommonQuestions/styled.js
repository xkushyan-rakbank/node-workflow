import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "550px",
    border: "none",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:nth-child(odd)": {
      backgroundColor: "rgba(239, 242, 244, .5)"
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
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
    fontSize: "16px",
    backgroundColor: "#fff"
  },
  iconSize: {
    width: "24px",
    height: "24px"
  },
  iconStyle: {
    position: "relative",
    top: "4px",
    marginRight: "20px"
  },
  text: {
    paddingBottom: "5px",
    fontSize: "16px",
    [theme.breakpoints.only("xs")]: {
      paddingBottom: 0
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
    }
  }
}));
