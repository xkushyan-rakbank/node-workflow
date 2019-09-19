import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const style = {
  rootTypography: {
    color: "#373737",
    lineHeight: "1.38",
    letterSpacing: "normal"
  },
  link: {
    color: "#373737",
    lineHeight: "1.38",
    letterSpacing: "normal",
    textDecoration: "underline"
  }
};

const TextHelpWithLink = ({ text, linkText, linkTo, classes, ...props }) => (
  <Typography
    element="span"
    variant="subtitle1"
    classes={{ root: classes.rootTypography }}
    {...props}
  >
    {text}{" "}
    <Link to={linkTo} className={classes.link}>
      {linkText}
    </Link>
  </Typography>
);

export default withStyles(style)(TextHelpWithLink);
