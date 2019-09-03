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

class AccountDetails extends React.Component {
  render() {
    return (
      <FormWrapper className={this.props.classes.formWrapper}>
        <SectionTitle title="Account details" />

        <Subtitle title="Select currencies" />
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Select id="UI0045" />
          </Grid>
        </Grid>

        <Subtitle title="Select branch" />
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Select id="UI0072" />
          </Grid>
          <Grid item md={6} sm={12}>
            <Select id="UI0074" />
          </Grid>
        </Grid>

        <Subtitle title="Select interest" />
        <Checkbox label="I want to earn interest from my account" />
      </FormWrapper>
    );
  }
}

export default withStyles(style)(AccountDetails);
