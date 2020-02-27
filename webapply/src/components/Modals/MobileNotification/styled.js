import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  paper: {
    backgroundColor: "#fff",
    boxShadow: "10px 10px 18px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    padding: "40px 20px 30px",
    textAlign: "center",
    maxHeight: "calc(100vh - 60px)",
    overflow: "auto",
    margin: "30px 0",
    "&:focus": {
      outline: "none"
    },
    "& h2": {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: "32px",
      marginBottom: 30
    },
    "& p": {
      fontSize: 16,
      lineHeight: "22px",
      paddingBottom: 21,
      margin: "20px 0",
      position: "relative",
      "&:after": {
        position: "absolute",
        content: "''",
        left: -20,
        right: -20,
        bottom: 0,
        height: 1,
        backgroundColor: "#dcdcdc"
      }
    },
    "& button": {
      width: 200,
      height: 40,
      "& span": {
        textAlign: "center",
        justifyContent: "center"
      }
    }
  }
});
