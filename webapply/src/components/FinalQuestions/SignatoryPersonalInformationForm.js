import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";

const styles = {
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  }
};

class SignatoryPersonalInformationForm extends Component {
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
        <SectionTitle title="Personal Information" className={this.props.classes.title} />
        <Grid spacing={3} container className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="Sig.maritalStatus" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="Sig.mothersMaidenName" indexes={[this.props.index]} />
          </Grid>
        </Grid>

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(SignatoryPersonalInformationForm);
