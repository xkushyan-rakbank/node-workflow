import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";
import CompanyStakeholderCard from "../CompanyStakeholderCard";
import LinkButton from "../Buttons/LinkButton";
import StepComponent from "../../components/StepComponent";
import { signatoriesSteps } from "../../constants";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";

const styles = {
  card: {
    marginBottom: "20px"
  },
  contentBox: {
    display: "flex",
    flexGrow: "1",
    paddingLeft: "25px"
  },
  infoBox: {
    flexGrow: "1"
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.33",
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  },
  controlsBox: {
    display: "flex",
    alignItems: "center"
  }
};

class SignatorySummaryCard extends Component {
  static defaultProps = {
    signatory: {},
    index: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      isExpanded: false,
      isDisabled: true,
      isContinueDisabled: false
    };
  }

  componentDidUpdate(prevProps) {
    const { addFilledSignatoryIndex, index } = this.props;
    if (!prevProps.resetStep && this.props.resetStep && this.state.isExpanded) {
      this.setState(state => {
        const nextStep = state.step + 1;
        let finalStepState = {};
        if (nextStep > signatoriesSteps.length) {
          finalStepState = { isExpanded: false };
          addFilledSignatoryIndex(index + 1);
        }
        return {
          step: nextStep,
          completedStep: state.step,
          ...finalStepState
        };
      });
    }
  }

  renderControls() {
    const { filledSignatoriesIndexes, index } = this.props;
    if (this.state.isExpanded) {
      return null;
    }

    return (
      filledSignatoriesIndexes.includes(index) && (
        <LinkButton
          clickHandler={() =>
            this.setState({
              isExpanded: true,
              isDisabled: false
            })
          }
        />
      )
    );
  }

  setIsContinueDisabled = value => this.setState({ isContinueDisabled: value });

  getShareHoldingPercentage() {
    return Number(get(this.props.signatory, "kycDetails.shareHoldingPercentage", 0));
  }

  getShareholdingLabel() {
    const percentage = this.getShareHoldingPercentage();
    return percentage > 0 ? `Shareholding ${percentage}%` : "No shareholding";
  }

  getSignatoryRightsLabel() {
    return get(this.props.signatory, "accountSigningInfo.authorityType");
  }

  renderCardContent() {
    const { signatory: { firstName, lastName, fullName } = {} } = this.props;
    return (
      <div className={this.props.classes.contentBox}>
        <div className={this.props.classes.infoBox}>
          <div className={this.props.classes.name}>
            {firstName && lastName ? `${firstName} ${lastName}` : fullName}
          </div>
          <div className={this.props.classes.signatoryField}>{this.getSignatoryRightsLabel()}</div>
          <div className={this.props.classes.shareholdingField}>{this.getShareholdingLabel()}</div>
        </div>
        <div className={this.props.classes.controlsBox}>{this.renderControls()}</div>
      </div>
    );
  }

  setStep = item => {
    if (this.state.completedStep >= item.step) {
      this.setState({ step: item.step });
    }
  };

  render() {
    const { index, signatory } = this.props;
    const { step, isContinueDisabled } = this.state;
    return (
      <CompanyStakeholderCard
        className={this.props.classes.card}
        firstName={signatory.firstName}
        lastName={signatory.lastName ? signatory.lastName : signatory.fullName}
        content={this.renderCardContent()}
        index={index}
      >
        {this.state.isExpanded &&
          signatoriesSteps.map(item => {
            const setStep = () => this.setStep(item);
            const isFilled = this.state.completedStep >= item.step;
            return (
              <StepComponent
                index={index}
                key={item.step}
                steps={signatoriesSteps}
                step={item.step}
                title={item.title}
                activeStep={step === item.step}
                filled={isFilled}
                clickHandler={setStep}
                handleContinue={this.props.sendProspectToAPI}
                isContinueDisabled={isContinueDisabled}
                setIsContinueDisabled={this.setIsContinueDisabled}
              />
            );
          })}
      </CompanyStakeholderCard>
    );
  }
}

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignatorySummaryCard)
);
