import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { accountNames, CONTINUE, NEXT, STEP_STATUS, formStepper, SAVE } from "../../constants";
import { useViewId } from "../../utils/useViewId";
import { useStep } from "../../utils/useStep";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import { servicesSteps, SELECT_SERVICES_PAGE_ID, STEP_4, ACCOUNTSIGNTYPE } from "./constants";
import { SelectServices } from "./components/SelectServices";

export const SelectServicesPage = ({
  accountType,
  rakValuePackage,
  signatoriesDetails,
  sendProspectToAPI,
  updateProspect,
  isComeFromROScreens,
  topCustomers,
  otherBankDetails,
  datalist,
  getKycAnnexureBankDetails,
  getKycAnnexureDetails
}) => {
  const pushHistory = useTrackingHistory();
  const dispatch = useDispatch();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(true, true);
  useViewId(true);
  const isComeFromROScreensCheck =
    isComeFromROScreens && isComeFromROScreens === true ? isComeFromROScreens : false;
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(SELECT_SERVICES_PAGE_ID, servicesSteps[isComeFromROScreensCheck]);
  const isAllStepsCompleted = !availableSteps.some(
    step => step.step < STEP_4 && step.status !== STEP_STATUS.COMPLETED
  );

  const isSubmitOnClickNextStepButton = activeStep !== STEP_4;

  useEffect(() => {
    signatoriesDetails &&
      signatoriesDetails.length === 1 &&
      signatoriesDetails[0].accountSigningInfo.accountSigningType === "" &&
      dispatch(
        updateProspect({
          "prospect.signatoryInfo[0].accountSigningInfo.accountSigningType": ACCOUNTSIGNTYPE,
          "prospect.signatoryInfo[0].accountSigningInfo.accountSigningInstn": ""
        })
      );
  }, []);

  useEffect(() => {
    const signatoriesIsShareholder = signatoriesDetails.filter(
      signatory => signatory.kycDetails.isShareholder === true
    );
    const shareholderNationalities = signatoriesIsShareholder.map(
      signatory => signatory.kycDetails.nationality
    );
    const signatoriesName = signatoriesDetails.map(signatory => signatory.fullName);
    const poaCountry = [];
    datalist.poaNationality.map(item => {
      if (shareholderNationalities.includes(item.value)) {
        poaCountry.push(item.value);
      }
    });
    const listOfCountries = [];
    var topCustomersCountries = [];
    topCustomersCountries = topCustomers && topCustomers.map(item => item.country);
    datalist.clientDealingCountry.map(item => {
      if (topCustomersCountries.includes(item.value)) {
        listOfCountries.push(item.value);
      }
    });
    var bankNames = [];
    const bankDetails = [];
    bankNames = otherBankDetails && otherBankDetails.map(item => item.bankName);
    var kycBankDetails = getKycAnnexureBankDetails;
    kycBankDetails =
      bankNames.length > 0 &&
      bankNames.map((item, index) => {
        kycBankDetails = { ...kycBankDetails[index], bankName: item };
        bankDetails.push(kycBankDetails);
        return bankDetails;
      });
    dispatch(
      updateProspect({
        "prospect.kycAnnexure.signatoryName": signatoriesName.join(","),
        "prospect.kycAnnexure.poaCountry": poaCountry,
        "prospect.kycAnnexure.clientDealingCountry": listOfCountries,
        "prospect.kycAnnexure.bankDetails": bankDetails
      })
    );
  }, []);

  const handleClickNextStep = useCallback(() => {
    if (isSubmitOnClickNextStepButton) {
      sendProspectToAPI(NEXT).then(
        isScreeningError => {
          if (!isScreeningError) pushHistory(routes.SubmitApplication, true);
        },
        () => {}
      );
    } else {
      handleSetNextStep(activeStep);
    }
  }, [
    pushHistory,
    isSubmitOnClickNextStepButton,
    handleSetNextStep,
    activeStep,
    sendProspectToAPI
  ]);

  const handleContinue = useCallback(
    event =>
      sendProspectToAPI(CONTINUE, event, SAVE, {
        activeStep,
        flowId: SELECT_SERVICES_PAGE_ID
      }).then(() => handleSetNextStep(activeStep), () => {}),
    [sendProspectToAPI, activeStep, handleSetNextStep]
  );

  const createSetStepHandler = useCallback(
    nextStep => () => {
      handleSetStep(nextStep);
    },
    [handleSetStep]
  );

  const isNextButtonDisabled =
    !isAllStepsCompleted || (accountType === accountNames.starter && !rakValuePackage);

  return (
    <SelectServices
      activeStep={activeStep}
      availableSteps={availableSteps}
      isSubmitOnClickNextStepButton={isSubmitOnClickNextStepButton}
      isNextButtonDisabled={isNextButtonDisabled}
      handleContinue={handleContinue}
      handleClickNextStep={handleClickNextStep}
      createFormChangeHandler={createFormChangeHandler}
      isComeFromROScreensCheck={isComeFromROScreensCheck}
      createSetStepHandler={createSetStepHandler}
    />
  );
};
