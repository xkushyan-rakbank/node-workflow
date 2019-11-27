import React, { useState, useCallback } from "react";
import get from "lodash/get";
import CompanyStakeholderCard from "../../../../components/CompanyStakeholderCard";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { useStyles } from "./styled";
import { signatoriesSteps, STEP_1 } from "./constants";

export const SignatorySummaryCardComponent = ({
  resetStep,
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

  const renderControls = () => {
    if (isExpanded) {
      return null;
    }

    return (
      availableSignatoriesIndexes.has(index) && (
        <LinkButton
          clickHandler={() => {
            setIsExpanded(true);
          }}
        />
      )
    );
  };

  const getShareholdingLabel = () => {
    const percentage = Number(get(signatory, "kycDetails.shareHoldingPercentage", 0));
    return percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding";
  };

  const renderCardContent = () => {
    return (
      <div className={classes.contentBox}>
        <div className={classes.infoBox}>
          <div className={classes.name}>
            {firstName && lastName ? `${firstName} ${lastName}` : fullName}
          </div>
          <div className={classes.signatoryField}>
            {get(signatory, "accountSigningInfo.authorityType")}
          </div>
          <div className={classes.shareholdingField}>{getShareholdingLabel()}</div>
        </div>
        <div className={classes.controlsBox}>{renderControls()}</div>
      </div>
    );
  };

  const changeStep = item => {
    if (step <= item.step) {
      return;
    }
    setStep(item.step);
  };

  const handleContinue = useCallback(() => {
    sendProspectToAPI().then(() => {
      setStep(step + 1);
      if (step === signatoriesSteps.length) {
        addAvailableSignatoryIndex(index + 1);
      }
    });
  }, [sendProspectToAPI, step, addAvailableSignatoryIndex, index]);

  return (
    <CompanyStakeholderCard
      className={classes.card}
      firstName={signatory.firstName}
      lastName={signatory.lastName || signatory.fullName}
      content={renderCardContent()}
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
            handleClick={() => changeStep(item)}
            handleContinue={handleContinue}
            stepForm={item.component}
          />
        ))}
    </CompanyStakeholderCard>
  );
};
