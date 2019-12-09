import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  checkboxesWrapper: {
    "&>label": {
      marginBottom: "20px"
    },
    "& .formControlContainer": {
      margin: "0"
    }
  },
  listItem: {
    display: "block"
  }
});
