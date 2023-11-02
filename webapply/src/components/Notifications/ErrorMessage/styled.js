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
      maxWidth: "fit-content",
      paddingRight: "50px",
      [theme.breakpoints.up("sm")]: {
        lineHeight: "1",
        width: "auto",
        maxWidth: "fit-content",
        paddingRight: "30px",
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
