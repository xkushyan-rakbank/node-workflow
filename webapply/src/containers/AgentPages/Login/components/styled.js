import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  baseForm: {
    marginTop: "135px",
    maxWidth: "612px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "60px"
    }
  }
}));
