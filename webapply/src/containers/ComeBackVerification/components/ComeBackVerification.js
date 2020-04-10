import React from "react";

import { OTPform } from "../../../components/OTPform";

import { useStyles } from "./../styled";

export const ComeBackVerificationComponent = ({ redirectRoute }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <OTPform redirectRoute={redirectRoute} />
    </div>
  );
};
