import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  error: {
    marginTop: 7,
    display: "flex",
    fontSize: 14,
    lineHeight: "16px",
    color: "#ea2925",
    letterSpacing: "normal"
  },
  alertIcon: {
    marginRight: 5
  },
  errorLink: {
    textDecoration: "underline",
    marginLeft: 4,
    cursor: "pointer"
  }
});
