import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.3)"
  },
  paper: {
    width: "500px",
    height: "281px",
    borderRadius: "8px",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    marginLeft: "35%"
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
    padding: "0 40px 40px"
  },
  divider: {
    height: "1px",
    backgroundColor: "#dcdcdc"
  },
  dialogActions: {
    padding: "20px",
    justifyContent: "center"
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
    fontWeight: 600,
    letterSpacing: "normal"
  }
});
