import React, { useState, useCallback } from "react";
import cx from "classnames";
import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [availableSignatoriesIndexes, setAvailableSignatoriesIndexes] = useState([]);
  const [expandedSignatoryIndex, setExpandedSignatoryIndex] = useState(null);
  const classes = useStyles();

  const goToUploadDocument = () => history.push(routes.uploadDocuments);

  const addAvailableSignatoryIndex = useCallback(
    index => {
      if (!availableSignatoriesIndexes.includes(index)) {
        setAvailableSignatoriesIndexes([...availableSignatoriesIndexes, index]);
      }
    },
    [setAvailableSignatoriesIndexes, availableSignatoriesIndexes]
  );

  const handleFinalStepContinue = index => {
    setExpandedSignatoryIndex(index);
    addAvailableSignatoryIndex(index);
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
          expandedSignatoryIndex={expandedSignatoryIndex}
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
            availableSignatoriesIndexes={availableSignatoriesIndexes}
          />
        ))}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <SubmitButton
          disabled={signatories.length >= availableSignatoriesIndexes.length}
          handleClick={goToUploadDocument}
          label="Next Step"
        />
      </div>
    </>
  );
};
