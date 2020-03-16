import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  fileInput: {
    display: "none"
  },
  uploadButton: {
    marginBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
    display: "flex",
    alignItems: "center",
    height: 70,
    boxSizing: "borderBox",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "1px solid #e8e8e8",
    backgroundColor: "#ffffff",
    cursor: "pointer"
  },
  textContainer: {
    display: "flex",
    flexDirection: "column"
  },
  uploadButtonText: {
    fontSize: 14,
    lineHeight: "14px",
    fontWeight: 600
  },
  errorIcon: {
    marginRight: 30,
    opacity: 0.4
  },
  addIcon: {
    marginRight: 30
  },
  cancelIcon: {
    marginLeft: "auto"
  }
});
