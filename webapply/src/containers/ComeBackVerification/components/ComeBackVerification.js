import React from "react";

import { Otp } from "../../Otp";

import { useStyles } from "./../styled";

export const ComeBackVerificationComponent = ({ redirectRoute, otpType }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h3 className={classes.heading}>Confirm that it’s you</h3>
      <Otp redirectRoute={redirectRoute} otpType={otpType} />
    </div>
  );
};
