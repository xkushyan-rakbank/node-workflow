import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
  iconsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px -10px"
  }
};

const IconCardsContainer = ({ classes, children }) => (
  <div className={classes.iconsWrapper}>{children}</div>
);

export default withStyles(style)(IconCardsContainer);
