import React, { useState } from "react";
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
    if (step <= item.step) {
      return;
    }
    setStep(item.step);
  };

  function handleContinue() {
    sendProspectToAPI();
    setStep(step + 1);
    if (step === finalQuestionsSteps.length) {
      addAvailableSignatoryIndex(SIGNATORY_INITIAL_INDEX);
    }
  }

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
              isFilled={step > item.step}
              clickHandler={() => changeStep(item)}
              handleContinue={handleContinue}
              stepForm={stepForm}
            />
          );
        })}
    </CompanyCard>
  );
};
