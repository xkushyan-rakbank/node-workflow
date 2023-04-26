import React from "react";
import { Button } from "@material-ui/core";
import { BackLink } from "../../../../components/Buttons/BackLink";
import routes from "../../../../routes";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import StakeholdersDetail from "./StakeholdersDetail";
import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/verify_mobile.svg";
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
        <Button variant="outlined" className={classes.continueBtn}>
          Continue on mobile
        </Button>
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
