import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  iconsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px -10px"
  }
}));

export const IconCardsContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.iconsWrapper}>{children}</div>;
};
