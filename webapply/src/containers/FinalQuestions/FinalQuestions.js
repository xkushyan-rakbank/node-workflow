import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import {
  COMPANY_FIELD_NAME,
  FINAL_QUESTIONS_PAGE,
  finalQuestionsSteps
} from "./components/CompanySummaryCard/constants";
import {
  SIGNATORY_FIELD_NAME,
  signatoriesSteps
} from "./components/SignatorySummaryCard/constants";

import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const classes = useStyles();

  const completedCompanySteps = useSelector(
    state => state.completedSteps[FINAL_QUESTIONS_PAGE][COMPANY_FIELD_NAME] || []
  );
  const completedSignatoriesSteps = useSelector(
    state => state.completedSteps[FINAL_QUESTIONS_PAGE][SIGNATORY_FIELD_NAME] || []
  );

  console.log(completedCompanySteps, completedSignatoriesSteps);

  const goToUploadDocument = () => history.push(routes.uploadDocuments);

  const handleFinalStepContinue = index => {
    setExpandedSignatoryIndex(index);
  };

  const switchExpandedMargin = useCallback(() => setIsExpandedMargin(!isExpandedMargin), [
    setIsExpandedMargin,
    isExpandedMargin
  ]);

  return (
    <>
      <h2>Final questions</h2>
      <p className={cx(classes.description, { [classes.smallMargin]: !isExpandedMargin })}>
        We’re almost there! Here we ask a bit about the background of the company and that of the
        signatories. We promise there’s no more questions after this section.
      </p>
      <div className={classes.sectionContainer}>
        <CompanySummaryCard
          switchExpandedMargin={switchExpandedMargin}
          handleFinalStepContinue={handleFinalStepContinue}
        />
      </div>
      <div className={classes.sectionContainer}>
        {signatories.map((item, index) => (
          <SignatorySummaryCard
            key={index}
            expandedSignatoryIndex={expandedSignatoryIndex}
            signatory={item}
            index={index}
            setExpandedSignatoryIndex={setExpandedSignatoryIndex}
            handleFinalStepContinue={handleFinalStepContinue}
          />
        ))}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <SubmitButton
          disabled={
            completedCompanySteps.length < finalQuestionsSteps.length ||
            completedSignatoriesSteps.some(
              signatoryCompletedSteps => signatoryCompletedSteps.length < signatoriesSteps.length
            )
          }
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};
