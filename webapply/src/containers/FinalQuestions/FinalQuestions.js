import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { finalQuestionsSteps } from "./components/CompanySummaryCard/constants";
import {
  getCompletedSignatoriesSteps,
  getCompletedCompanySteps
} from "../../store/selectors/appConfig";

import { useStyles } from "./styled";
import { signatoriesSteps } from "./components/SignatorySummaryCard/constants";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);
  const classes = useStyles();

  const completedCompanySteps = useSelector(getCompletedCompanySteps).steps;
  const completedSignatoriesSteps = useSelector(getCompletedSignatoriesSteps);

  const goToUploadDocument = () => history.push(routes.uploadDocuments);

  const handleFinalStepContinue = nextIndex => {
    setIsCompanyExpanded(false);
    setExpandedSignatoryIndex(nextIndex);
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
        signatories. We promise there are no more questions after this section.
      </p>
      <div className={classes.sectionContainer}>
        <CompanySummaryCard
          switchExpandedMargin={switchExpandedMargin}
          handleFinalStepContinue={handleFinalStepContinue}
          isCompanyStepsCompleted={
            finalQuestionsSteps.length === completedCompanySteps.length &&
            !completedCompanySteps.some(item => !item.isCompleted)
          }
          isCompanyExpanded={isCompanyExpanded}
          setIsCompanyExpanded={setIsCompanyExpanded}
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
            completedSignatoriesSteps={completedSignatoriesSteps}
          />
        ))}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <SubmitButton
          disabled={
            finalQuestionsSteps.length !== completedCompanySteps.length ||
            completedCompanySteps.some(item => !item.isCompleted) ||
            completedSignatoriesSteps.some(
              signatory =>
                signatory.steps.length !== signatoriesSteps.length ||
                signatory.steps.some(item => !item.isCompleted)
            )
          }
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};
