import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import PureSelect from "../components/InputField/PureSelect";
import SectionTitle from "../components/SectionTitle";
import SubmitButton from "../components/Buttons/SubmitButton";
import DatePicker from "../components/InputField/DatePicker";
import TextInput from "../components/InputField/TextInput";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import StatusLoader from "../components/StatusLoader";
import validateForm from "../utils/validate";
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
    isFinalScreenShown: false,
    step: 1
  };

  handleContinue = () => {
    if (this.state.step < aboutCompanySteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.setState({ isFinalScreenShown: true });
      this.props.history.push(routes.stakeholdersInfo);
    }
  };

  render() {
    const { classes, index } = this.props;
    const { step, isFinalScreenShown } = this.state;

    return (
      <div className="mainContainer">
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
      </div>
    );
  }
}

export default withStyles(style)(AboutCompany);
