import { makeStyles } from "@material-ui/core/styles";
import { normalScrollHeight } from "../../constants";

export const useStyles = makeStyles(theme => ({
  videoWrapper: {
    [`${theme.breakpoints.up("sm")} and (max-height: ${normalScrollHeight}px)`]: {
      height: "100vh"
    }
  }
}));
