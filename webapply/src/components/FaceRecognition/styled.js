import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  facseScanContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    "@media (max-width: 375px)": {
      flexDirection: "column"
    }
  },
  contentContainer: {
    display: "flex",
    alignItems: "center"
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
    "@media (max-width: 375px)": {
      width: "100%",
      marginTop: "24px"
    }
  },
  content: {
    fontSize: "16px",
    color: "#1F1F1F",
    marginBottom: "7px"
  },
  subcontent: {
    fontSize: "12px",
    color: "#757575"
  },
  fieldDescription: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#757575",
    marginBottom: "8px"
  },
  disableUpload: {
    PointerEvent: "none",
    cursor: "no-drop",
    opacity: "0.5"
  },
  disabledReason: {
    border: "1px solid #E6E6E6",
    padding: "16px",
    color: "#757575",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    borderRadius: "10px",
    marginBottom: "8px"
  },
  disclaimerInfo: {
    marginTop: "8px",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#757575"
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
    fontSize: "12px"
  }
}));
