import React, { useState, useCallback, useContext } from "react";
import cx from "classnames";
import { useHistory } from "react-router-dom";

import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { COMPANY_FIELD_NAME, finalQuestionsSteps } from "./components/CompanySummaryCard/constants";
import { StepStateContext } from "../../components/StepComponent/StepStateContext";
import { SIGNATORY_FIELD_NAME } from "./components/SignatorySummaryCard/constants";

import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const state = useContext(StepStateContext);
  const { location } = useHistory();
  const availableCompanySteps = state[location.pathname][COMPANY_FIELD_NAME] || [];
  const availableSignatorySteps = state[location.pathname][SIGNATORY_FIELD_NAME] || [];
  const isAllCompanyStepsCompleted = availableCompanySteps.length === finalQuestionsSteps.length;
  const classes = useStyles();

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
          isAllCompanyStepsCompleted={isAllCompanyStepsCompleted}
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
            availableSignatorySteps={availableSignatorySteps}
          />
        ))}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <SubmitButton
          // disabled={signatories.length >= availableSignatoriesIndexes.length}
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};
