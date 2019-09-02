import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { compose } from "recompose";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneIcon from "@material-ui/icons/Done";
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
    step: 1
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.key !== location.key) {
      if (this.state.step < formStepper.length - 2) {
        this.setState(prevState => ({
          step: prevState.step + 1
        }));
      }
    }
  }

  render() {
    const { history, location, classes } = this.props;
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
