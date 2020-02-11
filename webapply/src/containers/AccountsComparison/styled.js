import { makeStyles } from "@material-ui/core/styles";
import { normalScrollHeight } from "../../constants";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  externalLink: {
    color: "#888888",
    textDecoration: "underline"
  },
  videoWrapper: {
    height: "calc(100vh - 260px)",
    [`${theme.breakpoints.up("sm")} and (max-height: ${normalScrollHeight}px)`]: {
      height: "100vh"
    }
  }
}));
