import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "500px",
    height: "281px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    "@media (max-width: 420px)": {
      height: "320px",
      overflow: "hidden"
    },
    "@media (max-width: 372px)": {
      height: "370px"
    }
  },
  noTitlePaper: {
    width: "max-content",
    minHeight: "650px",
    minWidth: "auto",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    maxWidth: "unset",
    [theme.breakpoints.up("sm")]: {
      minWidth: "780px"
    }
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 30px",
    gap: "8px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px "
    }
  },
  agreeButton: {
    borderRadius: "100px",
    color: "#fff",
    fontWeight: "normal",
    margin: "0",
    width: "unset",
    fontSize: "24px"
  },
  scrollInstruction: {
    color: "#757575",
    fontSize: "12px"
  },
  previewPDF: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%"
  },
  content: {
    padding: "unset",
    height: "400px",
    "overflow-x": "hidden !important", 
    [theme.breakpoints.up("sm")]: {
      padding: "8px 17px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      "overflow-x": "hidden !important",
    },
    [theme.breakpoints.up("md")]: {
      padding: "8px 17px", 
    },
    "& .react-pdf__Page__canvas": {
      height: "100% !important",
      width: "100% !important",
      overflow: "hidden",
      [theme.breakpoints.between("sm", "md")]: {
        width: "100% !important",
      }
    }
  },
  dialogActions: {
    padding: "10px",
    justifyContent: "center",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "0px 0px 20px 20px"
  },
  buttonSpacing: {
    "& > * + *": {
      marginLeft: "20px"
    }
  },
  iconSize: {
    width: "24px",
    height: "24px"
  },
  customTooltip: {
    zIndex: "9999"
  },
  importantInfo: {
    backgroundColor: "#ee1d23",
    borderRadius: "10px",
    color: "white",
    padding: "10px",
    marginBottom: "10px"
  },
  impInfoTitle: {
    fontWeight: 600
  },
  title: {
    fontWeight: 600
  },
  iconButton: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "-10px"
    }
  }
}));
