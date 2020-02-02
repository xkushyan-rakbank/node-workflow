import React, { useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { useStep } from "../../components/StepComponent/useStep";
import { FormCard } from "../../components/FormCard/FormCard";
import { StepComponent } from "../../components/StepComponent/StepComponent";
import StatusLoader from "../../components/StatusLoader";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import companyInfoIcon from "./../../assets/icons/companyInfo.svg";
import { sendGoogleAnalyticsMetrics } from "../../store/actions/googleAnalytics";
import {
  getApplicantInfo,
  getOrganizationInfo,
  getSendProspectToAPIInfo
} from "../../store/selectors/appConfig";
import { companyInfoSteps, STEP_1, STEP_3 } from "./constants";
import { useStyles } from "./styled";
import routes from "./../../routes";
import { GA_EVENTS } from "../../utils/ga";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  history,
  loading,
  fullName,
  sendGoogleAnalyticsMetrics,
  organizationInfo: { companyName }
}) => {
  const classes = useStyles();
  const [step, handleSetStep, availableSteps, handleSetNextStep, handleAnalytics] = useStep(STEP_1);

  const handleContinue = useCallback(
    event => () => {
      sendProspectToAPI().then(
        () => {
          handleSetNextStep();
        },
        () => {}
      );
      handleAnalytics(event);
    },
    [handleSetNextStep, sendProspectToAPI, handleAnalytics]
  );

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const handleClickNextStep = useCallback(() => {
    sendGoogleAnalyticsMetrics(GA_EVENTS.COMPANY_INFORMATION_SUBMITTED);
    history.push(routes.stakeholdersInfo);
  }, [history, sendGoogleAnalyticsMetrics]);

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
            isFilled={availableSteps.includes(item.step)}
            handleClick={createSetStepHandler(item.step)}
            handleContinue={handleContinue(item.event_name)}
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
  );
};

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state),
  fullName: getApplicantInfo(state).fullName,
  organizationInfo: getOrganizationInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  sendGoogleAnalyticsMetrics
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
