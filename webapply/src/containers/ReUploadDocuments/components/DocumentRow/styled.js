import { makeStyles } from "@material-ui/core/index";

export const useStyles = makeStyles({
  uploadedFile: {
    height: 70,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    paddingLeft: 23,
    paddingRight: 23,
    borderRadius: 8,
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "1px solid #e8e8e8",
    backgroundColor: "#ffffff"
  },
  fileIcon: ({ isUploaded }) => ({
    marginRight: 30,
    opacity: isUploaded ? 1 : 0.4
  }),
  contentBox: {
    display: "flex",
    flexDirection: "column"
  },
  uploadFileName: {
    fontSize: "12px",
    fontWeight: "600",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.17",
    letterSpacing: "normal",
    color: "#373737"
  },
  fileSize: {
    color: "#888888",
    fontSize: 14,
    lineHeight: "14px",
    letterSpacing: "normal",
    paddingLeft: 23
  },
  cancelIcon: {
    marginLeft: "auto",
    marginRight: 0,
    justifySelf: "flex-end",
    cursor: "pointer"
  },
  progressContainer: {
    marginTop: 9,
    alignItems: "center",
    display: "flex"
  },
  progressBar: {
    marginRight: 10,
    borderRadius: 3,
    overflow: "hidden",
    display: "flex",
    width: 300,
    height: 4,
    backgroundColor: "#e8e8e8"
  },
  progressInner: {
    height: "100%",
    width: 0,
    backgroundColor: "#373737"
  },
  progressStatus: {
    fontSize: 14,
    lineHeight: "18px"
  },
  error: {
    marginTop: 7,
    display: "flex",
    fontSize: 14,
    lineHeight: "16px",
    color: "#ea2925",
    letterSpacing: "normal"
  },
  alertIcon: {
    marginRight: 5
  },
  errorLink: {
    marginLeft: 4,
    textDecoration: "underline"
  }
});
