import React, { useState, useEffect } from "react";
import CompanyCard from "../../../../components/CompanyCard";
import ContinueButton from "../../../../components/Buttons/ContinueButton";
import LinkButton from "../../../../components/Buttons/LinkButton";
import StepComponent from "../../../../components/StepComponent";
import { finalQuestionsSteps, INITIAL_COMPANY_STEP, INITIAL_SIGNATORY_STEP } from "./constants";
import { usePreviousHook } from "../../../../utils/usePreviousHook";
import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  sendProspectToAPI,
  resetStep,
  addFilledSignatoryIndex
}) => {
  const [step, setStep] = useState(INITIAL_COMPANY_STEP);
  const [completedStep, setCompletedStep] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const prevResetStep = usePreviousHook(resetStep);
  const classes = useStyles();

  useEffect(() => {
    if (prevResetStep || !resetStep || !isExpanded) {
      return;
    }
    const nextStep = step + 1;
    setStep(nextStep);
    setCompletedStep(step);
    if (nextStep > finalQuestionsSteps.length) {
      setIsExpanded(false);
      setIsFilled(true);
      addFilledSignatoryIndex(INITIAL_SIGNATORY_STEP);
    }
  }, [resetStep, isExpanded, addFilledSignatoryIndex, step, prevResetStep]);

  const handleClickStartHere = () => {
    setIsExpanded(true);
    setIsFilled(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  };

  const renderControlsContent = () => {
    if (isExpanded) {
      return null;
    }
    return isFilled ? (
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
    );
  };

  const changeStep = item => {
    if (completedStep >= item.step) {
      setStep(item.step);
    }
  };

  return (
    <CompanyCard companyName={companyName} controls={renderControlsContent()}>
      {isExpanded &&
        finalQuestionsSteps.map(item => {
          return (
            <StepComponent
              index={index}
              key={item.step}
              steps={finalQuestionsSteps}
              step={item.step}
              title={item.title}
              infoTitle={item.infoTitle}
              isActiveStep={step === item.step}
              filled={completedStep >= item.step}
              clickHandler={changeStep}
            />
          );
        })}
    </CompanyCard>
  );
};
