import React from "react";

import { useStyles } from "./styled";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";

export const SuccessFilledStakeholder = ({ name }) => {
  const classes = useStyles();
  const videos = useIconsByAccount();

  return (
    <div className={classes.wrapper}>
      <video autoPlay>
        <source src={videos["success"]} />
      </video>
      <div className={classes.successTitle}>
        Congrats! You have added
        <br /> <b>{name}</b> as a stakeholder
      </div>
    </div>
  );
};
