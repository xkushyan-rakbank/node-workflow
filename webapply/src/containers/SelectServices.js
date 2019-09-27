import React from "react";
import cx from "classnames";
import omit from "lodash/omit";
import { withStyles } from "@material-ui/core";
import SubmitApplication from "./SubmitApplication";
import ServicesStepTitle from "../components/ServicesStepTitle";
import { servicesSteps } from "../constants";

const style = {
  stepWrapper: { marginBottom: "20px" },
  formWrapper: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    padding: "6px 20px"
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

  render() {
    const { classes } = this.props;
    return this.state.canSubmit ? (
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
                />
                {this.state.step === item.step && (
                  <div className={classes.formWrapper}>
                    <Component goToNext={this.handleContinue} activeStep={this.state.step} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default withStyles(style)(SelectServices);
