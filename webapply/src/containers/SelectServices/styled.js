import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  formDescription: {
    fontSize: "20px",
    color: "#373737",
    margin: "20px 0 40px",
    lineHeight: "1.5"
  },
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
  }
});
