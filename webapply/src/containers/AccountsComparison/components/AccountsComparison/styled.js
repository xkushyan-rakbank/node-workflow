import { makeStyles } from "@material-ui/core/styles/index";
import { contentWidth } from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  externalLink: {
    color: "#888888",
    textDecoration: "underline"
  },
  video: {
    [theme.breakpoints.up("sm")]: {
      bottom: 0,
      top: "auto"
    }
  }
}));
