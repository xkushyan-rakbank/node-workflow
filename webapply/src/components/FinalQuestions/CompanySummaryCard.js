import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CompanyCard from "../CompanyCard";
import { ContinueButton } from "../Buttons/ContinueButton";
import { LinkButton } from "../Buttons/LinkButton";
import StepComponent from "../../components/StepComponent";
import { getInputValueById } from "../../store/selectors/input";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
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
      step: 1,
      completedStep: 0,
      isExpanded: false,
      isFilled: false,
      isContinueDisabled: true
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.resetStep && this.props.resetStep && this.state.isExpanded) {
      this.setState(state => {
        const nextStep = state.step + 1;
        let finalStepState = {};
        if (nextStep > finalQuestionsSteps.length) {
          finalStepState = { isExpanded: false, isFilled: true };
          this.props.addFilledSignatoryIndex(0);
        }
        return {
          step: nextStep,
          completedStep: state.step,
          ...finalStepState
        };
      });
    }
  }

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

  setStep = item => {
    if (this.state.completedStep >= item.step) {
      this.setState({ step: item.step });
    }
  };

  setIsContinueDisabled = value => this.setState({ isContinueDisabled: value });

  render() {
    const { index } = this.props;
    const { step, isContinueDisabled } = this.state;
    return (
      <CompanyCard companyName={this.props.companyName} controls={this.renderControlsContent()}>
        {this.state.isExpanded &&
          finalQuestionsSteps.map(item => {
            const setStep = () => this.setStep(item);
            const isFilled = this.state.completedStep >= item.step;
            return (
              <StepComponent
                index={index}
                key={item.step}
                steps={finalQuestionsSteps}
                step={item.step}
                title={item.title}
                infoTitle={item.infoTitle}
                activeStep={step === item.step}
                filled={isFilled}
                clickHandler={setStep}
                isContinueDisabled={isContinueDisabled}
                setIsContinueDisabled={this.setIsContinueDisabled}
                handleContinue={this.props.sendProspectToAPI}
              />
            );
          })}
      </CompanyCard>
    );
  }
}

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName"),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanySummaryCard)
);
