import React, { useState, useEffect, useCallback } from "react";
import get from "lodash/get";

import { FormCard } from "../../../components/FormCard/FormCard";
import { StepComponent } from "../../../components/StepComponent/StepComponent";
import routes from "../../../routes";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { BackLink } from "../../../components/Buttons/BackLink";
import { ConfirmDialog } from "../../../components/Modals";
import { disableArrayValues, searchedAppInfoSteps, CONFIRM_MESSAGE, STEP_1 } from "./constants";
import { useStep } from "../../../components/StepComponent/useStep";

import { useStyles } from "./styled";

export const SearchedAppInfoComponent = ({
  searchResults,
  match,
  updateProspectId,
  retrieveDocDetails,
  getProspectInfo
}) => {
  const classes = useStyles();
  const initialAvailableSteps = searchedAppInfoSteps.map(item => item.step);
  const { step, handleSetStep } = useStep(STEP_1, initialAvailableSteps);

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);

  useEffect(() => {
    updateProspectId(match.params.id);
    retrieveDocDetails();
  }, [updateProspectId, retrieveDocDetails, match.params.id]);

  const redirectUserPage = useCallback(() => {
    setIsDisplayConfirmDialog(true);
  }, [setIsDisplayConfirmDialog]);

  const confirmHandler = useCallback(() => {
    getProspectInfo(match.params.id);
  }, [getProspectInfo, match.params.id]);

  const confirmDialogHandler = useCallback(() => {
    setIsDisplayConfirmDialog(false);
  }, [setIsDisplayConfirmDialog]);

  const prospectInfo = (searchResults.searchResult || []).find(
    item => item.prospectId === match.params.id
  );

  if (!prospectInfo) {
    return null;
  }

  return (
    <>
      <h2>Application Details</h2>
      <p className="formDescription" />
      <FormCard
        content={
          <div className={classes.title}>{get(prospectInfo, "applicantInfo.fullName", "")}</div>
        }
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
          disabled={disableArrayValues.includes(prospectInfo.status.statusNotes)}
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
