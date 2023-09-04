import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  uplaodContainer: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    gap: "24px",
    minWidth: "274px",
    maxWidth: "274px",
    [theme.breakpoints.up("sm")]: {
      padding: "24px",
      flexDirection: "row",
      minWidth: "unset",
      maxWidth: "unset"
    }
  },
  actionButton: {
    minWidth: "105px",
    height: "40px",
    border: "1px solid #1F1F1F",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "1rem",
    fontWeight: 500,
    padding: 20,
    letterSpacing: "normal",
    "@media (max-width: 372px)": {
      width: "100%",
      marginLeft: 0,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.875rem",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "100%",
    minWidth: 0,
    [theme.breakpoints.between("sm", "md")]: {
      width: "calc(100% - 105px)",
      flexDirection: "row",
      gap: "20px",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      gap: "20px",
    }
  },
  contentContainer: {
    width: "100%",
    textAlign: "center",
    marginLeft: "0px",
    [theme.breakpoints.between("sm", "md")]: {
      width: "calc(100% - 54px)",
      textAlign: "left",
      marginTop: "0px",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 54px)",
      textAlign: "left",
      marginTop: "0px"
    }
  },
  content: {
    fontSize: "1rem",
    fontWeight: 500,
    width: "100%",
    color: "#1F1F1F",
    "& p": {
      margin: "0px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    [theme.breakpoints.down("sm")]: {
      // marginBottom: "7px"
    }
  },
  subcontent: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#757575"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  success: {
    color: "#157947",
    fontWeight: 500,
  },
  error: {
    color: "#8D0C10",
    wordBreak: "break-word",
  },
  fieldDescription: {
    display: "flex",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#1F1F1F",
    marginBottom: "8px",
    width: "fit-content",
  },
  contentWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "7px"
  },
  uploadInfoIcon: {
    fill: "#909093",
    width: "16px",
    height: "16px",
    marginLeft: "8px",
  },
}));
