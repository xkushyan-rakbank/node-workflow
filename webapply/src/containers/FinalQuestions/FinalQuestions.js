import React, { useState } from "react";
import SubmitButton from "../../components/Buttons/SubmitButton";
import CompanySummaryCard from "./components/CompanySummaryCard/CompanySummaryCard";
import SignatorySummaryCard from "./components/SignatorySummaryCard/SignatorySummaryCard";
import routes from "../../routes";
import BackLink from "../../components/Buttons/BackLink";
import cx from "classnames";
import { useStyles } from "./styled";

export const FinalQuestionsComponent = ({ signatories, history }) => {
  const [expandedMargin, setExpandedMargin] = useState(true);
  const [filledSignatoriesIndexes, setFilledSignatoriesIndexes] = useState([]);
  const classes = useStyles();

  const goToUploadDocument = () => history.push(routes.uploadDocuments);

  const addFilledSignatoryIndex = index => {
    if (!filledSignatoriesIndexes.includes(index)) {
      setFilledSignatoriesIndexes([...filledSignatoriesIndexes, index]);
    }
  };

  const isSubmitDisabled = () => !(filledSignatoriesIndexes.length > signatories.length);

  const switchExpandedMargin = () => setExpandedMargin(prevState => !prevState);

  return (
    <>
      <h2>Final questions</h2>
      <p className={cx(classes.description, { [classes.smallMargin]: !expandedMargin })}>
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
        {signatories.map((item, index) => {
          return (
            <SignatorySummaryCard
              key={index}
              signatory={item}
              index={index}
              addFilledSignatoryIndex={addFilledSignatoryIndex}
              filledSignatoriesIndexes={filledSignatoriesIndexes}
            />
          );
        })}
      </div>
      <div className={classes.linkContainer}>
        <BackLink path={routes.stakeholdersInfo} />
        <SubmitButton
          handleClick={goToUploadDocument}
          label="Next Step"
          classes={{ buttonWrap: classes.buttonWrap }}
          disabled={isSubmitDisabled()}
        />
      </div>
    </>
  );
};
