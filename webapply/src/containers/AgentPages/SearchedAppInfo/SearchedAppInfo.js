import React, { useState, useEffect, useCallback, useMemo } from "react";
import get from "lodash/get";
import { FormCard } from "../../../components/FormCard/FormCard";
import { StepComponent } from "../../../components/StepComponent/StepComponent";
import routes from "../../../routes";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { BackLink } from "../../../components/Buttons/BackLink";
import { ConfirmDialog } from "../../../components/Modals";
import { searchedAppInfoSteps, CONFIRM_MESSAGE, STEP_1, STATUS_LOCKED } from "./constants";
import { useStep } from "../../../components/StepComponent/useStep";

import { useStyles } from "./styled";

export const SearchedAppInfoComponent = ({
  searchResults,
  match,
  updateProspectId,
  retrieveDocDetails,
  getProspectInfo,
  setIsApplyEditApplication,
  displayScreenBasedOnViewId,
  prospectInfo
}) => {
  const classes = useStyles();
  const initialAvailableSteps = searchedAppInfoSteps.map(item => item.step);
  const [step, handleSetStep] = useStep(STEP_1, initialAvailableSteps);

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);

  useEffect(() => {
    updateProspectId(match.params.id);
    getProspectInfo(match.params.id);
  }, [updateProspectId, retrieveDocDetails, match.params.id]);

  const redirectUserPage = useCallback(() => {
    setIsDisplayConfirmDialog(true);
  }, [setIsDisplayConfirmDialog]);

  const confirmHandler = useCallback(() => {
    setIsApplyEditApplication({ isApplyEditApplication: true });
    displayScreenBasedOnViewId();
  }, [setIsApplyEditApplication, displayScreenBasedOnViewId]);

  const confirmDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
  }, [setIsDisplayConfirmDialog]);

  const searchResult = useMemo(
    (searchResults.searchResult || []).find(item => item.prospectId === match.params.id),
    [searchResults.searchResult]
  );

  const isDisabled = get(searchResult, "status.reasonCode") === STATUS_LOCKED;
  const fullName = get(searchResult, "applicantInfo.fullName", "");
  const [firstName, lastName] = fullName.split(/\s/);

  return (
    <>
      <h2>Application Details</h2>
      <p className="formDescription" />
      <FormCard
        fullName={fullName}
        firstName={firstName}
        lastName={lastName}
        content={<div className={classes.title}>{fullName}</div>}
      >
        <div className={classes.formContent}>
          {searchedAppInfoSteps.map(item => {
            return (
              <StepComponent
                key={item.step}
                title={item.title}
                subTitle={item.infoTitle}
                isActiveStep={step === item.step}
                isFilled={true}
                handleClick={createSetStepHandler(item.step)}
                hideContinue={true}
                prospectInfo={prospectInfo}
                stepForm={item.component}
              />
            );
          })}
        </div>
      </FormCard>
      <div className="linkContainer">
        <BackLink path={routes.searchProspect} />
        <SubmitButton
          label="Edit"
          justify="flex-end"
          handleClick={redirectUserPage}
          disabled={isDisabled}
        />
      </div>
      <ConfirmDialog
        isOpen={isDisplayConfirmDialog}
        handleConfirm={confirmHandler}
        handleReject={confirmDialogHandler}
        handleClose={confirmDialogHandler}
        message={CONFIRM_MESSAGE}
      />
    </>
  );
};
