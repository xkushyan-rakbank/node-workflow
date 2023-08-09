import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  documentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    marginTop: "8px",
    [theme.breakpoints.up("sm")]: {
      padding: "24px",
    }
  },
  uploadContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  previewContainer: {
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "20px",
    color: "#5E080B",
    cursor: "pointer"
  },
  previewBtn: {
    minWidth: "105px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "start",
    },
    "& svg": {
      marginRight: "2px"
    }
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      gap: "8px",
    }
  },
  scanUploadbtnWrapper: {
    display: "flex",
    gap: "8px",

  },
  actionButton: {
    minWidth: "105px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 500,
    padding: 20,
    letterSpacing: "normal"
  },
  btnScanUpload: {
    background: "#1F1F1F",
    color: "#FFFFFF",
    "&:disabled": {
      color: "#FFFFFF",
      backgroundColor: "#1F1F1F !important"
    }
  },
  btnRemove: {
    background: "#FFFFFF",
    color: "#1F1F1F"
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "inherit"
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontSize: "1rem",
    color: "#1F1F1F",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "center"
    }
  },
  subcontent: {
    fontSize: "0.75rem",
    color: "#757575",
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  fieldDescription: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#1F1F1F",
  },
  disableUpload: {
    pointerEvents: "none",
    cursor: "no-drop",
    opacity: "0.5"
  },
  disabledReason: {
    color: "#757575",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "16px",
    borderRadius: "10px",
  },
  fileUploadIcon: {
    width: "32px",
    height: "35px",
  },
  successText: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    display: "flex",
    gap: "2px"
  },
  contentWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "unset",
      textAlign: "center",
    }
  },
  previewMobile: {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#8D0C10",
    cursor: "pointer",
  },
  success: {
    marginLeft: "5px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "16px",
    },
  },
  emriatesIDTile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column"
    }
  },
  successContent: {
    marginBottom: "7px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "unset",
    gap: "20px",
    paddingBottom: "15px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "7px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "550px",
    }
  },

}));
