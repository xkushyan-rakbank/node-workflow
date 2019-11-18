import React, { useState, useEffect } from "react";
import get from "lodash/get";
import CompanyStakeholderCard from "../../../../components/CompanyStakeholderCard";
import LinkButton from "../../../../components/Buttons/LinkButton";
import StepComponent from "../../../../components/StepComponent";
import { usePreviousHook } from "../../../../utils/usePreviousHook";
import { useStyles } from "./styled";
import {
  signatoriesSteps,
  INITIAL_SIGNATORY_STEP,
  SHARE_HOLDING_PERCENTAGE_PATH,
  AUTHORITY_TYPE_PATH
} from "./constants";

export const SignatorySummaryCardComponent = ({
  resetStep,
  addFilledSignatoryIndex,
  sendProspectToAPI,
  index,
  signatory,
  filledSignatoriesIndexes,
  signatory: { firstName, lastName, fullName } = {}
}) => {
  const [step, setStep] = useState(INITIAL_SIGNATORY_STEP);
  const [completedStep, setCompletedStep] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const prevResetStep = usePreviousHook(resetStep);
  const classes = useStyles();

  useEffect(() => {
    if (prevResetStep || !resetStep || !isExpanded) {
      return;
    }
    const nextStep = step + 1;
    setStep(nextStep);
    setCompletedStep(step);
    if (nextStep > signatoriesSteps.length) {
      setIsExpanded(false);
      addFilledSignatoryIndex(index + 1);
    }
  }, [resetStep, isExpanded, addFilledSignatoryIndex, step, prevResetStep, index]);

  const renderControls = () => {
    if (isExpanded) {
      return null;
    }

    return (
      filledSignatoriesIndexes.includes(index) && (
        <LinkButton
          clickHandler={() => {
            setIsExpanded(true);
          }}
        />
      )
    );
  };

  const getShareHoldingPercentage = () => Number(get(signatory, SHARE_HOLDING_PERCENTAGE_PATH, 0));

  const getShareholdingLabel = () => {
    const percentage = getShareHoldingPercentage();
    return percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding";
  };

  const getSignatoryRightsLabel = () => {
    return get(signatory, AUTHORITY_TYPE_PATH);
  };

  const renderCardContent = () => {
    return (
      <div className={classes.contentBox}>
        <div className={classes.infoBox}>
          <div className={classes.name}>
            {firstName && lastName ? `${firstName} ${lastName}` : fullName}
          </div>
          <div className={classes.signatoryField}>{getSignatoryRightsLabel()}</div>
          <div className={classes.shareholdingField}>{getShareholdingLabel()}</div>
        </div>
        <div className={classes.controlsBox}>{renderControls()}</div>
      </div>
    );
  };

  const changeStep = item => {
    if (completedStep >= item.step) {
      this.setState({ step: item.step });
    }
  };

  return (
    <CompanyStakeholderCard
      className={classes.card}
      firstName={signatory.firstName}
      lastName={signatory.lastName ? signatory.lastName : signatory.fullName}
      content={renderCardContent()}
      index={index}
    >
      {isExpanded &&
        signatoriesSteps.map(item => {
          const isFilled = completedStep >= item.step;
          return (
            <StepComponent
              index={index}
              key={item.step}
              steps={signatoriesSteps}
              step={item.step}
              title={item.title}
              activeStep={step === item.step}
              filled={isFilled}
              clickHandler={changeStep}
              handleContinue={sendProspectToAPI}
              isContinueDisabled={isContinueDisabled}
              setIsContinueDisabled={setIsContinueDisabled}
            />
          );
        })}
    </CompanyStakeholderCard>
  );
};
