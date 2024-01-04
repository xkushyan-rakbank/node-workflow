import { makeStyles } from "@material-ui/core/styles";
import { contentWidthSM } from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidthSM,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  headerButton: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      right: "10px"
    },
    "& button": {
      zIndex: "11",
      color: "#fff",
      borderColor: "#fff"
    },
    "@media (max-width: 1023px)": {
      "& button": {
        zIndex: "11",
        color: "#000",
        borderColor: "#000"
      }
    }
  }
}));
