import React from "react";
import { ContexualHelp, ErrorMessage } from "../../../../components/Notifications";
import { Icon, ICONS } from "../../../../components/Icons";
import { StakeholderStepper } from "../StakeholderStepper/StakeholderStepper";
import { AddStakeholderButton } from "../AddStakeholderButton/AddStakeholderButton";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";

import { useStyles } from "./styled";

export const CompanyStakeholdersComponent = ({
  stakeholders,
  editableStakeholder,
  handleDeleteStakeholder,
  isSendingProspect,
  addNewStakeholder,
  percentage,
  goToFinalQuestions,
  isLoading,
  isDisableNextStep,
  isSignatoryErrorDisplayed,
  isLowPercentageErrorDisplayed
}) => {
  const classes = useStyles();
  return (
    <>
      <h2>Add your company’s stakeholders</h2>
      <p className="formDescription">
        Now we need to know about the key people in your company. This includes shareholders,
        partners, signatories/Power of Attorney. Check our guide below to see which one applies to
        your company
      </p>
      <div className={classes.stakeholdersTitleWrapper}>
        <ContexualHelp
          title={
            <>
              This stakeholder should be defined / mentioned in valid legal document of the Company.
              <br />
              <b>Examples:</b>
              <br />- Sole Proprietorship Company &gt; Trade License
              <br />- Partnership Company &gt; Trade License / Partners agreement / Share
              Certificate, etc
              <br />- Limited Liability Company (LLC) &gt; Trade License / Memorandum of Association
              / Articles of Association, etc
            </>
          }
          placement="right"
          isDisableHoverListener={false}
        >
          <span className={classes.questionIcon}>
            <Icon name={ICONS.question} alt="question" className={classes.iconSize} />
          </span>
        </ContexualHelp>
        <span className={classes.stakeholderTitle}>Who is a stakeholder?</span>
      </div>
      <div>
        {stakeholders.map((stakeholder, index) => (
          <StakeholderStepper
            stakeholder={stakeholder}
            key={stakeholder.id}
            deleteStakeholder={handleDeleteStakeholder}
            orderIndex={index}
          />
        ))}
      </div>
      {stakeholders.length > 0 && editableStakeholder === null && (
        <div className={classes.buttonsWrapper}>
          <AddStakeholderButton disabled={isSendingProspect} handleClick={addNewStakeholder} />
        </div>
      )}
      {isSignatoryErrorDisplayed && (
        <ErrorMessage error="At least one signatory is required. Edit Signatory rights or Add new stakeholder." />
      )}
      {isLowPercentageErrorDisplayed && (
        <ErrorMessage
          error={`Shareholders ${percentage}% is less than 100%, either add a new stakeholder
          or edit the shareholding % for the added stakeholders.`}
        />
      )}
      <div className="linkContainer">
        <BackLink path={routes.companyInfo} />

        <NextStepButton
          handleClick={goToFinalQuestions}
          isDisplayLoader={isLoading}
          disabled={isDisableNextStep}
          label="Next Step"
          justify="flex-end"
        />
      </div>
    </>
  );
};
