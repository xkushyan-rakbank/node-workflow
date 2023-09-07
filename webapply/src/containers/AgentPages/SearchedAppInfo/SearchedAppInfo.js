import React, { useState, useEffect, useCallback } from "react";
import get from "lodash/get";
import { useLocation } from "react-router-dom";

import { SearchedAppInfoComponent } from "./components/SearchedAppInfo";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../../FormLayout";
import { useDisplayScreenBasedOnViewId } from "../../../utils/useDisplayScreenBasedOnViewId";
import { searchProspectStepper, APP_STOP_SCREEN_RESULT } from "../../../constants";

import { searchedAppInfoSteps, STEP_1, STATUS_LOCKED, STATUS_FORCE_STOP } from "./constants";

export const SearchedAppInfoContainer = ({
  searchResults,
  match,
  getProspectOverview,
  prospectOverview,
  signatoryInfo,
  getProspectInfo,
  updateProspectId,
  resetProspect
}) => {
  useFormNavigation([false, false, searchProspectStepper]);
  useLayoutParams(true);

  const location = useLocation();
  const receivedFullName = location?.state?.fullName;
  const isFromV2 = location?.state?.isFromV2;

  const initialAvailableSteps = searchedAppInfoSteps.map(item => item.step);
  const [step, setStep] = useState(STEP_1);

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

  return (
    <SearchedAppInfoComponent
      fullName={fullName || receivedFullName}
      isDisabled={isDisabled}
      confirmDialogHandler={confirmDialogHandler}
      confirmHandler={confirmHandler}
      redirectUserPage={redirectUserPage}
      isDisplayConfirmDialog={isDisplayConfirmDialog}
      createSetStepHandler={createSetStepHandler}
      step={step}
      searchResult={searchResult}
      prospectOverview={prospectOverview}
      signatoryInfo={signatoryInfo}
      isFromV2={isFromV2}
    />
  );
};
