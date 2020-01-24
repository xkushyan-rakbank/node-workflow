import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution, normalScrollHeight } from "../../constants";

export const useStyles = makeStyles({
  videoWrapper: {
    [`@media only screen and (min-width: ${mobileResolution +
      1}px), (max-height: ${normalScrollHeight}px)`]: {
      height: "100vh"
    }
  }
});
