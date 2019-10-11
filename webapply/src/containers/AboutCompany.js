import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import StatusLoader from "../components/StatusLoader";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import { sendProspectToAPI } from "../store/actions/sendProspectToAPI";
import { getSendProspectToAPIInfo } from "../store/selectors/appConfig";
import { aboutCompanySteps } from "../constants";
import routes from "./../routes";

const style = {
  sectionTitleIndent: {
    marginBottom: "24px"
  },
  topIndent: {
    marginTop: "40px"
  },
  title: {
    marginLeft: "20px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  }
};

class AboutCompany extends React.Component {
  state = {
    step: 1,
    completedStep: 0
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.resetStep && this.props.resetStep) {
      this.setState(state => {
        const nextStep = state.step + 1;

        return {
          step: nextStep,
          completedStep: nextStep
        };
      });
    }
  }

  handleClick = () => this.props.history.push(routes.stakeholdersInfo);

  setStep = item => {
    if (this.state.completedStep > item.step) {
      this.setState({ step: item.step });
    }
  };

  render() {
    const { classes, index, loading } = this.props;
    const { step, completedStep } = this.state;
    const disabled = completedStep === aboutCompanySteps.length;
    return (
      <>
        <h2>Tell Us about Your Company</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This is the third
          sentence.
        </p>
        <CompanyStakeholderCard
          content={
            <>
              <div className={classes.title}>Company name</div>
              {loading && <StatusLoader />}
            </>
          }
        >
          <div className={classes.formContent}>
            {aboutCompanySteps.map(item => {
              const setStep = () => this.setStep(item);
              const isFilled = this.state.completedStep >= item.step;
              return (
                <StepComponent
                  index={index}
                  key={item.step}
                  steps={aboutCompanySteps}
                  step={item.step}
                  title={item.title}
                  subTitle={item.infoTitle}
                  activeStep={step === item.step}
                  filled={isFilled}
                  clickHandler={setStep}
                  handleContinue={this.props.sendProspectToAPI}
                />
              );
            })}
          </div>
        </CompanyStakeholderCard>

        <div className="linkContainer">
          <BackLink path={routes.verifyOtp} />

          <SubmitButton
            label="Next Step"
            justify="flex-end"
            disabled={!disabled}
            handleClick={this.handleClick}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AboutCompany)
);
