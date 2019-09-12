import React from "react";
import { withStyles } from "@material-ui/core";
import { servicesSteps } from "../constants";

const styles = {};

class ServicesStepper extends React.Component {
  state = {
    step: 3
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
          return item.step === this.state.step ? (
            <Component key={item.step} goToNext={this.handleContinue} />
          ) : null;
        })}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesStepper);
