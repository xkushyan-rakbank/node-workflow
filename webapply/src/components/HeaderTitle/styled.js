import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  headerTitle: {
    marginTop: 35,
    backgroundColor: "#fff",
    marginBottom: ({ withoutMarginBottom }) => (withoutMarginBottom ? 0 : 115),
    "& span": {
      width: "100%",
      fontSize: "14px",
      color: "#86868b",
      "& span": {
        fontWeight: "600"
      }
    },
    [theme.breakpoints.only("xs")]: {
      display: "none"
    }
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
