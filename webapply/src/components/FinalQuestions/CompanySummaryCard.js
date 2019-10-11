import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CompanyCard from "../CompanyCard";
import ContinueButton from "../Buttons/ContinueButton";
import LinkButton from "../Buttons/LinkButton";
import StepComponent from "../../components/StepComponent";
import { getInputValueById } from "../../store/selectors/input";
import { finalQuestionsSteps } from "../../constants";

const style = {
  buttonStyle: {
    position: "absolute",
    left: 0,
    top: "-105px",
    width: "auto",
    padding: "8px 33px 12px 33px"
  }
};

class CompanySummaryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinalScreenShown: false,
      step: 1,
      isExpanded: false,
      isFilled: false,
      isContinueDisabled: true
    };
  }

  handleContinue = () => {
    const { addFilledSignatoryIndex } = this.props;
    if (this.state.step < finalQuestionsSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.setState({ isFinalScreenShown: true, isExpanded: false, isFilled: true });
      addFilledSignatoryIndex(0);
    }
  };

  handleClickStartHere = () => {
    const { switchExpandedMargin } = this.props;
    this.setState({ isExpanded: true, isFilled: true });
    if (switchExpandedMargin) {
      switchExpandedMargin();
    }
  };

  renderControlsContent() {
    const { classes } = this.props;
    if (this.state.isExpanded) {
      return null;
    }
    return this.state.isFilled ? (
      <LinkButton clickHandler={() => this.setState({ isExpanded: true, isFilled: false })} />
    ) : (
      <ContinueButton
        label="Start here"
        classes={{ buttonStyle: classes.buttonStyle }}
        handleClick={this.handleClickStartHere}
      />
    );
  }

  setIsContinueDisabled = value => this.setState({ isContinueDisabled: value });

  render() {
    const { index } = this.props;
    const { step, isContinueDisabled } = this.state;
    return (
      <CompanyCard companyName={this.props.companyName} controls={this.renderControlsContent()}>
        {this.state.isExpanded &&
          finalQuestionsSteps.map(item => {
            const setStep = () => this.setState({ step: item.step });
            return (
              <StepComponent
                index={index}
                key={item.step}
                steps={finalQuestionsSteps}
                step={item.step}
                title={item.title}
                infoTitle={item.infoTitle}
                activeStep={step === item.step}
                filled={step > item.step}
                clickHandler={setStep}
                handleContinue={this.handleContinue}
                isContinueDisabled={isContinueDisabled}
                setIsContinueDisabled={this.setIsContinueDisabled}
              />
            );
          })}
      </CompanyCard>
    );
  }
}

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName")
});

export default withStyles(style)(connect(mapStateToProps)(CompanySummaryCard));
