import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
  iconCardWrapper: {
    display: "flex",
    flex: "1 1",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "285px",
    margin: "10px 10px 10px 0",
    padding: "27px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    textAlign: "center",
    "@media only screen and (max-width: 1300px)": {
      padding: "5px 20px"
    },
    "@media only screen and (max-height: 800px)": {
      margin: "5px"
    }
  },
  iconCardText: {
    display: "flex",
    flex: "1 1",
    fontSize: "16px",
    textAlign: "left",
    "@media only screen and (max-height: 800px)": {
      fontSize: "14px"
    }
  },
  iconCardImg: {
    display: "flex",
    width: "96px",
    height: "56px",
    minWidth: "96px"
  }
};

const HorizontalIconCardItem = ({ classes, children, title, text }) => (
  <div className={classes.iconCardWrapper}>
    <div className={classes.iconCardImg}>{children}</div>
    <div className={classes.iconCardText}>{text}</div>
  </div>
);

export default withStyles(style)(HorizontalIconCardItem);
