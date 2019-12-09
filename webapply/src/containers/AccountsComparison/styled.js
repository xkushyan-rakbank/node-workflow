import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  externalLink: {
    color: "#888888",
    textDecoration: "underline"
  },
  videoWrapper: {
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      height: "calc(100vh - 260px)"
    }
  }
});
