import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "32px",
    color: "#373737",
    margin: 0,
    [theme.breakpoints.only("xs")]: {
      marginTop: "60px"
    }
  },
  info: {
    fontSize: 20,
    lineHeight: "26px",
    color: "#373737",
    display: "block",
    marginTop: 10,
    [theme.breakpoints.only("xs")]: {
      fontSize: ({ smallInfo }) => (smallInfo ? 14 : 20),
      marginTop: ({ smallInfo }) => (smallInfo ? 5 : 10)
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
