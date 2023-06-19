import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "500px",
    borderRadius: "20px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff"
  },
  noTitlePaper: {
    width: "1239px",
    height: "min(845px, 90vh)",
    borderRadius: "20px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      minHeight: "0px"
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
    height: "400px",
    padding: "0px 60px",
    marginTop: "40px",
    "& .react-pdf__Page__canvas": {
      width: "100% !important",
      height: "100% !important",
      overflow: "hidden"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
      padding: "20px"
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
