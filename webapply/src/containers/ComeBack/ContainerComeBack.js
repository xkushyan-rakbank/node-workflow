import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%"
  }
};

const ContainerComeBack = ({ classes, ...props }) => (
  <div className={classes.centeredContainer}>{props.children}</div>
);

export default withStyles(style)(ContainerComeBack);
