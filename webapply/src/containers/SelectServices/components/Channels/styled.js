import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  formWrapper: {
    margin: 0,
    position: "relative"
  },
  contactsTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  divider: {
    marginBottom: 0
  },
  infoTitle: {
    position: "absolute",
    bottom: "11px"
  },
  cardAppliedCheckbox: {
    marginTop: "10px"
  }
});
