import { makeStyles } from "@material-ui/styles";
import { theme } from "../../../theme";

export const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.3)",
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
    top: "35%",
    position: "fixed",
    width: "780px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    [theme.breakpoints.between("lg", "xl")]: {
      transform: "translateX(-50%)",
      right: "unset",
      left: "50%",
      width: "780px"
    },

    "@media (max-width: 1280px)": {
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
      letterSpacing: "normal",
    },
  },
  content: {
    padding: "8px 40px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#dcdcdc",
  },
  dialogActions: {
    padding: "20px",
    justifyContent: "center",
    "@media (max-width: 372px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  buttonSpacing: {
    "& > * + *": {
      marginLeft: "20px",
    },
  },
  actionButton: {
    minWidth: "150px",
    height: "40px",
    borderRadius: "21px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "normal",
    whiteSpace: "nowrap",
    "@media (max-width: 372px)": {
      width: "100%",
      marginLeft: 0,
    },
  },
  marginTop12: {
    "@media (max-width: 372px)": {
      marginTop: "12px",
      marginLeft: 0,
    },
  },
  "@keyframes rotate": {
    "100%": {
      transform: "rotate(360deg)"
    }
  },
  loader: {
    width: "24px",
    height: "24px",
    margin: "0 auto",
    animation: "$rotate 2s linear infinite"
  }
});
