import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  pageTitle: {
    fontSize: "28px",
    lineHeight: 1.17
  },
  topIndent: {
    marginTop: "40px"
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: theme.palette.text.color,
    marginTop: "40px",
    marginBottom: "26px !important"
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: 400,
    color: "#757575",
    lineHeight: "1.3",
    margin: "0"
  },
  username: {
    fontSize: "20px",
    lineHeight: "1.3",
    margin: "0",
    color: theme.palette.text.color
  },
  continueButton: {
    margin: "20px 0 40px 0"
  },
  detailsContinueButton: {
    marginTop: 5
  },
  continueButtonGrid: {
    padding: 20
  },
  deleteButton: {
    height: "100%",
    paddingBottom: "20px",
    outline: "none"
  },
  continueButtonContainer: {
    flexWrap: "nowrap",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column"
    }
  },
  continueBtn: {
    [theme.breakpoints.only("xs")]: {
      alignSelf: "flex-end",
      marginTop: "10px"
    }
  },
  divider: {
    margin: "40px 0px",
    color: "#E6E6E6"
  }
}));
