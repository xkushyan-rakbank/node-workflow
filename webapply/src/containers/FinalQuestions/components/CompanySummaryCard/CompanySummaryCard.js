import React, { useState, useCallback } from "react";
import cx from "classnames";

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
  handleFinalStepContinue,
  sendProspectToAPI,
  expandedSignatoryIndex
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  const handleClickStartHere = useCallback(() => {
    setIsExpanded(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin]);

  const handleSetNotExpanded = () => setIsExpanded(false);

  return (
    <CompanyCard
      companyName={companyName}
      controls={
        !isExpanded &&
        (expandedSignatoryIndex !== null ? (
          <LinkButton clickHandler={() => setIsExpanded(true)} />
        ) : (
          <ContinueButton
            label="Start here"
            classes={{ buttonStyle: classes.buttonStyle }}
            handleClick={handleClickStartHere}
          />
        ))
      }
    >
      <div className={cx({ [classes.hidden]: !isExpanded })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={finalQuestionsSteps}
          setIsNotExpanded={handleSetNotExpanded}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
        />
      </div>
    </CompanyCard>
  );
};
