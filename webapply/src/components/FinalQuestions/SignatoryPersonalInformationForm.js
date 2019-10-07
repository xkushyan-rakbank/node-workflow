import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";

const styles = {
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  }
};

class SignatoryPersonalInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  render() {
    return (
      <>
        <Grid spacing={3} container className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="Sig.maritalStatus" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="Sig.mothersMaidenName" indexes={[this.props.index]} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(SignatoryPersonalInformationForm);
