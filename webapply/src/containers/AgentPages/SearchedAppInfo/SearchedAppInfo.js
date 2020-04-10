import React, { useState, useEffect, useCallback } from "react";
import get from "lodash/get";

import { FormCard } from "../../../components/FormCard/FormCard";
import { StepComponent } from "../../../components/StepComponent/StepComponent";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { BackLink } from "../../../components/Buttons/BackLink";
import { ConfirmDialog } from "../../../components/Modals";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { useDisplayScreenBasedOnViewId } from "../../../utils/useDisplayScreenBasedOnViewId";
import { searchProspectStepper, APP_STOP_SCREEN_RESULT } from "../../../constants";
import routes from "../../../routes";

import {
  searchedAppInfoSteps,
  CONFIRM_MESSAGE,
  STEP_1,
  STATUS_LOCKED,
  STATUS_FORCE_STOP
} from "./constants";
import { useStyles } from "./styled";

export const SearchedAppInfoComponent = ({
  searchResults,
  match,
  getProspectOverview,
  prospectOverview,
  getProspectInfo,
  updateProspectId,
  resetProspect
}) => {
  const classes = useStyles();
  const initialAvailableSteps = searchedAppInfoSteps.map(item => item.step);
  const [step, setStep] = useState(STEP_1);
  useFormNavigation([false, false, searchProspectStepper]);

  const handleSetStep = nextStep => {
    if (initialAvailableSteps.includes(nextStep)) {
      setStep(nextStep);
    } else if (!nextStep) {
      setStep(null);
    }
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);

  useEffect(() => {
    resetProspect();
    getProspectOverview(match.params.id);
  }, [match.params.id, getProspectOverview, resetProspect]);

  const redirectUserPage = useCallback(() => {
    setIsDisplayConfirmDialog(true);
  }, [setIsDisplayConfirmDialog]);

  const { pushDisplayScreenToHistory } = useDisplayScreenBasedOnViewId();

  const confirmHandler = useCallback(() => {
    updateProspectId(match.params.id);
    return getProspectInfo(match.params.id).then(
      () => pushDisplayScreenToHistory(prospectOverview),
      () => {}
    );
  }, [
    pushDisplayScreenToHistory,
    prospectOverview,
    updateProspectId,
    getProspectInfo,
    match.params.id
  ]);

  const confirmDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
  }, [setIsDisplayConfirmDialog]);

  const searchResult = searchResults.find(item => item.prospectId === match.params.id);
  const isDisabled =
    get(searchResult, "status.reasonCode") === STATUS_LOCKED ||
    get(prospectOverview, "organizationInfo.screeningInfo.statusOverAll") ===
      APP_STOP_SCREEN_RESULT ||
    get(searchResult, "status.statusType") === STATUS_FORCE_STOP;

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
                prospectOverview={prospectOverview}
                stepForm={item.component}
                searchResult={searchResult}
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
