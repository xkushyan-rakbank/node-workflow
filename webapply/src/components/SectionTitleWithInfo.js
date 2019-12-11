import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../constants";

const style = {
  title: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737",
    margin: 0
  },
  info: {
    fontSize: "20px",
    color: "#373737",
    display: "block",
    marginTop: "10px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      fontSize: "14px"
    }
  }
};

const SectionTitleWithInfo = ({ title, info, classes }) => (
  <>
    <h3 className={classes.title}>{title}</h3>
    <span className={classes.info}>{info}</span>
  </>
);

export default withStyles(style)(SectionTitleWithInfo);
