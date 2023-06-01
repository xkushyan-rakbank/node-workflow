import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  uplaodContainer: {
    display: "flex",
    alignItems: "center",
    padding: "24px",
    border: "1px dashed #86868B",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderadius: "10px",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
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
      marginLeft: 0
    },
    [theme.breakpoints.down("xs")]: {
      width: "105px",
      height: "40px",
      fontSize: "14px",
      marginTop: "16px"
    }
  },
  main: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center"
    }
  },
  contentContainer: {
    marginLeft: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: "16px",
      marginLeft: "0px"
    }
  },
  content: {
    fontSize: "16px",
    "& p": {
      margin: "0px",
      [theme.breakpoints.down("sm")]: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
      marginBottom: "7px"
    }
  },
  subcontent: {
    fontSize: "12px",
    color: "#757575",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center"
    }
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  success: {
    color: "#157947",
    fontWeight: 500
  },
  error: {
    color: "#8D0C10"
  },
  fieldDescription: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#757575",
    marginBottom: "8px"
  },
  contentWrapper: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }
}));
