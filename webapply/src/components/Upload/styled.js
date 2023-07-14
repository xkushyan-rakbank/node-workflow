import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  uplaodContainer: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      padding: "24px",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    }
  },
  actionButton: {
    width: "105px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 600,
    padding: 20,
    letterSpacing: "normal",
    "@media (max-width: 372px)": {
      width: "100%",
      marginLeft: 0,
    },
    [theme.breakpoints.down("xs")]: {
      width: "105px",
      height: "40px",
      fontSize: "14px",
      marginTop: "16px",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.between("sm", "md")]: {
      width: "calc(100% - 105px)",
      flexDirection: "row"
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },
  contentContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: "16px",
    marginLeft: "0px",
    [theme.breakpoints.between("sm", "md")]: {
      width: "calc(100% - 105px)",
      textAlign: "left",
      marginTop: "0px",
      marginLeft: "20px"
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      marginTop: "0px",
      marginLeft: "20px"
    }
  },
  content: {
    fontSize: "16px",
    width: "100%",
    "& p": {
      margin: "0px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "7px"
    }
  },
  subcontent: {
    fontSize: "12px",
    color: "#757575",
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
    fontSize: "12px",
    fontWeight: "400",
    color: "#757575",
    marginBottom: "8px",
    width: "fit-content",
  },
  contentWrapper: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  uploadInfoIcon: {
    fill: "#909093",
    width: "16px",
    height: "16px",
    marginLeft: "8px",
  },
}));
