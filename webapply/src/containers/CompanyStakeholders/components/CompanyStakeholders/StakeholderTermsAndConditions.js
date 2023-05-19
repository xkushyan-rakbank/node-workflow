import React from "react";
import { useStyles } from "./styled";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { StakeholderKfs } from "./StakeholderKfs";
import { StakeholderAuthorisations } from "./StakeholderAuthorisations";
import { TermsAndConditions } from "./TermsAndConditions";
export const StakeholderTermsAndConditions = () => {
  const classes = useStyles();

  return (
    <>
      <h3 className={classes.mainTitle}>Time for the small print</h3>
      <p className={classes.kfsSubTitle}>Please review the terms and conditions to continue</p>

      <StakeholderKfs />
      <StakeholderAuthorisations />
      <TermsAndConditions />

      <div className="linkContainer">
        <NextStepButton type="button" disabled={true} label="Next" justify="flex-end" />
      </div>
    </>
  );
};
