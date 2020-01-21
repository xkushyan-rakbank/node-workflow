import React from "react";
import declinedRegular from "./../../assets/gif/declined_regular.gif";
import { useStyles } from "./styled";

export const ServerRequestLoadingScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.appStatus}>
      <img src={declinedRegular} alt="error" />
    </div>
  );
};
