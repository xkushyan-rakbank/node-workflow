import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { compose } from "recompose";
import omit from "lodash/omit";
import { withStyles } from "@material-ui/core";
import SubmitApplication from "./SubmitApplication";
import ServicesStepTitle from "../components/ServicesStepTitle";
import BackLink from "../components/Buttons/BackLink";
import SubmitButton from "../components/Buttons/SubmitButton";
import { servicesSteps, accountsNames } from "../constants";
import { getSelectedAccountInfo } from "../store/selectors/selectedAccountInfo";
import { updateAccountType } from "../store/actions/selectedAccountInfo";
import routes from "../routes";
import { getInputValueById } from "../store/selectors/input";
import { getSelectedTypeCurrency } from "../utils/SelectServices";

const style = {
  stepWrapper: { marginBottom: "20px" },
  formWrapper: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    padding: "6px 20px"
  },
  valueAddedServices: {
    padding: 0
  }
};

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

  render() {
    const { classes, accountCurrencies } = this.props;
    const { isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(accountCurrencies);

    return this.state.step === 6 ? (
      <SubmitApplication />
    ) : (
      <>
        <h2>Services for your account</h2>
        <p className="formDescription">
          Enough of us asking. Now it’s your turn to say which services you want, whether it is
          foreign currencies, cards or chequebooks.
        </p>

        <div>
          {servicesSteps.map(item => {
            const Component = item.component;
            const stepData = omit(item, "component");
            return (
              <div key={item.title} className={cx("paper", classes.stepWrapper)}>
                <ServicesStepTitle
                  step={stepData}
                  activeStep={this.state.step}
                  setStep={this.setStep}
                  isShowTitleInfo={this.state.step === 4 && isSelectOnlyForeignCurrency}
                />
                {this.state.step === item.step && (
                  <div
                    className={cx(classes.formWrapper, {
                      [classes.valueAddedServices]: this.state.step === 5
                    })}
                  >
                    <Component goToNext={this.handleContinue} activeStep={this.state.step} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="linkContainer">
          <BackLink path={routes.uploadDocuments} />
          <SubmitButton
            handleClick={() => this.setStep(this.state.step + 1)}
            label={this.state.step === 5 ? "Go to submit" : "Next Step"}
            justify="flex-end"
            classes={{ buttonWrap: classes.buttonWrap }}
            disabled={!this.state.canSubmit}
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
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SelectServices);
