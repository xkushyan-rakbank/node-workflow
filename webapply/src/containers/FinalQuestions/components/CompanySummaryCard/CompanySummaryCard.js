import React, { useState } from "react";
import CompanyCard from "../../../../components/CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { finalQuestionsSteps, STEP_1 } from "./constants";
import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({ index, switchExpandedMargin, companyName }) => {
  const filledCompanyStepsSet = new Set();
  const [step, setStep] = useState(STEP_1);
  const [completedSteps, setCompletedSteps] = useState(filledCompanyStepsSet);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const classes = useStyles();

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
    if (!item.isFilled) {
      return;
    }
    setStep(item.step);
  };

  const handleContinue = item => {
    setStep(item.step + 1);
    setCompletedSteps(filledCompanyStepsSet.add(item.step));
  };

  return (
    <CompanyCard companyName={companyName} controls={renderControlsContent()}>
      {isExpanded &&
        finalQuestionsSteps.map(item => {
          const stepIndex = item.step - 1;
          const stepForm = finalQuestionsSteps[stepIndex].component;
          return (
            <StepComponent
              index={index}
              key={item.step}
              steps={finalQuestionsSteps}
              step={item.step}
              title={item.title}
              infoTitle={item.infoTitle}
              isActiveStep={step === item.step}
              isFilled={completedSteps.has(item.step)}
              clickHandler={() => changeStep(item)}
              handleContinue={() => handleContinue(item)}
              stepForm={stepForm}
            />
          );
        })}
    </CompanyCard>
  );
};
