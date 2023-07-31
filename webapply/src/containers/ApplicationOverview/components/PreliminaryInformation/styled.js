import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.only("xs")]: {
      marginTop: 41,
    },
  },
  answers: {
    marginBottom: 60,
    marginTop: 30,
    borderRadius: "8px",
    overflow: "auto",
    [theme.breakpoints.only("xs")]: {
      marginTop: 40,
      overflow: "inherit",
    },
  },
  divider: {
    height: "1px",
    background: "#E6E6E6",
    marginTop: "30px",
  },
  title: {
    minWidth: "500px",
    padding: "40px 0 24px 0",
    fontSize: "28px",
    fontWeight: "500",
    [theme.breakpoints.only("xs")]: {
      marginBottom: 20,
      minWidth: "auto",
      padding: 0,
      borderRadius: "8px 8px 0 0",
    },
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "28px",
    color: "#757575",
  },
  videoTitle: {
    fontSize: 28,
    fontWeight: 500,
    lineHeight: "36px",
    padding: "40px 0 24px 0",
  },
  videoSubTitle: {
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "28px",
    color: "#757575",
    margin: 0,
    marginBottom: "32px",
    [theme.breakpoints.between("sm", "lg")]: {
      fontSize: "1.125rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem"
    }
  },
  info: {
    fontSize: 20,
    lineHeight: 1.3,
    color: "#373737",
    marginTop: 50,
    [theme.breakpoints.only("xs")]: {
      marginTop: 40,
    },
  },
  cardsWrapper: {
    padding: "30px 0 10px 0",
  },
  iconsWrapper: {
    flexWrap: "nowrap",
    margin: "0 -10px",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
}));
