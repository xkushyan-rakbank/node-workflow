import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "20px",
    color: "#1F1F1F",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
      margin: 0,
      marginBottom: "8px",
      lineHeight: "32px",
    }
  },
  info: {
    fontSize: "1rem",
    lineHeight: "24px",
    color: "#757575",
    display: "block",
    marginTop: 10,
    fontWeight: 400,
    [theme.breakpoints.only("xs")]: {
      fontSize: ({ smallInfo }) => (smallInfo ? "1rem" : "1.25rem"),
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
