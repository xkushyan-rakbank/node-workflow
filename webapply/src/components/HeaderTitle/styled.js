import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  headerTitle: {
    backgroundColor: "#fff",
    marginBottom: "115px",
    "& span": {
      width: "100%",
      fontSize: "14px",
      color: "#86868b",
      "& span": {
        fontWeight: "600"
      }
    },
    [theme.breakpoints.only("sm")]: {
      display: "none"
    }
  },
  withoutMarginBottom: {
    marginBottom: 0
  },
  withMargin: {
    marginTop: "-130px"
  },
  headerTitleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  logout: {
    float: "right",
    marginTop: "-20px",
    cursor: "pointer"
  }
}));
