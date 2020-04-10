import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
      minWidth: "calc(50% - 20px)",
      "& $iconCardImg": {
        paddingBottom: 0,
        paddingRight: 16
      },
      "@media (min-width: 480px)": {
        textAlign: "left",
        flexDirection: "row"
      }
    }
  },
  horizontal: {
    boxSizing: "border-box"
  },
  iconCardTitle: {
    paddingTop: "2px",
    paddingBottom: "20px",
    fontSize: 20,
    lineHeight: "26px",
    fontWeight: "600",
    [theme.breakpoints.only("xs")]: {
      marginRight: "auto"
    }
  },
  iconCardText: {
    fontSize: "16px",
    display: "block",
    width: "100%",
    "@media (max-width: 480px)": {
      marginTop: "10px"
    }
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
}));

export const IconCardItem = ({ children, title, text, horizontal }) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.iconCardWrapper, { [classes.horizontal]: horizontal })}>
      {title && <div className={classes.iconCardTitle}>{title}</div>}
      <div className={classes.iconCardImg}>{children}</div>
      <div className={classes.iconCardText}>{text}</div>
    </div>
  );
};
