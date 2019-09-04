import React from "react";
import { withStyles } from "@material-ui/core";
import SubmitApplication from "./SubmitApplication";
import ServicesStepper from "./ServicesStepper";

const style = {
  formWrapper: {
    margin: 0
  }
};

class SelectServices extends React.Component {
  state = {
    canSubmit: false
  };

  render() {
    return this.state.canSubmit ? (
      <SubmitApplication />
    ) : (
      <>
        <h2>Services for your account</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>

        <ServicesStepper
          goToFinish={() => this.setState({ canSubmit: true })}
        />
      </>
    );
  }
}

export default withStyles(style)(SelectServices);
