import { makeStyles } from "@material-ui/core/styles";
import { contentWidth } from "../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  section: {
    [theme.breakpoints.up("md")]: {
      width: contentWidth,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  roleSelectionButton: {
    boxSizing: "border-box",
    [theme.breakpoints.up("lg")]: {
      width: contentWidth,
      padding: "24px"
    },
    [theme.breakpoints.up("sm")]: {
      padding: "24px"
    },
    border: "1px solid #CCCCCC",
    background: "#FFFFFF",
    borderRadius: "10px",
    marginTop: "24px",
    display: "flex",
    flexDirection: "row",
    padding: "16px",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "border 0.5s ease-in-out",
    "&:hover": {
      border: "1px solid transparent",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
    },
    "&:first-child": {
      marginTop: "0px"
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
    fontSize: "0.875rem",
    fontWeight: 600,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem"
    }
  },
  subTitle: {
    marginTop: 3,
    fontWeight: 400,
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    paddingRight: "30px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem"
    }
  },
  btnContainer: {
    marginTop: "16px",
    marginBottom: "55px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "40px",
      marginBottom: "0px"
    }
  }
}));
