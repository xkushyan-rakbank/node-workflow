import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  documentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    "@media (max-width: 425px)": {
      flexDirection: "column"
    }
  },
  uploadContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  previewContainer: {
    width: "100%",
    borderTop: "1px solid #E6E6E6",
    paddingTop: "16px",
    marginTop: "16px",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#8D0C10"
  },
  btnWrapper: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    "@media (max-width: 425px)": {
      marginTop: "20px"
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
    letterSpacing: "normal"
  },
  btnScanUpload: {
    background: "#1F1F1F",
    color: "#FFFFFF",
    "&:disabled": {
      color: "#FFFFFF",
      backgroundColor: "#1F1F1F !important"
    },
    "&:first-child": {
      marginRight: "8px",
      [theme.breakpoints.down("xs")]: {
        marginRight: "0px",
        marginBottom: "8px"
      }
    },
    "@media (max-width: 372px)": {
      marginLeft: 0
    }
  },
  btnRemove: {
    background: "#FFFFFF",
    color: "#1F1F1F"
  },
  contentContainer: {
    display: "flex",
    alignItems: "center"
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
    pointerEvents: "none",
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
  fileUploadIcon: {
    height: "23px",
    width: "21px",
    "@media (max-width: 425px)": {
      height: "44px",
      width: "40px"
    }
  },
  successText: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#157947"
  }
}));
