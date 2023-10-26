import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  headerTitle: {
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
    [theme.breakpoints.up("sm")]: {
      marginTop: 35
    }
  },
  headerTitleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  hideHeaderTile: {
    display: "none"
  },
  logout: {
    float: "right",
    marginTop: "-20px",
    cursor: "pointer"
  }
}));
