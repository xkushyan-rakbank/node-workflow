import React from "react";

import { Icon, ICONS } from "../../Icons";

import { useStyles } from "./styled";

export const ErrorMessage = ({ error }) => {
  const classes = useStyles();

  return (
    <div className={classes.error}>
      <div className={classes.errorContainer}>
        <Icon name={ICONS.error} alt="error" />
        <p>{error}</p>
      </div>
    </div>
  );
};
