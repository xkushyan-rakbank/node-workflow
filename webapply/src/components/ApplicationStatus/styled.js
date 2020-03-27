import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    maxWidth: "650px",
    margin: "0 auto",
    "& > img": {
      width: "460px"
    }
  },
  message: {
    boxSizing: "border-box",
    maxWidth: "609px",
    textAlign: "center",
    color: "#373737",
    fontSize: 20,
    lineHeight: 1.5,
    "& > p": {
      marginBottom: "27px"
    }
  },
  appStatusLink: {
    color: "#373737",
    width: 120,
    border: "solid 1px #373737",
    padding: "3px 0",
    fontSize: 14,
    margin: "20px auto 0",
    borderRadius: 21,
    display: "block",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#373737",
      color: "#fff"
    }
  }
});
