import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  appStatus: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff",
    maxWidth: 780,
    margin: "0 auto",
    "& > img": {
      marginBottom: "10px",
      width: "350px"
    }
  },
  message: {
    boxSizing: "border-box",
    maxWidth: "100%",
    textAlign: "center",
    color: "#373737",
    fontSize: 20,
    padding: "0 80px 80px",
    "& > p": {
      fontSize: "16px"
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
