import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "600px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    "@media (max-width: 420px)": {
      overflow: "hidden",
      margin: "0 15px"
    }
  },
  title: {
    textAlign: "center",
    padding: "15px 40px 0px 40px",
    "& > h2": {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: "normal"
    }
  },
  iconStyle: {
    fontSize: "30px",
    border: "3px solid red",
    borderRadius: "50px",
    padding: "5px"
  },
  content: {
    padding: "5px 30px",
    fontSize: "15px"
  },
  btnContainer: {
    padding: "5px",
    width: "100%"
  },
  agentBtnContainer: {
    padding: "5px",
    width: "100%",
    textAlign: "center"
  },
  dialogActions: {
    alignItems: "center",
    padding: "15px",
    justifyContent: "center"
  },
  buttonSpacing: {
    "& > * + *": {
      marginLeft: "20px"
    }
  },
  actionButton: {
    width: "100%",
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
  agentActionButton: {
    width: "200px",
    height: "40px",
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
  ml0: {
    width: "200px",
    marginLeft: "0 !important",
    textAlign: "center"
  }
});
