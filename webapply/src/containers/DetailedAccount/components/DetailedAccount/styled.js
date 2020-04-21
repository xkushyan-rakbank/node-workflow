import { makeStyles } from "@material-ui/core/styles";
import { contentWidthSM } from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidthSM,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));
