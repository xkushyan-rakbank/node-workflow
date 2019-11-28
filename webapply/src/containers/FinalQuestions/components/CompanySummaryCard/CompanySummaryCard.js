import React, { useState, useCallback, useEffect } from "react";

import CompanyCard from "../../../../components/CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { finalQuestionsSteps, STEP_1 } from "./constants";
import { SIGNATORY_INITIAL_INDEX } from "../SignatorySummaryCard/constants";
import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  addAvailableSignatoryIndex,
  sendProspectToAPI
}) => {
  const [step, setStep] = useState(STEP_1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (step > finalQuestionsSteps.length) {
      addAvailableSignatoryIndex(SIGNATORY_INITIAL_INDEX);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleClickStartHere = useCallback(() => {
    setIsExpanded(true);
    setIsFilled(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin]);

  const createChangeStepHandler = item => () => {
    if (step > item.step) {
      setStep(item.step);
    }
  };

  const handleContinue = useCallback(() => {
    sendProspectToAPI().then(() => {
      setStep(step + 1);
    });
  }, [sendProspectToAPI, step]);

  return (
    <CompanyCard
      companyName={companyName}
      controls={
        !isExpanded &&
        (isFilled ? (
          <LinkButton
            clickHandler={() => {
              setIsExpanded(true);
              setIsFilled(false);
            }}
          />
        ) : (
          <ContinueButton
            label="Start here"
            classes={{ buttonStyle: classes.buttonStyle }}
            handleClick={handleClickStartHere}
          />
        ))
      }
    >
      {isExpanded &&
        finalQuestionsSteps.map(item => (
          <StepComponent
            index={index}
            key={item.step}
            steps={finalQuestionsSteps}
            step={item.step}
            title={item.title}
            infoTitle={item.infoTitle}
            isActiveStep={step === item.step}
            isFilled={step > item.step}
            handleClick={createChangeStepHandler(item)}
            handleContinue={handleContinue}
            stepForm={item.component}
          />
        ))}
    </CompanyCard>
  );
};
