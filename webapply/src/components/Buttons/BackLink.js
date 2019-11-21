import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import arrowBack from "./../../assets/icons/backArrow.png";

const style = {
  container: {
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
    "& img": {
      width: "18px"
    }
  },
  text: {
    fontSize: "14px",
    color: "#373737",
    fontWeight: "600",
    textDecoration: "underline"
  }
};

const BackLink = ({ classes, path }) => (
  <Link className={classes.container} to={path}>
    <img src={arrowBack} alt="back" />
    <span className={classes.text}>Go back</span>
  </Link>
);

export default withStyles(style)(BackLink);
