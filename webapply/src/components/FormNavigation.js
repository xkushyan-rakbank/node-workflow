import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import FormNavigationStep from "./FormNavigationStep";
import Chat from "./Chat";
import { formStepper } from "./../constants";
import backgroundImage from "./../assets/images/background-red-blob-slice.svg";
import { withStyles } from "@material-ui/core/styles";

const style = {
  formNav: {
    flex: "0 0 530px",
    position: "relative",
    paddingTop: "180px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    zIndex: "11",
    "@media only screen and (max-width: 1300px)": {
      flex: "0 0 45%"
    },
    "& ul": {
      margin: "0",
      padding: "5px 0 0 20px",
      marginLeft: "80px",
      height: "271px",
      overflowY: "auto",
      direction: "rtl",
      "@media only screen and (max-width: 1300px)": {
        marginLeft: "40px"
      },
      "&::-webkit-scrollbar": {
        width: "2px",
        height: "5px"
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 1px rgba(255,255,255, 0.4)",
        backgroundColor: "rgba(255,255,255, 0.4)"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#fff",
        outline: "1px solid red"
      },
      "& li": {
        direction: "ltr"
      }
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
