import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    }
  },
  listItem: {
    display: "block"
  },
  formControlRoot: {
    margin: "0"
  }
});
