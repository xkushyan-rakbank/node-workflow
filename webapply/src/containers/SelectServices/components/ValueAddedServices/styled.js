import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  formWrapper: {
    display: "flex",
    overflowX: "auto"
  },
  cardsWrapper: {
    border: "none",
    borderRadius: "0",
    boxShadow: "none",
    margin: 0,
    "&:first-of-type": {
      borderRight: "solid 1px #e9e9ed"
    }
  },
  disabled: {
    opacity: "0.5"
  },
  disabledReasonInfo: {
    fontSize: "12px",
    textAlign: "center",
    color: "#a4a4a4"
  }
});
