import React, { useState, useCallback, useEffect } from "react";
import get from "lodash/get";

import CompanyStakeholderCard from "../../../../components/CompanyStakeholderCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps, STEP_1 } from "./constants";

export const SignatorySummaryCardComponent = ({
  addAvailableSignatoryIndex,
  sendProspectToAPI,
  index,
  signatory,
  availableSignatoriesIndexes,
  signatory: { firstName, lastName, fullName } = {}
}) => {
  const [step, setStep] = useState(STEP_1);
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (step === signatoriesSteps.length) {
      addAvailableSignatoryIndex(index + 1);
    }
  }, [step]);

  const createChangeStepHandler = item => () => {
    if (step > item.step) {
      setStep(item.step);
    }
  };

  const handleContinue = useCallback(() => {
    sendProspectToAPI().then(() => {
      setStep(step + 1);
    });
  }, [sendProspectToAPI, step, addAvailableSignatoryIndex, index]);

  const percentage = parseInt(get(signatory, "kycDetails.shareHoldingPercentage", 0), 10);

  return (
    <CompanyStakeholderCard
      className={classes.card}
      firstName={signatory.firstName}
      lastName={signatory.lastName || signatory.fullName}
      content={
        <div className={classes.contentBox}>
          <div className={classes.infoBox}>
            <div className={classes.name}>
              {firstName && lastName ? `${firstName} ${lastName}` : fullName}
            </div>
            <div className={classes.signatoryField}>
              {get(signatory, "accountSigningInfo.authorityType")}
            </div>
            <div className={classes.shareholdingField}>
              {percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding"}
            </div>
          </div>
          <div className={classes.controlsBox}>
            {!isExpanded && availableSignatoriesIndexes.has(index) && (
              <LinkButton
                clickHandler={() => {
                  setIsExpanded(true);
                }}
              />
            )}
          </div>
        </div>
      }
      index={index}
    >
      {isExpanded &&
        signatoriesSteps.map(item => (
          <StepComponent
            index={index}
            key={item.step}
            steps={signatoriesSteps}
            step={item.step}
            title={item.title}
            isActiveStep={step === item.step}
            isFilled={step > item.step}
            handleClick={createChangeStepHandler(item)}
            handleContinue={handleContinue}
            stepForm={item.component}
          />
        ))}
    </CompanyStakeholderCard>
  );
};
