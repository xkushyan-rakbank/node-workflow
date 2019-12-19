import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  topIndent: {
    marginTop: "40px"
  },
  title: {
    marginLeft: "20px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  },
  username: {
    fontSize: "20px",
    lineHeight: "1.3",
    margin: "0",
    color: theme.palette.text.color
  },
  sectionTitleIndent: {
    marginBottom: "24px"
  }
}));
