import React from "react";
import { useStyles } from "./styled";
import { useIconsByAccount } from "../../utils/useIconsByAccount";

export const ServerRequestLoadingScreen = () => {
  const classes = useStyles();
  const icons = useIconsByAccount();
  return (
    <div className={classes.appStatus}>
      <img src={icons["awaiting"]} alt="error" />
    </div>
  );
};
