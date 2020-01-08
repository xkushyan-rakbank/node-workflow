import React, { useState, useCallback, useEffect } from "react";
import cx from "classnames";

import { CompanyCard } from "../CompanyCard";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { FinalQuestionStepComponent } from "../FinalQuestionStepComponent";
import { finalQuestionsSteps, COMPANY_FIELD_NAME, STEP_1 } from "./constants";

import { useStyles } from "./styled";

export const CompanySummaryCardComponent = ({
  index,
  switchExpandedMargin,
  companyName,
  handleFinalStepContinue,
  sendProspectToAPI,
  isAllCompanyStepsCompleted
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (isAllCompanyStepsCompleted) {
      setIsExpanded(false);
    }
  }, [isAllCompanyStepsCompleted]);

  const handleClickStartHere = useCallback(() => {
    setIsExpanded(true);
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  }, [switchExpandedMargin]);

  const handleExpandNextBlock = () => setIsExpanded(false);

  return (
    <CompanyCard
      companyName={companyName}
      controls={
        !isExpanded &&
        (isAllCompanyStepsCompleted ? (
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
      <div className={cx({ hidden: !isExpanded })}>
        <FinalQuestionStepComponent
          index={index}
          stepsArray={finalQuestionsSteps}
          handleExpandNextBlock={handleExpandNextBlock}
          handleFinalStepContinue={handleFinalStepContinue}
          sendProspectToAPI={sendProspectToAPI}
          fieldName={COMPANY_FIELD_NAME}
          initialStep={isAllCompanyStepsCompleted ? null : STEP_1}
        />
      </div>
    </CompanyCard>
  );
};
