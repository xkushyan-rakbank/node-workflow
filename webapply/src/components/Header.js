import React from "react";
import { Link } from "react-router-dom";
import routes from "./../routes";
import logo from "./../assets/images/rakBank.svg";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  header: {
    position: " fixed",
    top: " 0",
    width: " 100%",
    display: "flex",
    zIndex: 0,
    "& img": {
      width: "120px"
    }
  },
  logo: {
    flex: "0 0 calc(530px - 40px)",
    padding: "28px 0 28px 40px",
    "@media only screen and (max-width: 1300px)": {
      flex: "0 0 calc(45% - 40px)"
    }
  },
  headerTitle: {
    display: "flex",
    flex: "1 1 auto",
    backgroundColor: "#fff",
    "& span": {
      maxWidth: "780px",
      width: "100%",
      fontSize: "14px",
      color: "#86868b"
    }
  },
  headerTitleIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
    width: "100%"
  }
};

const Header = ({ classes }) => {
  return (
    <header className={classes.header}>
      <Link to={routes.accountsComparison} className={classes.logo}>
        <img src={logo} alt="rak bank" />
      </Link>
      <div className={classes.headerTitle}>
        <div className={classes.headerTitleIn}>
          <span> RAKstarter Application </span>
        </div>
      </div>
    </header>
  );
};

export default withStyles(styles)(Header);
