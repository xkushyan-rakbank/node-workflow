import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  uplaodContainer: {
    display: "flex",
    alignItems: "center",
    padding: "24px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    "@media (max-width: 425px)": {
      flexDirection: "column"
    }
  },
  btnWrapper: {
    display: "flex",
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
    letterSpacing: "normal",
    background: "#1F1F1F",
    color: "#FFFFFF",
    "&:disabled": {
      color: "#FFFFFF",
      backgroundColor: "#1F1F1F !important"
    },
    "&:first-child": {
      marginRight: "8px"
    },
    "@media (max-width: 372px)": {
      marginLeft: 0
    }
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
  fileUploadIcon: {
    height: "23px",
    width: "21px",
    "@media (max-width: 425px)": {
      height: "44px",
      width: "40px"
    }
  },
  successText: {
    color: "#157947",
    fontWeight: 500,
    marginLeft: "5px"
  }
}));
