import React from "react";
import { withStyles } from "@material-ui/core";
import SubmitApplication from "./SubmitApplication";
import SectionTitle from "../components/SectionTitle";
import Select from "../components/InputField/PureSelect";
import Grid from "@material-ui/core/Grid";
import Subtitle from "../components/Subtitle";
import Checkbox from "../components/InputField/Checkbox";
import FormWrapper from "../components/StakeholderStepForms/FormWrapper";
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
    if (this.state.canSubmit) {
      return <SubmitApplication />;
    }
    return (
      <>
        <h2>Services for your account</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>

        <ServicesStepper />
      </>
    );
  }
}

export default withStyles(style)(SelectServices);
