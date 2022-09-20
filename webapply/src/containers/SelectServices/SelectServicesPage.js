import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import {
  accountNames,
  CONTINUE,
  NEXT,
  STEP_STATUS,
  formStepper,
  SAVE,
  UPLOADED,
  COMPANY_BANK_STATEMENTS_DOCTYPE
} from "../../constants";
import { useViewId } from "../../utils/useViewId";
import { useStep } from "../../utils/useStep";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import routes from "../../routes";

import {
  servicesSteps,
  SELECT_SERVICES_PAGE_ID,
  STEP_4,
  ACCOUNTSIGNTYPE,
  initialBankDetails
} from "./constants";
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
  kycAnnexureDetails,
  companyName,
  getKycAnnexureBankDetails,
  roAgentName,
  roagentId,
  companyBankStatements
}) => {
  const pushHistory = useTrackingHistory();
  const dispatch = useDispatch();
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(true, true);
  const [singleSignatory, setSingleSignatory] = useState(false);
  useViewId(true);
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(SELECT_SERVICES_PAGE_ID, servicesSteps[isComeFromROScreens]);
  const isAllStepsCompleted = !availableSteps.some(
    step => step.step < STEP_4 && step.status !== STEP_STATUS.COMPLETED
  );
  const isSubmitOnClickNextStepButton = activeStep !== STEP_4;
  var isSignatoryDetail = [];
  useEffect(() => {
    isSignatoryDetail =
      signatoriesDetails &&
      signatoriesDetails.filter(signatory => signatory.kycDetails.isSignatory === true);
    if (
      signatoriesDetails &&
      isSignatoryDetail.length === 1 &&
      signatoriesDetails[0].accountSigningInfo.accountSigningType === ""
    ) {
      dispatch(
        updateProspect({
          "prospect.signatoryInfo[0].accountSigningInfo.accountSigningType": ACCOUNTSIGNTYPE,
          "prospect.signatoryInfo[0].accountSigningInfo.accountSigningInstn": ""
        })
      );
      setSingleSignatory(true);
    } else if (signatoriesDetails && isSignatoryDetail.length === 1) {
      setSingleSignatory(true);
    }
  }, []);
  useEffect(() => {
    var shareholderACompany = [];
    shareholderACompany =
      signatoriesDetails &&
      signatoriesDetails.filter(signatory => signatory.kycDetails.isShareholderACompany === true);
    const isShareholderACompany = shareholderACompany.length > 0 ? "yes" : "";
    const signatoriesIsShareholder =
      signatoriesDetails &&
      signatoriesDetails.filter(signatory => signatory.kycDetails.isShareholder === true);
    const shareholderNationalities =
      signatoriesIsShareholder &&
      signatoriesIsShareholder.map(signatory => signatory.kycDetails.nationality);
    const signatoriesName =
      signatoriesDetails && signatoriesDetails.map(signatory => signatory.fullName);
    const poaCountry = [];
    datalist &&
      datalist.poaNationality.map(item => {
        if (shareholderNationalities && shareholderNationalities.includes(item.value)) {
          poaCountry.push(item.value);
        }
      });
    const listOfCountries = [];
    var topCustomersCountries = [];
    topCustomersCountries = topCustomers && topCustomers.map(item => item.country);
    datalist &&
      datalist.clientDealingCountry.map(item => {
        if (topCustomersCountries.includes(item.value)) {
          listOfCountries.push(item.value);
        }
      });
    var companyBankStatementsArray = [];
    companyBankStatementsArray =
      companyBankStatements &&
      companyBankStatements.documents.filter(
        document =>
          document.documentType === COMPANY_BANK_STATEMENTS_DOCTYPE &&
          document.uploadStatus === UPLOADED
      );
    const isStatementAvailableCheck = companyBankStatementsArray.length > 0 ? "yes" : "";
    var antiMoneyLaunderingCheck = "no";
    const bankDetails = [];
    var bankNames = [];
    bankNames = otherBankDetails && otherBankDetails.map(item => item.bankName);
    bankNames = bankNames.filter(item => item);
    if (bankNames && bankNames.length > 0) {
      antiMoneyLaunderingCheck = "yes";
      const newData = [];
      bankNames.map((item, index) =>
        newData.push({
          bankName:
            getKycAnnexureBankDetails[index] === undefined
              ? item
              : getKycAnnexureBankDetails[index].bankName === ""
              ? item
              : item,

          isStatementAvailable:
            getKycAnnexureBankDetails[index] === undefined
              ? isStatementAvailableCheck
              : getKycAnnexureBankDetails[index].isStatementAvailable === ""
              ? isStatementAvailableCheck
              : isStatementAvailableCheck,
          bankStatementRemark:
            getKycAnnexureBankDetails[index] === undefined
              ? ""
              : getKycAnnexureBankDetails[index].bankStatementRemark === ""
              ? ""
              : getKycAnnexureBankDetails[index].bankStatementRemark,

          bankStatementFrom:
            getKycAnnexureBankDetails[index] === undefined
              ? ""
              : getKycAnnexureBankDetails[index].bankStatementFrom === ""
              ? ""
              : getKycAnnexureBankDetails[index].bankStatementFrom,

          bankStatementTo:
            getKycAnnexureBankDetails[index] === undefined
              ? ""
              : getKycAnnexureBankDetails[index].bankStatementTo === ""
              ? ""
              : getKycAnnexureBankDetails[index].bankStatementTo
        })
      );
      bankDetails.push(...newData);
    } else {
      getKycAnnexureBankDetails.length === 0
        ? bankDetails.push(...initialBankDetails)
        : bankDetails.push(...getKycAnnexureBankDetails);
    }
    const kycSignatory = [];
    const kycSignatoryData = [];
    if (isSignatoryDetail && isSignatoryDetail.length > 0) {
      isSignatoryDetail.map((item, index) =>
        kycSignatoryData.push({
          signatoryName: item.fullName,
          education: item.kycDetails.qualification,
          backgroundInfo: item.employmentDetails.totalExperienceYrs
        })
      );
      kycSignatory.push(...kycSignatoryData);
    }

    dispatch(
      updateProspect({
        "prospect.kycAnnexure.signatoryName": signatoriesName && signatoriesName.join(","),
        "prospect.kycAnnexure.poaCountry": poaCountry,
        "prospect.kycAnnexure.clientDealingCountry": listOfCountries,
        "prospect.kycAnnexure.bankDetails": bankDetails,
        "prospect.kycAnnexure.roName": roAgentName && roAgentName,
        "prospect.kycAnnexure.roEmployeeId": roagentId && roagentId,
        "prospect.kycAnnexure.companyName": companyName,
        "prospect.kycAnnexure.isUltimateBeneficiary": isShareholderACompany,
        "prospect.kycAnnexure.signatoryDetails": kycSignatory,
        "prospect.kycAnnexure.antiMoneyLaundering": antiMoneyLaunderingCheck
      })
    );
  }, [updateProspect]);
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
      isComeFromROScreensCheck={isComeFromROScreens}
      createSetStepHandler={createSetStepHandler}
      bankDetails={getKycAnnexureBankDetails}
      singleSignatory={singleSignatory}
    />
  );
};
