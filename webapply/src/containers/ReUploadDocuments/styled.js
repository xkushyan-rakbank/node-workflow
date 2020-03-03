import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    minHeight: "calc(100vh - 170px)",
    display: "flex",
    flexDirection: "column"
  },
  fileInput: {
    display: "none"
  },
  heading: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 600,
    letterSpacing: "normal",
    color: "#373737",
    marginTop: 0,
    marginBottom: 10
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 68,
    fontSize: 20,
    lineHeight: "26px",
    letterSpacing: "normal"
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
  error: {
    marginTop: 7,
    display: "flex",
    fontSize: 14,
    lineHeight: "16px",
    color: "#ea2925",
    letterSpacing: "normal"
  },
  errorIcon: {
    marginRight: 30,
    opacity: 0.4
  },
  addIcon: {
    marginRight: 30
  },
  alertIcon: {
    marginRight: 5
  },
  errorLink: {
    textDecoration: "underline",
    marginLeft: 4
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "auto",
    marginBottom: 80
  },
  submitBtn: {
    marginLeft: 40
  }
});
