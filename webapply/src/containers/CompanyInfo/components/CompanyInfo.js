import React from "react";
import cx from "classnames";

import { BackLinkButton } from "../../../components/Buttons/BackLink";
import { FormCard } from "../../../components/FormCard/FormCard";
import { StepComponent } from "../../../components/StepComponent/StepComponent";
import StatusLoader from "../../../components/StatusLoader";
import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { STEP_STATUS } from "../../../constants";

import { companyInfoSteps, STEP_1 } from "../constants";
import { useStyles } from "./styled";

import companyInfoIcon from "../../../assets/icons/companyInfo.svg";

export const CompanyInfo = ({
  fullName,
  companyName,
  activeStep,
  availableSteps,
  isSendingProspect,
  isComeFromROScreens,
  isAllStepsCompleted,
  isLoading,
  handleClickNextStep,
  handleContinue,
  createFormChangeHandler,
  createSetStepHandler,
  kycAnnexureDetails
}) => {
  const classes = useStyles();

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
            {isSendingProspect && <StatusLoader />}
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
            companyName={companyName}
            kycAnnexureDetails={kycAnnexureDetails}
            stepForm={item.component}
          />
        ))}
      </FormCard>

      <div className="linkContainer">
        {isComeFromROScreens && (
          <BackLinkButton
            onClick={() => {
              window.history.go(-2);
            }}
          />
        )}
        <NextStepButton
          justify="flex-end"
          label="Next Step"
          disabled={!isAllStepsCompleted}
          isDisplayLoader={isLoading}
          handleClick={handleClickNextStep}
        />
      </div>
    </>
  );
};
