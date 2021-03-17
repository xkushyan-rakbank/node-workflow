import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 80,
    [theme.breakpoints.only("xs")]: {
      marginTop: 41
    }
  },
  answers: {
    marginBottom: 60,
    marginTop: 30,
    borderRadius: "8px",
    overflow: "auto",
    [theme.breakpoints.only("xs")]: {
      marginTop: 40,
      overflow: "inherit"
    }
  },
  title: {
    minWidth: "500px",
    padding: "18px 24px",
    fontSize: "16px",
    fontWeight: "600",
    [theme.breakpoints.only("xs")]: {
      marginBottom: 20,
      minWidth: "auto",
      padding: 0,
      borderRadius: "8px 8px 0 0"
    }
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 600,
    padding: "40px 0 24px 0"
  },
  info: {
    fontSize: 20,
    lineHeight: 1.3,
    color: "#373737",
    marginTop: 50,
    [theme.breakpoints.only("xs")]: {
      marginTop: 40
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
