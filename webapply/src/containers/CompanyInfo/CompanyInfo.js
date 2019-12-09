import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { FormCard } from "../../components/FormCard/FormCard";
import { StepComponent } from "../../components/StepComponent/StepComponent";
import StatusLoader from "../../components/StatusLoader";
import { ContainedButton } from "./../../components/Buttons/ContainedButton";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import companyInfoIcon from "./../../assets/icons/companyInfo.png";
import { getOrganizationInfo, getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import { companyInfoSteps, STEP_1, STEP_3 } from "./constants";
import { useStyles } from "./styled";
import routes from "./../../routes";

export const CompanyInfoPage = ({
  sendProspectToAPI,
  history,
  loading,
  organizationInfo: { companyName }
}) => {
  const classes = useStyles();
  const [step, setStep] = useState(STEP_1);
  const [availableStep, setAvailableStep] = useState(STEP_1);

  const handleClickNextStep = useCallback(() => history.push(routes.stakeholdersInfo), [history]);
  const handleContinue = useCallback(() => {
    sendProspectToAPI().then(
      () => {
        const nextStep = step + 1;
        setStep(nextStep);
        setAvailableStep(nextStep);
      },
      () => {}
    );
  }, [sendProspectToAPI, step]);
  const createSetStepHandler = nextStep => () => {
    if (availableStep >= nextStep) {
      setStep(nextStep);
    }
  };

  return (
    <>
      <h2>Tell Us about Your Company</h2>
      <p className="formDescription">
        Explanation text goes here. One to three short sentences maximum. This is the third
        sentence.
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
            isFilled={availableStep >= item.step}
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
  );
};

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state),
  organizationInfo: getOrganizationInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const CompanyInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInfoPage);
