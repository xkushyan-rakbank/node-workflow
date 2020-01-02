import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  error: {
    fontSize: "12px",
    marginTop: "10px",
    position: "relative",
    "& p": {
      lineHeight: "1",
      margin: "0",
      color: "#ea2b1e"
    },
    "& svg": {
      marginRight: "5px"
    }
  },
  errorContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center"
  }
});
