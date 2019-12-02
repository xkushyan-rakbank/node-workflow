import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import routes from "../routes";
import logo from "./../assets/images/logo.png";

const styles = {
  header: {
    padding: " 28px 0",
    position: " fixed",
    top: " 0",
    width: " 100%",
    paddingLeft: " 10vw",
    backgroundColor: " #fff",
    zIndex: "2",
    "@media only screen and (max-width: 1100px)": {
      paddingLeft: "5vw"
    },
    "& img": {
      width: "120px"
    },
    "& a": {
      display: "inline-block",
      verticalAlign: "middle"
    },
    "& span1": {
      opacity: " 0.5",
      fontFamily: "Open Sans",
      fontSize: " 14px",
      lineHeight: " 1.71",
      letterSpacing: " normal",
      styles: "bold",
      color: " #373737",
      position: " relative",
      marginRight: " 40px",
      marginLeft: " 450px",
      paddingRight: " 40px"
    },
    "& span": {
      opacity: " 0.5",
      fontFamily: "Open Sans",
      fontSize: " 14px",
      lineHeight: " 1.71",
      letterSpacing: " normal",
      styles: "bold",
      color: " #373737",
      position: " relative",
      marginRight: " 40px",
      paddingRight: " 40px"
    }
  }
};

const Header = ({ classes }) => {
  return (
    <header className={classes.header}>
      <Link to={routes.applicantInfo}>
        <img src={logo} alt="rak bank" />
      </Link>
    </header>
  );
};

export default withStyles(styles)(Header);
