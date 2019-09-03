import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import FormNavigationStep from "./FormNavigationStep";
import Chat from "./Chat";
import { formStepper } from "./../constants";
import backgroundImage from "./../assets/images/background-blob.svg";
import { withStyles } from "@material-ui/core/styles";

const style = {
  formNav: {
    flex: "0 0 664px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "30% 0",
    zIndex: "11",
    "@media only screen and (max-width: 1300px)": {
      flex: "0 0 45%",
      backgroundPosition: "25% 0"
    },
    "& ul": {
      margin: "0",
      padding: "0",
      paddingRight: "57px"
    }
  }
};

class FormNavigation extends React.Component {
  state = {
    step: (this.getRouteConfig() || {}).step || 1
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.key !== location.key) {
      this.updateStepState();
    }
  }

  getRouteConfig() {
    const {
      location: { pathname }
    } = this.props;
    return formStepper.find(item =>
      [item.path, item.relatedPath].some(path => pathname === path)
    );
  }

  updateStepState() {
    const { step = 1 } = this.getRouteConfig() || {};
    if (step !== this.state.step) {
      this.setState({ step });
    }
  }

  render() {
    const { location, classes } = this.props;
    const { step } = this.state;
    return (
      <div className={classes.formNav}>
        <ul>
          {formStepper.map(item => (
            <FormNavigationStep
              key={item.step}
              title={item.title}
              activeStep={
                location.pathname === item.path ||
                location.pathname === item.relatedPath
              }
              filled={step > item.step}
            />
          ))}
        </ul>

        <Chat />
      </div>
    );
  }
}

export default compose(
  withStyles(style),
  withRouter
)(FormNavigation);
