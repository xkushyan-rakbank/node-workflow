import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/styles";
import { Link } from "react-router-dom";

export const ComeBackLink = styled(Link)({
  color: "rgba(0, 0, 0, 0.87)",
  textDecoration: "underline",
  padding: "5px 5px",
  hover: {
    "&:hover": {
      textDecoration: "nome"
    }
  }
});

export const useStyles = makeStyles(theme => ({
  answers: {
    marginTop: "40px",
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
    backgroundColor: "rgba(239, 242, 244, .5)",
    [theme.breakpoints.only("xs")]: {
      minWidth: "auto",
      padding: "20px 16px",
      borderRadius: "8px 8px 0 0"
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
