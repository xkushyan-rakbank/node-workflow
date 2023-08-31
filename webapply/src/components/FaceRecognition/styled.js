import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  facseScanContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    marginTop: "8px",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  actionButton: {
    width: "105px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 500,
    padding: 20,
    letterSpacing: "normal",
    background: "#1F1F1F",
    color: "#FFFFFF",
    "&:disabled": {
      color: "#FFFFFF",
      backgroundColor: "#1F1F1F !important"
    },
    [theme.breakpoints.down("sm")]: {
      width: "105px",
      marginTop: "24px"
    }
  },
  content: {
    fontSize: "1rem",
    color: "#1F1F1F",
    fontWeight: 500
  },
  subcontent: {
    fontSize: "0.75rem",
    color: "#757575",
    fontWeight: 400,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left"
    }
  },
  fieldDescription: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#1F1F1F"
  },
  disableUpload: {
    PointerEvent: "none",
    cursor: "no-drop",
    opacity: "0.5"
  },
  disabledReason: {
    color: "#757575",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "16px",
    borderRadius: "10px"
  },
  disclaimerInfoWrapper: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
    "& svg": {
      width: "30px"
    }
  },
  disclaimerInfo: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "16px",
    color: "#757575",
    margin: 0
  },
  uploadModalErrorWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "16px 38px",
    marginTop: "8px",
    marginBottom: "24px",
    color: "#8D0C10",
    background: "#FDE7E8",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "10px"
  },
  errorIcon: {
    width: "13px",
    height: "13px",
    marginRight: "8px"
  },
  completedWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "32px",
    minWidth: "98px",
    background: "#ECF9F2",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#157947",
    fontWeight: 500
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    [theme.breakpoints.up("sm")]: {
      alignItems: "self-start"
    }
  },
  loader: {
    width: "24px",
    height: "24px",
    margin: "0 auto",
    animation: "$rotate 2s linear infinite"
  }
}));
