import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../../theme";

export const useStyles = makeStyles({
  baseForm: {
    maxWidth: "612px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "135px",
    }
  }
});
