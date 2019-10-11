import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";
import CompanyStakeholderCard from "../CompanyStakeholderCard";
import LinkButton from "../Buttons/LinkButton";
import StepComponent from "../../components/StepComponent";
import { signatoriesSteps } from "../../constants";

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
      isFinalScreenShown: false,
      step: 1,
      isExpanded: false,
      isFilled: false,
      isDisabled: true,
      isContinueDisabled: false
    };
  }

  handleContinue = () => {
    const {
      filledSignatoriesIndexes,
      addFilledSignatoryIndex,
      index,
      signatoriesLength,
      switchSubmitDisabled
    } = this.props;
    const nextIndex = index + 1;
    if (this.state.step < signatoriesSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.setState({ isFinalScreenShown: true, isExpanded: false });
      if (!filledSignatoriesIndexes.includes(nextIndex) && signatoriesLength > nextIndex) {
        addFilledSignatoryIndex(nextIndex);
      } else if (signatoriesLength === nextIndex) {
        switchSubmitDisabled();
      }
    }
  };

  renderControls() {
    const { filledSignatoriesIndexes, index } = this.props;
    if (this.state.isExpanded) {
      return null;
    }

    return (
      (this.state.isFilled || filledSignatoriesIndexes.includes(index)) && (
        <LinkButton
          clickHandler={() =>
            this.setState({
              isExpanded: true,
              isFilled: false,
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
    const { signatory: { firstName, lastName } = {} } = this.props;
    return (
      <div className={this.props.classes.contentBox}>
        <div className={this.props.classes.infoBox}>
          <div className={this.props.classes.name}>
            {firstName} {lastName}
          </div>
          <div className={this.props.classes.signatoryField}>{this.getSignatoryRightsLabel()}</div>
          <div className={this.props.classes.shareholdingField}>{this.getShareholdingLabel()}</div>
        </div>
        <div className={this.props.classes.controlsBox}>{this.renderControls()}</div>
      </div>
    );
  }

  render() {
    const { index, signatory } = this.props;
    const { step, isContinueDisabled } = this.state;
    return (
      <CompanyStakeholderCard
        className={this.props.classes.card}
        firstName={signatory.firstName}
        lastName={signatory.lastName ? signatory.lastName : signatory.fullName}
        content={this.renderCardContent()}
      >
        {this.state.isExpanded &&
          signatoriesSteps.map(item => {
            const setStep = () => this.setState({ step: item.step });
            return (
              <StepComponent
                index={index}
                key={item.step}
                steps={signatoriesSteps}
                step={item.step}
                title={item.title}
                activeStep={step === item.step}
                filled={step > item.step}
                clickHandler={setStep}
                handleContinue={this.handleContinue}
                isContinueDisabled={isContinueDisabled}
                setIsContinueDisabled={this.setIsContinueDisabled}
              />
            );
          })}
      </CompanyStakeholderCard>
    );
  }
}

export default withStyles(styles)(SignatorySummaryCard);
