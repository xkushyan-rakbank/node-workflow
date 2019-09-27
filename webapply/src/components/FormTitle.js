import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
  title: {
    fontSize: "48px",
    lineHeight: "56px"
  },
  info: {
    marginBottom: "60px",
    fontSize: "20px",
    lineHeight: "26px"
  }
};

const FormTitle = ({ classes, title, info }) => (
  <>
    <h2 className={classes.title}>{title}</h2>
    <div className={classes.info}>{info}</div>
  </>
);

export default withStyles(style)(FormTitle);
