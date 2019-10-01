import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import StatusLoader from "../components/StatusLoader";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackLink from "../components/Buttons/BackLink";
import { aboutCompany } from "../store/actions/aboutCompany";
import { getAboutCompamyInfo } from "../store/selectors/appConfig";
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
  static defaultProps = {
    index: 0
  };

  state = {
    step: 1,
    completedSteps: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.resetStep !== this.props.resetStep && this.props.resetStep) {
      this.setState(state => {
        const completedSteps = [...state.completedSteps, state.step];
        const step = state.step + 1;

        return {
          step,
          completedSteps
        };
      });
    }
  }

  handleContinue = event => {
    this.props.aboutCompany();
  };

  handleClick = () => this.props.history.push(routes.stakeholdersInfo);

  setStep = item => {
    if (this.state.completedSteps.includes(item.step)) {
      this.setState({ step: item.step });
    }
  };

  isFilled = item => {
    return this.state.completedSteps.includes(item.step);
  };

  render() {
    const { classes, index, loading } = this.props;
    const { step } = this.state;
    const disabled = step === aboutCompanySteps.length;

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
              return (
                <StepComponent
                  index={index}
                  key={item.step}
                  steps={aboutCompanySteps}
                  step={item.step}
                  title={item.title}
                  subTitle={item.infoTitle}
                  active={step === item.step}
                  filled={this.isFilled(item)}
                  clickHandler={setStep}
                  handleContinue={this.handleContinue}
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
            disabled={disabled}
            handleClick={this.handleClick}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...getAboutCompamyInfo(state)
});

const mapDispatchToProps = {
  aboutCompany
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AboutCompany)
);
