import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";

const style = {
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1.9",
    color: "#373737"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    marginTop: "30px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  }
};

class SignatoryEmploymentDetailsForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle
          title="Employment details"
          className={this.props.classes.title}
        />

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigKycd.qualification"
              indexes={[this.props.index]}
            />

            <PureSelect
              id="SigEmpd.employmentType"
              indexes={[this.props.index]}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            {/* not sure ?? "SigKycd.experienceInYrs" or "SigEmpd.totalExperienceYrs" */}
            <TextInput
              id="SigKycd.experienceInYrs"
              indexes={[this.props.index]}
            />
            <TextInput id="SigEmpd.designation" indexes={[this.props.index]} />
          </Grid>
          <Grid item sm={12}>
            <Checkbox label="This Person works at Designit Arabia" />
          </Grid>
          <Grid item sm={12}>
            {/* not sure ?? SigEmpd.employerName id prospect.signatoryInfo[*].employmentDetails.employerName - on design mockups was "Company Name" label*/}
            <TextInput id="SigEmpd.employerName" indexes={[this.props.index]} />
          </Grid>
        </Grid>

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(SignatoryEmploymentDetailsForm);
