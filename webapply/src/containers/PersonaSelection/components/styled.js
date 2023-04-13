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
    height: "97px",
    [theme.breakpoints.up("sm")]: {
      width: contentWidth
    },
    border: "1px solid #E6E6E6",
    borderRadius: "10px",
    boxSizing: "border-box",
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      boxShadow: "0px 4px 20px 0px rgba(235, 21, 29, 0.2)"
    }
  },
  buttonText: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 40
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
  avatar: {
    minWidth: "56px",
    width: "56px",
    height: "53px",
    [theme.breakpoints.only("xs")]: {
      width: 20,
      height: 20,
      minWidth: 20
    },
    background: "#C4C4C4",
    borderRadius: "25px"
  },
  btnContainer: {
    marginTop: "60px"
  }
}));
