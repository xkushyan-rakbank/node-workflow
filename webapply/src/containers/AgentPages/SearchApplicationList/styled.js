import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    display: "flex",
    alignItems: "center",
    padding: "24px 20px 19px 30px",
    color: "#263d4c"
  },
  disabled: {
    opacity: "0.5",
    pointerEvents: "none",
    userSelect: "none"
  },
  fullName: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "#263d4c",
    minHeight: "18px",
    marginRight: "5px",
    wordBreak: "break-word"
  },
  companyName: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
    color: "#263d4c",
    marginTop: "-23px"
  },
  notFound: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: 1,
    color: "#263d4c",
    textAlign: "center",
    width: "100%"
  },
  account: {
    fontSize: "14px",
    color: "#86868b",
    marginTop: 5,
    minHeight: "18px",
    marginRight: "5px",
    wordBreak: "break-word",
    wordWrap: "break-word"
  },
  status: {
    borderRadius: "4px",
    backgroundColor: "#e9e9ed",
    fontSize: "14px",
    color: "#373737",
    padding: "3px 5px",
    display: "inline-block"
  },
  action: {
    fontSize: "14px",
    fontStyle: "italic",
    lineHeight: 1.14,
    textAlign: "center",
    color: "#b5b5bb"
  },
  column: {
    width: "40%",
    "&:last-child": {
      width: "20%"
    }
  },
  heading: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
    color: "#263d4c",
    minHeight: "18px"
  }
});
