import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
  iconsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "baseline",
    minHeight: "388px"
  }
};

const HorizontalIconCardsContainer = ({ classes, children }) => (
  <div className={classes.iconsWrapper}>{children}</div>
);

export default withStyles(style)(HorizontalIconCardsContainer);
