import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  pageTitle: {
    fontSize: "48px",
    lineHeight: 1.17
  },
  topIndent: {
    marginTop: "40px"
  },
  title: {
    marginLeft: "20px",
    fontSize: "20px",
    fontWeight: 600,
    color: theme.palette.text.color
  },
  username: {
    fontSize: "20px",
    lineHeight: "1.3",
    margin: "0",
    color: theme.palette.text.color
  },
  sectionTitleIndent: {
    marginBottom: "60px"
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
  }
}));
