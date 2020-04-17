import React from "react";

import { Otp } from "../../Otp";

import { useStyles } from "./../styled";

export const ComeBackVerificationComponent = ({ redirectRoute }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Otp redirectRoute={redirectRoute} />
    </div>
  );
};
