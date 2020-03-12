import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "32px",
    color: "#373737",
    margin: 0
  },
  info: {
    fontSize: "20px",
    color: "#373737",
    display: "block",
    marginTop: "10px",
    [theme.breakpoints.only("xs")]: {
      fontSize: "14px"
    }
  }
}));

export const SectionTitleWithInfo = ({ className, title, info, classes: extendedClasses }) => {
  const classes = useStyles({ classes: extendedClasses });
  return (
    <div className={className}>
      <h3 className={classes.title}>{title}</h3>
      {info && <span className={classes.info}>{info}</span>}
    </div>
  );
};
