import React, { useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { useStep } from "../../components/StepComponent/useStep";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
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
import { companyInfoSteps, STEP_1, STEP_3 } from "./constants";
import { useStyles } from "./styled";
import routes from "./../../routes";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  loading,
  fullName,
  organizationInfo: { companyName },
  setScreeningError,
  isRegisteredInUAE
}) => {
  const pushHistory = useTrackingHistory();
  const classes = useStyles();
  const [step, handleSetStep, availableSteps, handleSetNextStep] = useStep(STEP_1);

  const handleContinue = useCallback(
    event => () => {
      sendProspectToAPI(event).then(
        () => {
          if (!isRegisteredInUAE) {
            return setScreeningError(screeningStatusNotRegistered);
          }
          handleSetNextStep();
        },
        () => {}
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const handleClickNextStep = useCallback(() => {
    pushHistory(routes.stakeholdersInfo);
  }, [pushHistory]);

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
          style={{ padding: "0 32px", borderRadius: "28px" }}
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
