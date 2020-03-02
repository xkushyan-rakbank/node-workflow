import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  linkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "42px",
    marginBottom: "42px",
    "& > div": {
      width: "auto",
      margin: "0"
    }
  },
  submitButton: theme.submitButton
}));
