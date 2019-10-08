import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
  iconCardWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: props => (props.minWidth ? props.minWidth : "0"),
    margin: "10px",
    padding: "25px 20px 27px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    textAlign: "center",
    "@media only screen and (max-width: 1300px)": {
      padding: "10px"
    }
  },
  iconCardTitle: {
    paddingTop: "2px",
    paddingBottom: "20px",
    fontSize: "18px",
    fontWeight: "600",
    "@media only screen and (max-width: 1300px)": {
      paddingBottom: "10px"
    }
  },
  iconCardText: {
    fontSize: "16px",
    display: "block",
    width: "100%"
  },
  iconCardImg: {
    paddingBottom: "20px",
    "@media only screen and (max-width: 1300px)": {
      paddingBottom: "10px"
    },
    "& img": {
      width: 60
    }
  }
};

const IconCardItem = ({ classes, children, title, text }) => (
  <div className={classes.iconCardWrapper}>
    {title && <div className={classes.iconCardTitle}>{title}</div>}
    <div className={classes.iconCardImg}>{children}</div>
    <div className={classes.iconCardText}>{text}</div>
  </div>
);

export default withStyles(style)(IconCardItem);
