import React, { useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { BackLink } from "../../components/Buttons/BackLink";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useStep } from "../../hooks/useStep";
import { FormCard } from "../../components/FormCard/FormCard";
import { StepComponent } from "../../components/StepComponent/StepComponent";
import { getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";
import StatusLoader from "../../components/StatusLoader";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import {
  sendProspectToAPIPromisify,
  setScreeningError
} from "../../store/actions/sendProspectToAPI";
import { CONTINUE, screeningStatusNotRegistered } from "../../constants";
import companyInfoIcon from "./../../assets/icons/companyInfo.svg";
import {
  getApplicantInfo,
  getOrganizationInfo,
  getSendProspectToAPIInfo,
  getIsRegisteredInUAE
} from "../../store/selectors/appConfig";
import { companyInfoSteps, STEP_1, COMPANY_INFO_PAGE_ID } from "./constants";
import { STEP_STATUS } from "../../constants";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import { useStyles } from "./styled";
import routes from "./../../routes";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  loading,
  fullName,
  organizationInfo: { companyName },
  setScreeningError,
  isRegisteredInUAE,
  isComeFromROScreens
}) => {
  const pushHistory = useTrackingHistory();
  const classes = useStyles();
  const [activeStep, availableSteps, handleSetStep, handleSetNextStep] = useStep(
    COMPANY_INFO_PAGE_ID,
    companyInfoSteps
  );
  const isAllStepsCompleted = checkAllStepsCompleted(availableSteps);

  const handleContinue = event => () => {
    sendProspectToAPI(CONTINUE, event).then(
      () => {
        if (!isRegisteredInUAE) {
          return setScreeningError(screeningStatusNotRegistered);
        }
        handleSetNextStep(activeStep);
      },
      () => {}
    );
  };

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
            <div className={classes.title}>
              {activeStep !== STEP_1 ? companyName : "Company Name"}
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
            isActiveStep={activeStep === item.step}
            isFilled={availableSteps.some(
              step => step.step === item.step && step.status === STEP_STATUS.COMPLETED
            )}
            handleClick={createSetStepHandler(item.step)}
            handleContinue={handleContinue(item.eventName)}
            stepForm={item.component}
          />
        ))}
      </FormCard>

      <div className="linkContainer">
        {isComeFromROScreens && <BackLink path={routes.searchProspect} />}
        <ContainedButton
          style={{ padding: "0 32px", borderRadius: "28px" }}
          justify="flex-end"
          label="Next Step"
          disabled={!isAllStepsCompleted}
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
  isRegisteredInUAE: getIsRegisteredInUAE(state),
  isComeFromROScreens: getIsEditableStatusSearchInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  setScreeningError
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
