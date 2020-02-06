import React, { useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { useReduxStep } from "../../components/StepComponent/useReduxStep";
import { FormCard } from "../../components/FormCard/FormCard";
import { StepComponent } from "../../components/StepComponent/StepComponent";
import StatusLoader from "../../components/StatusLoader";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import {
  sendProspectToAPIPromisify,
  setScreeningError
} from "../../store/actions/sendProspectToAPI";
import { screeningStatusNotRegistered } from "../../constants";
import companyInfoIcon from "./../../assets/icons/companyInfo.svg";
import {
  getApplicantInfo,
  getOrganizationInfo,
  getSendProspectToAPIInfo,
  getIsRegisteredInUAE
} from "../../store/selectors/appConfig";
import { companyInfoSteps, STEP_1, COMPANY_INFO_PAGE_ID } from "./constants";
import { useStyles } from "./styled";
import routes from "./../../routes";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  history,
  loading,
  fullName,
  organizationInfo: { companyName },
  setScreeningError,
  isRegisteredInUAE
}) => {
  const classes = useStyles();
  const [step, handleSetStep, completedSteps, handleSetNextStep] = useReduxStep(
    STEP_1,
    COMPANY_INFO_PAGE_ID
  );

  const handleContinue = () =>
    sendProspectToAPI().then(
      () => {
        if (!isRegisteredInUAE) {
          return setScreeningError(screeningStatusNotRegistered);
        }
        handleSetNextStep();
      },
      () => {}
    );

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const handleClickNextStep = useCallback(() => history.push(routes.stakeholdersInfo), [history]);

  return (
    <>
      <h2 className={classes.pageTitle}>Tell Us about Your Company</h2>
      <p className={classes.username}>Welcome, {fullName}!</p>
      <p className={cx(classes.sectionTitleIndent, classes.username)}>
        Now that we know each other, we want to know a bit more about your company.
      </p>

      <FormCard
        content={
          <>
            <div className={classes.title}>{step !== STEP_1 ? companyName : "Company Name"}</div>
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
            isFilled={completedSteps.some(step => step.id === item.step && step.isCompleted)}
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
          disabled={
            completedSteps.length !== companyInfoSteps.length ||
            completedSteps.some(item => !item.isCompleted)
          }
          handleClick={handleClickNextStep}
          withRightArrow
        />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state),
  fullName: getApplicantInfo(state).fullName,
  organizationInfo: getOrganizationInfo(state),
  isRegisteredInUAE: getIsRegisteredInUAE(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  setScreeningError
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
