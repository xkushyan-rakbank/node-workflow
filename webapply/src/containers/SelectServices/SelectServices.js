import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { compose } from "redux";
import omit from "lodash/omit";
import { withStyles } from "@material-ui/core";

import SubmitApplication from "../SubmitApplication";
import ServicesStepTitle from "../../components/ServicesStepTitle";
import BackLink from "../../components/Buttons/BackLink";
import SubmitButton from "../../components/Buttons/SubmitButton";

import { servicesSteps, accountsNames } from "../../constants/index";
import { getSelectedAccountInfo } from "../../store/selectors/selectedAccountInfo";
import { updateAccountType } from "../../store/actions/selectedAccountInfo";
import { getInputValueById } from "../../store/selectors/input";
import { getSelectedTypeCurrency } from "../../utils/SelectServices";
import routes from "../../routes";

import { styled } from "./styled";

class SelectServices extends React.Component {
  state = {
    canSubmit: false,
    step: 1
  };

  handleContinue = () => {
    if (this.state.step < servicesSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.goToFinish();
    }
  };

  setStep = step => this.setState({ step });

  goToFinish = () => this.setState({ canSubmit: true });

  componentDidUpdate() {
    const { step, canSubmit } = this.state;
    const { accountType, rakValuePackage, accountCurrencies } = this.props;
    const { isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(accountCurrencies);

    if (step === servicesSteps.length && !canSubmit) {
      if (accountType === accountsNames.starter) {
        if (rakValuePackage || isSelectOnlyForeignCurrency) {
          this.setState({
            canSubmit: true
          });
        }
        return;
      }

      this.setState({
        canSubmit: true
      });
    }
  }

  componentDidMount() {
    // TODO remove componentDidMount
    this.props.updateAccountType(accountsNames.currentAccount);
  }

  render() {
    const { classes } = this.props;
    const { step, canSubmit } = this.state;
    const goToSubmitStep = 5;
    const submitApplicationStep = 6;

    return step === submitApplicationStep ? (
      <SubmitApplication />
    ) : (
      <>
        <h2>Services for your account</h2>
        <p className="formDescription">
          Enough of us asking. Now it’s your turn to say which services you want, whether it is
          foreign currencies, cards or chequebooks.
        </p>

        <div>
          {servicesSteps.map(serviceStep => {
            const Component = serviceStep.component;
            const stepData = omit(serviceStep, "component");

            return (
              <div key={serviceStep.title} className={cx("paper", classes.stepWrapper)}>
                <ServicesStepTitle step={stepData} activeStep={step} setStep={this.setStep} />
                {step === serviceStep.step && (
                  <div
                    className={cx(classes.formWrapper, {
                      [classes.valueAddedServices]: step === goToSubmitStep
                    })}
                  >
                    <Component goToNext={this.handleContinue} activeStep={step} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="linkContainer">
          <BackLink path={routes.uploadDocuments} />
          <SubmitButton
            handleClick={() => this.setStep(step + 1)}
            label={step === goToSubmitStep ? "Go to submit" : "Next Step"}
            justify="flex-end"
            classes={{ buttonWrap: classes.buttonWrap }}
            disabled={!canSubmit}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  accountType: getSelectedAccountInfo(state).accountType,
  rakValuePackage: getInputValueById(state, "Appl.rakValuePackage"),
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0])
});

const mapDispatchToProps = {
  updateAccountType
};

export default compose(
  withStyles(styled),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SelectServices);
