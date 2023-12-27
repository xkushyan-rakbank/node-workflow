import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  kfsSubTitle: {
    fontWeight: 400,
    fontSize: "20px",
    color: "#757575",
    margin: 0,
    marginBottom: "40px"
  },
  descriptionContent: {
    background: "#FFFFFF",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    marginBottom: "20px",
    border: "1px solid #E6E6E6",
    [theme.breakpoints.up("sm")]: {
      padding: "18px", 
    }
  },
  kfsDescriptionContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  readBtn: {
    height: "3.2rem",
    width: "16rem",
    borderRadius: "100px",
    border: "1px solid #1F1F1F",
    background: "transparent",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "22px",
    letterSpacing: "0px",
    color: "#1F1F1F",
    textTransform: "none",
    padding: "19px 24px",
    marginTop: "20px",
    alignSelf: "center",
    [theme.breakpoints.up("sm")]: {
      borderRadius: "21px",
      padding: "9px 24px",
      width: "206px",
      height: "40px",
      alignSelf: "unset"
    }
  },
  readAcceptBtn: {
    height: "3.2rem",
    width: "16rem",
    borderRadius: "100px",
    background: "#1F1F1F",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "1.375rem",
    letterSpacing: "0px",
    color: "#FFFFFF",
    textTransform: "none",
    padding: "19px 24px",
    marginTop: "20px",
    alignSelf: "center",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.7)"
    },

    [theme.breakpoints.up("sm")]: {
      width: "206px",
      height: "40px",
      borderRadius: "21px",
      padding: "9px 24px",
      lineHeight: "22px",
      alignSelf: "unset"
    }
  },
  completedWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "32px",
    minWidth: "90px",
    background: "#ECF9F2",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#157947",
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
      minWidth: "98px",
    }
  },
  notAcceptWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "32px",
    width: "20%",
    background: "#FDE7E8",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#8D0C10",
    fontWeight: "500"
  },
  kfsTitle: {
    margin: "0px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#1F1F1F"
  },
  authorisationsList: {
    padding: "16px",
    fontWeight: "400",
    fontSize: "14px",
    margin: "0px",
    color: "#757575",
    "& li": {
      marginBottom: "4px"
    },
    [theme.breakpoints.up("sm")]: {
      padding: "unset",
      paddingLeft: "24px", 
    }
  },
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  uploadModalCloseIcon: {
    position: "absolute",
    right: "18px",
    top: "20px",
    width: "16px",
    height: "16px",
    fill: "#525252",
    PointerEvent: "cursor"
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
    minWidth: "auto",
    minHeight: "450px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    maxWidth: "unset",
    [theme.breakpoints.up("sm")]: {
      minWidth: "780px", 
      minHeight: "650px"
    }
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px"
  },
  agreeButton: {
    padding: "17px 40px",
    borderRadius: "100px",
    color: "#fff",
    fontWeight: "normal",
    margin: "0"
  },
  scrollInstruction: {
    color: "#757575",
    fontSize: "12px"
  },
  previewPDF: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    textAlign: "center"
  },
  title: {
    padding: "40px 40px 20px 40px",
    "& > h2": {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: "normal"
    }
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
  divider: {
    height: "1px",
    backgroundColor: "#dcdcdc"
  },
  dialogActions: {
    padding: "20px",
    justifyContent: "center",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "0px 0px 20px 20px",
    "@media (max-width: 372px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  },
  buttonSpacing: {
    "& > * + *": {
      marginLeft: "20px"
    }
  },
  actionButton: {
    width: "150px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "normal",
    "@media (max-width: 372px)": {
      width: "100%",
      marginLeft: 0
    }
  },
  marginTop12: {
    "@media (max-width: 372px)": {
      marginTop: "12px",
      marginLeft: 0
    }
  },
  mainTitle: {
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 600,
    letterSpacing: "normal",
    fontStretch: "normal",
    lineHeight: "0.25rem"
  }
}));
