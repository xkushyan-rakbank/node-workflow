import React from "react";

import { useStyles } from "./styled";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";

export const SuccessFilledStakeholder = ({ name }) => {
  const classes = useStyles();
  const { success } = useIconsByAccount();

  return (
    <div className={classes.wrapper}>
      <img width={120} height={125} src={success} alt="SuccessStakeholder" />
      <div className={classes.successTitle}>
        Congrats! You have added
        <br /> <b>{name}</b> as a stakeholder
      </div>
    </div>
  );
};
