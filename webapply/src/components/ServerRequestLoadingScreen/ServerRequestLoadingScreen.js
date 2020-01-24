import React from "react";
import { useStyles } from "./styled";
import { useIconsByAccount } from "../../utils/useIconsByAccount";

export const ServerRequestLoadingScreen = () => {
  const classes = useStyles();
  const { awaiting } = useIconsByAccount();
  return (
    <div className={classes.appStatus}>
      <img src={awaiting} alt="error" />
    </div>
  );
};
