import React from "react";

import { ContainedButton } from "../../../components/Buttons/ContainedButton";
import { useIconsByAccount } from "../../../utils/useIconsByAccount";

import { useStyles } from "./styled";

import { ReactComponent as Arrow } from "../../../assets/icons/whiteArrow.svg";

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
      <ContainedButton
        label={
          <span className={classes.buttonText}>
            Go to homepage <Arrow alt="arrow" />
          </span>
        }
        handleClick={goToHomePage}
      />
    </div>
  );
};
