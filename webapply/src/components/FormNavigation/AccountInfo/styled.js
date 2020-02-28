import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  contentContainer: {
    margin: 0,
    width: "100%",
    maxWidth: 340,
    [theme.breakpoints.up("xl")]: {
      maxWidth: "auto",
      width: "auto",
      paddingRight: "25px"
    }
  },
  sectionTitle: {
    maxWidth: 340,
    color: "#fff",
    fontSize: "48px",
    lineHeight: "1.17",
    fontWeight: 600,
    fontFamily: "Open Sans",
    marginBottom: 20,
    whiteSpace: "pre-line",
    "& + button": {
      marginTop: 60
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 38
    },
    [theme.breakpoints.only("xs")]: {
      width: 310,
      marginBottom: 10,
      fontSize: 32,
      lineHeight: "36px"
    }
  },
  sectionSubtitle: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#fff",
    maxWidth: 300,
    display: "block",
    fontWeight: "normal",
    fontFamily: "Open Sans",
    whiteSpace: "pre-wrap",
    "& + button": {
      marginTop: 60
    }
  },
  sectionButton: {
    marginTop: 60
  }
}));
