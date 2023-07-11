import { makeStyles } from "@material-ui/core/styles";
import { contentWidth } from "../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 174,
    [theme.breakpoints.only("sm")]: {
      marginTop: 110
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: 0
    }
  },
  section: {
    [theme.breakpoints.up("sm")]: {
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  roleSelectionButton: {
    boxSizing: "border-box",
    [theme.breakpoints.up("sm")]: {
      width: contentWidth
    },
    border: "1px solid #CCCCCC",
    background: "#FFFFFF",
    borderRadius: "10px",
    marginTop: "24px",
    display: "flex",
    flexDirection: "row",
    padding: "24px",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
    }
  },
  buttonText: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: 450
    }
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    [theme.breakpoints.only("xs")]: {
      fontSize: 16
    }
  },
  subTitle: {
    marginTop: 3,
    fontWeight: 400,
    fontSize: 16,
    color: theme.palette.text.secondary,
    [theme.breakpoints.only("xs")]: {
      fontSize: 10
    }
  },
  btnContainer: {
    marginTop: "60px"
  }
}));
