import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
  submitButton: {
    padding: "15px 24px"
  }
});
