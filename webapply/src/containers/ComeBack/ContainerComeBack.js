import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  centeredContainer: {
    paddingTop: 90,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  }
};

const ContainerComeBack = ({ classes, ...props }) => (
  <div className={classes.centeredContainer}>{props.children}</div>
);

export default withStyles(style)(ContainerComeBack);
