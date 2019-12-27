import { makeStyles } from "@material-ui/core/styles";

import { mobileResolution } from "../../../../constants";

export const useStyles = makeStyles({
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
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minWidth: "100%"
    }
  },
  expanded: {},
  summaryRoot: {
    minHeight: 60,
    "&$expanded": {
      minHeight: 60
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
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
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingBottom: 0
    }
  },
  textEllipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      whiteSpace: "normal",
      "& svg": {
        display: "none"
      }
    }
  },
  info: {
    paddingLeft: 10,
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingLeft: 0
    }
  }
});
