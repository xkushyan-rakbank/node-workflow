import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SectionTitle from "../SectionTitle";
import Select from "../InputField/PureSelect";
import Subtitle from "../Subtitle";
import Checkbox from "../InputField/Checkbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";

const style = {
  formWrapper: {
    margin: 0
  }
};

class SigningPreferences extends React.Component {
  render() {
    return (
      <FormWrapper className={this.props.classes.formWrapper}>
        <SectionTitle title="Account details" />

        <Subtitle title="Select currencies" />

        <Subtitle title="Select branch" />

        <Subtitle title="Select interest" />
        <Checkbox label="I want to earn interest from my account" />
      </FormWrapper>
    );
  }
}

export default withStyles(style)(SigningPreferences);
