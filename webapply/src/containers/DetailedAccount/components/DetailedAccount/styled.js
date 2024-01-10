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
      color: "#000",
      background: "#FFF",
      border: "1px solid #FFF",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.5)"
      }
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
