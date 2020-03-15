import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  answers: {
    marginBottom: 60,
    marginTop: 60,
    borderRadius: "8px",
    overflow: "auto",
    [theme.breakpoints.only("xs")]: {
      overflow: "inherit"
    }
  },
  title: {
    minWidth: "500px",
    padding: "18px 24px",
    fontSize: "16px",
    fontWeight: "600",
    [theme.breakpoints.only("xs")]: {
      minWidth: "auto",
      padding: "20px 16px",
      borderRadius: "8px 8px 0 0"
    }
  },
  info: {
    fontSize: 20,
    lineHeight: 1.3,
    color: "#373737",
    marginTop: 50,
    [theme.breakpoints.only("xs")]: {
      fontSize: 14
    }
  },
  cardsWrapper: {
    padding: "30px 0 10px 0"
  },
  iconsWrapper: {
    flexWrap: "nowrap",
    margin: "0 -10px",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap"
    }
  }
}));
