import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SectionTitle from "../SectionTitle";
import Select from "../InputField/PureSelect";
import Subtitle from "../Subtitle";
import Checkbox from "../InputField/Checkbox";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const style = {
  formWrapper: {
    margin: 0
  }
};

class SigningPreferences extends React.Component {
  render() {
    return (
      <FormWrapper
        className={this.props.classes.formWrapper}
        handleContinue={this.props.goToNext}
      >
        <SectionTitle title="Signing transactions" />

        <Subtitle title="Signing transactions" />

        <RadioGroup aria-label="gender" name="gender1">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>

        <Subtitle title="Select branch" />

        <Subtitle title="Select interest" />
        <Checkbox label="I want to earn interest from my account" />
      </FormWrapper>
    );
  }
}

export default withStyles(style)(SigningPreferences);
