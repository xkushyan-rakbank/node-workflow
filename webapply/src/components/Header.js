import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/images/logo.png";
import { withStyles } from "@material-ui/core/styles";

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
    "& span": {
      opacity: " 0.5",
      fontFamily: "Open Sans",
      fontSize: " 14px",
      lineHeight: " 1.71",
      letterSpacing: " normal",
      color: " #373737",
      position: " relative",
      paddingLeft: " 40px",
      marginLeft: " 20px",
      "&:before": {
        content: " '' ",
        position: " absolute",
        left: " 0",
        top: " 50%",
        transform: " translate(0, -50%)",
        width: " 28px",
        height: " 1px",
        opacity: " 0.44",
        backgroundColor: "#9b9b9b"
      }
    }
  }
};

const Header = ({ classes }) => {
  return (
    <header className={classes.header}>
      <Link to="/start-with-the-basics">
        <img src={logo} alt="rak bank" />
      </Link>
      <span> RAKstarter Application</span>
    </header>
  );
};

export default withStyles(styles)(Header);
