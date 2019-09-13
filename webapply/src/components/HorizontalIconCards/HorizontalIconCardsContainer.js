import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
  iconsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 -10px"
  }
};

const HorizontalIconCardsContainer = ({ classes, children }) => (
  <div className={classes.iconsWrapper}>{children}</div>
);

export default withStyles(style)(HorizontalIconCardsContainer);
