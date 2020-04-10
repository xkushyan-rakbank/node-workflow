import React from "react";

import { ContainedButton } from "../../../components/Buttons/ContainedButton";
import { useIconsByAccount } from "../../../utils/useIconsByAccount";

import { useStyles } from "./styled";

export const NotFoundComponent = ({ goToHomePage }) => {
  const classes = useStyles();
  const { notFound } = useIconsByAccount();

  return (
    <div className={classes.appStatus}>
      <img
        src={notFound}
        className={classes.appStatusImg}
        alt="NotFound"
        width="auto"
        height={232}
      />
      <span className={classes.appStatusText}>Sorry, we couldn{"'"}t find that page.</span>
      <ContainedButton label="Go to homepage" withRightArrow handleClick={goToHomePage} />
    </div>
  );
};
