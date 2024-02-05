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
    marginTop: "5px"
  },
  actionButton: {
    width: "105px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 500,
    padding: 20,
    letterSpacing: "normal",
    "@media (max-width: 372px)": {
      width: "100%",
      marginLeft: 0
    }
  },
  main: {
    display: "flex",
    flexDirection: "row"
  },
  contentContainer: {
    marginLeft: "20px"
  },
  content: {
    fontSize: "16px"
  },
  subcontent: {
    fontSize: "12px",
    color: "#757575"
  },
  addMoreButton: {
    border: "1px solid #1F1F1F",
    borderRadius: "21px",
    padding: "9px 24px",
    color: "#1F1F1F",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22px",
    textTransform: "none",
    width: "max-content",
    marginTop: "10px"
  },
  removeButton: {
    // position: "absolute",
    right: "5px",
    bottom: "5px",
    marginTop: "5px",
    padding: 0
  }
}));
