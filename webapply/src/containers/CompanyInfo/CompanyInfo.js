import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { differenceInCalendarMonths } from "date-fns";

import { useStep } from "../../components/StepComponent/useStep";
import { FormCard } from "../../components/FormCard/FormCard";
import { StepComponent } from "../../components/StepComponent/StepComponent";
import StatusLoader from "../../components/StatusLoader";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import companyInfoIcon from "./../../assets/icons/companyInfo.png";
import { ApplicationStatus } from "./../../components/ApplicationStatus/ApplicationStatus";
import {
  getApplicantInfo,
  getApplicationInfo,
  getOrganizationInfo,
  getScreeningResults,
  getSendProspectToAPIInfo
} from "../../store/selectors/appConfig";
import { getIsVirtualCurrency } from "./../../store/selectors/companyInfo";
import { companyInfoSteps, STEP_1, STEP_3, companyStatus, DEDUPE } from "./constants";
import { accountsNames, UAE } from "./../../constants";
import { useStyles } from "./styled";
import routes from "./../../routes";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  history,
  loading,
  fullName,
  accountType,
  isVirtualCurrency,
  screeningResults,
  organizationInfo: { companyName, licenseIssueDate, countryOfIncorporation }
}) => {
  const classes = useStyles();
  const [step, handleSetStep, availableSteps, handleSetNextStep] = useStep(STEP_1);
  const [isError, setError] = useState(false);
  const isForeignCompany = countryOfIncorporation && countryOfIncorporation !== UAE;
  let isEligible = false;
  if (licenseIssueDate) {
    const isIssuanceDateCorrect = differenceInCalendarMonths(new Date(), licenseIssueDate) < 12;
    isEligible = !isIssuanceDateCorrect && accountType === accountsNames.starter;
  }
  const isDedup = screeningResults && screeningResults[0].screeningType.includes(DEDUPE);

  const handleContinue = () =>
    sendProspectToAPI().then(
      () => {
        if (isVirtualCurrency || isEligible || isForeignCompany || (isDedup && step === STEP_3)) {
          setError(true);
        }
        handleSetNextStep();
      },
      () => {}
    );

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const handleClickNextStep = useCallback(() => history.push(routes.stakeholdersInfo), [history]);

  const renderStatus = () => {
    switch (isError) {
      case isVirtualCurrency:
        return companyStatus.virtualCurrencies;
      case isEligible:
        return companyStatus.notEligible;
      case isForeignCompany:
        return companyStatus.notRegisteredInUAE;
      case isDedup:
        return companyStatus.dedupe;
      default:
        return;
    }
  };

  return (
    <>
      {isError ? (
        <ApplicationStatus content={renderStatus()} />
      ) : (
        <>
          <h2>Tell Us about Your Company</h2>
          <p className={classes.username}>Welcome, {fullName}!</p>
          <p className={cx(classes.sectionTitleIndent, classes.username)}>
            Now that we know each other, we want to know a bit more about your company.
          </p>

          <FormCard
            content={
              <>
                <div className={classes.title}>
                  {step !== STEP_1 ? companyName : "Company Name"}
                </div>
                {loading && <StatusLoader />}
              </>
            }
            defaultAvatarIcon={companyInfoIcon}
          >
            {companyInfoSteps.map(item => (
              <StepComponent
                key={item.step}
                title={item.title}
                subTitle={item.infoTitle}
                isActiveStep={step === item.step}
                isFilled={availableSteps.includes(item.step)}
                handleClick={createSetStepHandler(item.step)}
                handleContinue={handleContinue}
                stepForm={item.component}
              />
            ))}
          </FormCard>

          <div className="linkContainer">
            <ContainedButton
              justify="flex-end"
              label="Next Step"
              disabled={step <= STEP_3}
              handleClick={handleClickNextStep}
              withRightArrow
            />
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state),
  fullName: getApplicantInfo(state).fullName,
  organizationInfo: getOrganizationInfo(state),
  isVirtualCurrency: getIsVirtualCurrency(state),
  accountType: getApplicationInfo(state).accountType,
  screeningResults: getScreeningResults(state).screeningResults
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
