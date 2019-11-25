import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import { StepComponent } from "../../components/StakeholderStepForms/StepComponent/StepComponent";
import StatusLoader from "../../components/StatusLoader";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import companyInfoIcon from "./../../assets/icons/companyInfo.png";
import { getOrganizationInfo, getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import { conpanyInfoSteps } from "./constants";
import { useStyles } from "./styled";
import routes from "./../../routes";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  isResetStep,
  history,
  loading,
  organizationInfo: { companyName }
}) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(0);
  const isDisabled = completedStep === conpanyInfoSteps.length;

  useEffect(() => {
    if (isResetStep) {
      const nextStep = step + 1;
      setStep(nextStep);
      setCompletedStep(step);
    }
  }, [isResetStep]);

  const handleClick = () => history.push(routes.stakeholdersInfo);

  const renderContent = () => (
    <>
      <div className={classes.title}>{completedStep >= 1 ? companyName : "Company Name"}</div>
      {loading && <StatusLoader />}
    </>
  );

  const setStepHandler = item => {
    if (completedStep >= item.step) {
      setStep(item.step);
    }
  };

  const handleContinue = () => sendProspectToAPI();

  return (
    <>
      <h2>Tell Us about Your Company</h2>
      <p className="formDescription">
        Explanation text goes here. One to three short sentences maximum. This is the third
        sentence.
      </p>

      <CompanyStakeholderCard content={renderContent()} defaultAvatarIcon={companyInfoIcon}>
        {conpanyInfoSteps.map(item => {
          const clickHandler = () => setStepHandler(item);
          const stepIndex = item.step - 1;
          const stepForm = conpanyInfoSteps[stepIndex].component;
          const isFilled = completedStep >= item.step;

          return (
            <StepComponent
              key={item.step}
              title={item.title}
              subTitle={item.infoTitle}
              isActiveStep={step === item.step}
              isFilled={isFilled}
              clickHandler={clickHandler}
              handleContinue={handleContinue}
              stepForm={stepForm}
            />
          );
        })}
      </CompanyStakeholderCard>

      <div className="linkContainer">
        <ContainedButton
          justify="flex-end"
          label="Next Step"
          disabled={!isDisabled}
          handleClick={handleClick}
          withRightArrow
        />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state),
  isResetStep: state.sendProspectToAPI.resetStep,
  organizationInfo: getOrganizationInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
