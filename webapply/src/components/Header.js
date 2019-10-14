import React from "react";
import { Link } from "react-router-dom";
import routes from "./../routes";
import { getIconsByAccount } from "../constants/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  header: {
    position: " fixed",
    top: "30px",
    left: "40px",
    display: "flex",
    zIndex: 12,
    "& img": {
      width: "140px"
    }
  }
};

const Header = props => {
  const { classes } = props;
  const { logo } = getIconsByAccount();

  return (
    <header className={classes.header}>
      <Link to={routes.accountsComparison}>
        <img src={logo} alt="rak bank" />
      </Link>
    </header>
  );
};

export default withStyles(styles)(Header);
