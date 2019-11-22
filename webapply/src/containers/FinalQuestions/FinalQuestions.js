import React, { useState } from "react";
import cx from "classnames";
import routes from "../../routes";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { CompanySummaryCard } from "./components/CompanySummaryCard";
import { SignatorySummaryCard } from "./components/SignatorySummaryCard";
import { BackLink } from "../../components/Buttons/BackLink";
import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const filledSignatoriesSet = new Set();
  const [isExpandedMargin, setIsExpandedMargin] = useState(true);
  const [filledSignatoriesIndexes, setFilledSignatoriesIndexes] = useState(filledSignatoriesSet);
  const classes = useStyles();

  const goToUploadDocument = () => history.push(routes.uploadDocuments);

  const addFilledSignatoryIndex = index => {
    setFilledSignatoriesIndexes(filledSignatoriesSet.add(index));
  };

  const switchExpandedMargin = () => setIsExpandedMargin(prevState => !prevState);

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
          addFilledSignatoryIndex={addFilledSignatoryIndex}
        />
      </div>
      <div className={classes.sectionContainer}>
        {signatories.map((item, index) => (
          <SignatorySummaryCard
            key={index}
            signatory={item}
            index={index}
            addFilledSignatoryIndex={addFilledSignatoryIndex}
            filledSignatoriesIndexes={filledSignatoriesIndexes}
          />
        ))}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <SubmitButton handleClick={goToUploadDocument} label="Next Step" />
      </div>
    </>
  );
};
