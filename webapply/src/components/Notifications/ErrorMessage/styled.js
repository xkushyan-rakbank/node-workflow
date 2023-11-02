import { makeStyles } from "@material-ui/styles";
import { theme } from "../../../theme";

export const useStyles = makeStyles({
  error: {
    fontSize: "12px",
    position: "relative",
    "& p": {
      lineHeight: "1.1",
      margin: "0",
      color: "#ea2b1e",
      maxWidth: "280px",
      [theme.breakpoints.up("sm")]: {
        lineHeight: "1",
        width: "auto",
        maxWidth: "300px",
      },
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
