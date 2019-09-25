import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import StatusLoader from "../components/StatusLoader";
import { aboutCompany } from "../store/actions/aboutCompany";
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
    step: 1
  };

  handleContinue = () => {
    if (this.state.step < aboutCompanySteps.length) {
      this.props.aboutCompany();
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.props.history.push(routes.stakeholdersInfo);
    }
  };

  render() {
    const { classes, index } = this.props;
    const { step } = this.state;

    return (
      <>
        <h2>Tell Us about Your Company</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>
        <CompanyStakeholderCard
          content={
            <>
              <div className={classes.title}>Company name</div>
              <StatusLoader />
            </>
          }
        >
          <div className={classes.formContent}>
            {aboutCompanySteps.map(item => {
              const setStep = () => this.setState({ step: item.step });
              return (
                <StepComponent
                  index={index}
                  key={item.step}
                  steps={aboutCompanySteps}
                  step={item.step}
                  title={item.title}
                  subTitle={item.infoTitle}
                  active={step === item.step}
                  filled={step > item.step}
                  clickHandler={setStep}
                  handleContinue={this.handleContinue}
                />
              );
            })}
          </div>
        </CompanyStakeholderCard>
      </>
    );
  }
}

const mapDispatchToProps = {
  aboutCompany
};

export default withStyles(style)(
  connect(
    null,
    mapDispatchToProps
  )(AboutCompany)
);
