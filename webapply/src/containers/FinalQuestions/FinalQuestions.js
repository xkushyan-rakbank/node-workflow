import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";

import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import {
  COMPANY_FIELD_NAME,
  FINAL_QUESTIONS_PAGE
} from "./components/CompanySummaryCard/constants";
import { SIGNATORY_FIELD_NAME } from "./components/SignatorySummaryCard/constants";
import {
  setCompanyStepsComplete,
  setSignatoryStepsComplete
} from "../../store/actions/completedSteps";

import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isCompanyStepsCompleted = useSelector(
    state => state.completedSteps[FINAL_QUESTIONS_PAGE][COMPANY_FIELD_NAME]
  );
  const completedSignatoriesSteps = useSelector(
    state => state.completedSteps[FINAL_QUESTIONS_PAGE][SIGNATORY_FIELD_NAME] || []
  );

  const goToUploadDocument = () => history.push(routes.uploadDocuments);

  const handleFinalStepContinue = (nextIndex, index = null) => {
    setExpandedSignatoryIndex(nextIndex);
    if (index !== null) {
      dispatch(setSignatoryStepsComplete(index, true));
    } else {
      dispatch(setCompanyStepsComplete(true));
    }
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
          isCompanyStepsCompleted={isCompanyStepsCompleted}
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
            !isCompanyStepsCompleted ||
            completedSignatoriesSteps.some(signatoryCompletedSteps => !signatoryCompletedSteps)
          }
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};
