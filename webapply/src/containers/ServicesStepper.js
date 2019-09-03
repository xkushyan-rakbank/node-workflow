import React from "react";
import { withStyles } from "@material-ui/core";
import { servicesSteps } from "../constants";

const styles = {
  title: {
    marginLeft: "24px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  },
  formContent: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)"
  }
};

class ServicesStepper extends React.Component {
  state = {
    step: 1
  };

  handleContinue = () => {
    if (this.state.step < servicesSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.setState({ isFinalScreenShown: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { step } = this.state;

    return (
      <div className={classes.formContent}>
        {servicesSteps.map(item => {
          const setStep = () => this.setState({ step: item.step });
          const Component = item.component;
          return item.step === this.state.step ? (
            <Component key={item.step} />
          ) : null;
        })}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesStepper);
