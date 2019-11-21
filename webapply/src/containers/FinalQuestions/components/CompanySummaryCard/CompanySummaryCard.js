import React, { useState } from "react";
import CompanyCard from "../../../../components/CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { StepComponent } from "../../../../components/StepComponent/StepComponent";
import { finalQuestionsSteps, STEP_1 } from "./constants";
import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({ index, switchExpandedMargin, companyName }) => {
  const [step, setStep] = useState(STEP_1);
  const [completedStep, setCompletedStep] = useState(null);
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
    setStep(item.step);
    setCompletedStep(item.step);
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
              filled={completedStep >= item.step}
              clickHandler={() => changeStep(item)}
              stepForm={stepForm}
            />
          );
        })}
    </CompanyCard>
  );
};
