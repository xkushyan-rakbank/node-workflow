import React, { useCallback } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { BackLink } from "../../components/Buttons/BackLink";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { useStep } from "../../hooks/useStep";
import { FormCard } from "../../components/FormCard/FormCard";
import { StepComponent } from "../../components/StepComponent/StepComponent";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import StatusLoader from "../../components/StatusLoader";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { getIsEditableStatusSearchInfo } from "../../store/selectors/searchProspect";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import {
  getApplicantInfo,
  getOrganizationInfo,
  getIsSendingProspect
} from "../../store/selectors/appConfig";
import { CONTINUE, NEXT, formStepper, STEP_STATUS } from "../../constants";
import { checkAllStepsCompleted } from "../../utils/checkAllStepsCompleted";
import routes from "./../../routes";

import { companyInfoSteps, STEP_1, COMPANY_INFO_PAGE_ID } from "./constants";
import { useStyles } from "./styled";

import companyInfoIcon from "./../../assets/icons/companyInfo.svg";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  loading,
  fullName,
  organizationInfo: { companyName },
  isComeFromROScreens
}) => {
  useFormNavigation([false, true, formStepper]);

  const pushHistory = useTrackingHistory();
  const classes = useStyles();
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(COMPANY_INFO_PAGE_ID, companyInfoSteps);
  const isAllStepsCompleted = checkAllStepsCompleted(availableSteps);

  const handleContinue = event => () => {
    sendProspectToAPI(CONTINUE, event).then(
      () => {
        handleSetNextStep(activeStep);
      },
      () => {}
    );
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const handleClickNextStep = useCallback(() => {
    sendProspectToAPI(NEXT).then(isScreeningError => {
      if (!isScreeningError) pushHistory(routes.stakeholdersInfo, true);
    });
  }, [pushHistory, sendProspectToAPI]);

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
            createFormChangeHandler={createFormChangeHandler}
            stepForm={item.component}
          />
        ))}
      </FormCard>

      <div className="linkContainer">
        {isComeFromROScreens && <BackLink path={routes.searchProspect} />}
        <NextStepButton
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
  loading: getIsSendingProspect(state),
  fullName: getApplicantInfo(state).fullName,
  organizationInfo: getOrganizationInfo(state),
  isComeFromROScreens: getIsEditableStatusSearchInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
