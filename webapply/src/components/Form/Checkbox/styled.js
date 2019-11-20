import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  checkboxesWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
  },
  formControl: {
    width: "100%",
    margin: "12px 0 24px",
    display: "flex"
  }
});
