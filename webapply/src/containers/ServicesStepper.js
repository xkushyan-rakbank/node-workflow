import React from "react";
import omit from "lodash/omit";
import { withStyles } from "@material-ui/core";
import { servicesSteps } from "../constants";
import ServicesStepTitle from "../components/ServicesStepTitle";

const styles = {};

class ServicesStepper extends React.Component {
  state = {
    step: 1
  };

  handleContinue = () => {
    if (this.state.step < servicesSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.props.goToFinish();
    }
  };

  render() {
    return (
      <div>
        {servicesSteps.map(item => {
          const Component = item.component;
          const stepData = omit(item, "component");
          return (
            <React.Fragment key={item.title}>
              <ServicesStepTitle step={stepData} activeStep={this.state.step} />
              {this.state.step === item.step && (
                <Component
                  goToNext={this.handleContinue}
                  activeStep={this.state.step}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesStepper);
