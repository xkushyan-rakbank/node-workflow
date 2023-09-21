import { makeStyles } from "@material-ui/styles";
import { theme } from "../../../../theme";

export const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "650px",
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
    top: "35%",
    position: "fixed",
    right: "65px",
    width: "780px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    [theme.breakpoints.between("lg", "xl")]: {
      top: "35%",
      position: "fixed",
      right: "50%",
      left: "25%",
      width: "780px"
    },

    "@media (max-width: 1280px)": {
      top: "35%",
      position: "fixed",
      right: "120px",
      width: "780px"
    },
    "@media (max-width: 1024px)": {
      top: 0,
      position: "relative",
      right: "0px",
      width: "auto"
    }
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
  iconStyle: {
    position: "absolute",
    top: 5,
    right: 0,
    padding: theme.spacing(1),
    cursor: "pointer"
  },
  content: {
    padding: "8px 40px"
  },
  dialogActions: {
    padding: "20px 20px 30px 40px",
    justifyContent: "flex-start",
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
    borderRadius: "28px",
    outline: "none ",
    fontSize: "18px",
    textTransform: "none",
    padding: "10px 32px",
    backgroundColor: "#1F1F1F",
    color: "white",
    marginRight: "15px",
    "&:hover": {
      backgroundColor: "#1F1F1F",
      color: "white",
    }
  },

  notActiveButton: {
    borderRadius: "28px",
    outline: "none ",
    fontSize: "18px",
    textTransform: "none",
    padding: "10px 32px",
    marginRight: "15px", 
  }
});
