import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";

const style = theme => ({
  iconCardWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: props => (props.minWidth ? props.minWidth : "0"),
    margin: "10px",
    padding: "24px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      padding: "15px",
      margin: "5px"
    },
    "&$horizontal": {
      textAlign: "left",
      flexDirection: "row",
      minWidth: "calc(50% - 20px)",
      "& $iconCardImg": {
        paddingBottom: 0,
        paddingRight: 16
      },
      "@media (max-width: 480px)": {
        minWidth: "calc(100% - 20px)"
      }
    }
  },
  horizontal: {
    boxSizing: "border-box"
  },
  iconCardTitle: {
    paddingTop: "2px",
    paddingBottom: "20px",
    fontSize: "18px",
    fontWeight: "600"
  },
  iconCardText: {
    fontSize: "16px",
    display: "block",
    width: "100%"
  },
  iconCardImg: {
    paddingBottom: 20,
    display: "flex",
    alignItems: "center",
    "& svg": {
      width: 64,
      height: 64
    }
  }
});

const IconCardItem = ({ classes, children, title, text, horizontal }) => (
  <div className={cx(classes.iconCardWrapper, { [classes.horizontal]: horizontal })}>
    {title && <div className={classes.iconCardTitle}>{title}</div>}
    <div className={classes.iconCardImg}>{children}</div>
    <div className={classes.iconCardText}>{text}</div>
  </div>
);

export default withStyles(style)(IconCardItem);
