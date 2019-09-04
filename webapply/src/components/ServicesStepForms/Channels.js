import React from "react";
import { withStyles } from "@material-ui/core";
import SectionTitle from "../SectionTitle";
import Subtitle from "../Subtitle";
import Checkbox from "../InputField/Checkbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";

const style = {
  formWrapper: {
    margin: 0
  }
};

class AccountDetails extends React.Component {
  render() {
    return (
      <FormWrapper
        className={this.props.classes.formWrapper}
        handleContinue={this.props.goToNext}
      >
        <SectionTitle title="Account details" />

        <Subtitle title="Select currencies" />

        <Subtitle title="Select branch" />

        <Subtitle title="Select interest" />
        <Checkbox label="I want to earn interest from my account" />
      </FormWrapper>
    );
  }
}

export default withStyles(style)(AccountDetails);
