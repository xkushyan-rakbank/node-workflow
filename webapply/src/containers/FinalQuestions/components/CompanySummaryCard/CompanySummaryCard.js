import React, { useState, useCallback } from "react";

import CompanyCard from "../../../../components/CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { finalQuestionsSteps } from "./constants";

import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  addAvailableSignatoryIndex,
  sendProspectToAPI
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const classes = useStyles();

  const handleClickStartHere = useCallback(() => {
    setIsExpanded(true);
    setIsFilled(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin]);

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
      {isExpanded && (
        <FinalQuestionStepComponent
          index={index}
          stepsArray={finalQuestionsSteps}
          addAvailableSignatoryIndex={addAvailableSignatoryIndex}
          sendProspectToAPI={sendProspectToAPI}
        />
      )}
    </CompanyCard>
  );
};
