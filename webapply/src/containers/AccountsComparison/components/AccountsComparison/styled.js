import { makeStyles } from "@material-ui/core/styles/index";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
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
