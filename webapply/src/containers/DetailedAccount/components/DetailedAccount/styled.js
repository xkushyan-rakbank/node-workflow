import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  section: {
    [theme.breakpoints.up("sm")]: {
      width: 634,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));
