import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "650px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    margin: "0 auto",
    "@media (max-width: 420px)": {
      overflow: "hidden",
      margin: "0 15px"
    }
  },
  title: {
    textAlign: "center",
    padding: "30px 40px 10px 40px",
    "& > h2": {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: "normal"
    }
  },
  content: {
    padding: "8px 40px"
  },
  dialogActions: {
    padding: "20px",
    justifyContent: "center",
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
    width: "200px",
    height: "42px",
    borderRadius: "21px",
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: 600,
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
  }
});
