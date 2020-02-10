import React from "react";
import { withStyles } from "@material-ui/core";

const style = theme => ({
  iconCardWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "calc(50% - 20px)",
    minHeight: "122px",
    margin: "10px",
    padding: "27px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    textAlign: "center",
    boxSizing: "border-box",
    [theme.breakpoints.only("sm")]: {
      margin: "5px auto",
      width: "100%"
    }
  },
  iconCardText: {
    display: "flex",
    flex: "1 1",
    fontSize: "15px",
    textAlign: "left"
  },
  iconCardImg: {
    display: "flex",
    width: "96px",
    height: "56px",
    minWidth: "96px"
  }
});

const HorizontalIconCardItem = ({ classes, children, title, text }) => (
  <div className={classes.iconCardWrapper}>
    <div className={classes.iconCardImg}>{children}</div>
    <div className={classes.iconCardText}>{text}</div>
  </div>
);

export default withStyles(style)(HorizontalIconCardItem);
