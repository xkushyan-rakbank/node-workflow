import React from "react";
import { Button } from "@material-ui/core";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import StakeholdersDetail from "./StakeholdersDetail";
import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/Vector.svg";
import { FaceRecognition } from "../../../../components/FaceRecognition/FaceRecognition";
import { UploadFileWrapper } from "../../../../components/UploadFileWrapper/UploadFileWrapper";
import { useStyles } from "./styled";

export const CompanyStakeholdersComponent = ({
  goToFinalQuestions,
  isLoading,
  isDisableNextStep
}) => {
  const classes = useStyles();
  return (
    <>
      <h3 className={classes.mainTitle}>Now let's talk about you</h3>
      <p className={classes.subTitle}>We have to verify your identity to check it's really you</p>
      <div className={classes.verifyMobileWrapper}>
        <div className={classes.descriptionWrapper}>
          <VerifyMobileIcon
            alt="Continue verification on mobile"
            className={classes.verifyMobileIcon}
          />
          <div>
            <h6>Continue verification on mobile browser</h6>
            <p>
              You can do this if you have documents on your phone or want to use your phone's camera
              to scan your face.
            </p>
          </div>
        </div>
        <Button variant="outlined" className={classes.continueBtn}>Continue on mobile</Button>
      </div>

      <div className={classes.horizontalLine} />

      <StakeholdersDetail name={"Anand Sharma"} />

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Emirates ID (both sides)"
          helperText="Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
        />
      </div>

      <div className={classes.uploadComponent}>
        <UploadFileWrapper
          fieldDescription="Passport (photo page)"
          helperText="Supported formats: PDF, JPG, PNG | 5MB max. | 10KB min."
          isStepActive={false}
          disabledReason={"You'll be able to do this step after uploading your Emirates ID."}
        />
      </div>

      <div className={classes.uploadComponent}>
        <FaceRecognition
          fieldDescription="Scan your face"
          helperText="Confirm that your face and photo match via your camera."
          isStepActive={false}
          disabledReason={
            "You'll be able to do this step after uploading your Emirates ID and passport."
          }
        />
      </div>

      {/* <h2>Add your company’s stakeholders</h2>
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
      )} */}
      <div className="linkContainer">
        <BackLink path={routes.companyInfo} />

        <NextStepButton
          handleClick={goToFinalQuestions}
          isDisplayLoader={isLoading}
          disabled={isDisableNextStep}
          label="Next"
          justify="flex-end"
        />
      </div>
    </>
  );
};
