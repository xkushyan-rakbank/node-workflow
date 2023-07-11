import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: "32px",
    color: "#1F1F1F",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
      margin: 0,
      marginBottom: "8px"
    }
  },
  info: {
    fontSize: "1rem",
    lineHeight: "28px",
    color: "#757575",
    display: "block",
    marginTop: 10,
    fontWeight: 400,
    [theme.breakpoints.only("xs")]: {
      fontSize: ({ smallInfo }) => (smallInfo ? "0.875rem" : "1.25rem"),
      marginTop: ({ smallInfo }) => (smallInfo ? 5 : 10)
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.25rem",
      margin: 0
    }
  },
  changeLink: {
    display: "block",
    marginTop: 16,
    textDecorationLine: "underline",
    color: "#1F1F1F",
    fontSize: 14,
    lineHeight: "24px"
  }
}));

export const SectionTitleWithInfo = ({ className, title, info, smallInfo = false, changeText }) => {
  const classes = useStyles({ smallInfo });
  return (
    <div className={className}>
      <h3 className={classes.title}>{title}</h3>
      {info && <span className={classes.info}>{info}</span>}
      {changeText && <span className={classes.changeLink}>{changeText}</span>}
    </div>
  );
};
