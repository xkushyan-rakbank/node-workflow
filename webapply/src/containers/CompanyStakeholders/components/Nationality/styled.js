import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: "30px",
    marginBottom: "15px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  [theme.breakpoints.only("xs")]: {
    anotherCitizenshipContainer: {
      order: 1
    },
  } 
}));
