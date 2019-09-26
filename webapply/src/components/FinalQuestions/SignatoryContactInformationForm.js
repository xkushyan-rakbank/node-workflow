import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import PureSelect from "../InputField/PureSelect";

const styles = {
  title: {
    fontSize: "16px",
    marginBottom: "20px"
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

class SignatoryContactInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      isAddLandlineNumber: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle title="Preferred contact information" className={this.props.classes.title} />

        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigCont.primaryMobileNo"
              indexes={[this.props.index]}
              select={
                <PureSelect
                  id="SigCont.primaryMobCountryCode"
                  indexes={[this.props.index]}
                  defaultValue="USA"
                  combinedSelect
                />
              }
            />
            {this.state.isAddLandlineNumber && (
              <TextInput
                id="SigCont.primaryPhoneNo"
                indexes={[this.props.index]}
                select={
                  <PureSelect
                    id="SigCont.primaryPhoneCountryCode"
                    indexes={[this.props.index]}
                    defaultValue="USA"
                    combinedSelect
                  />
                }
              />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="SigCont.primaryEmail" indexes={[this.props.index]} />
          </Grid>
        </Grid>

        {!this.state.isAddLandlineNumber && (
          <AddButton
            title="Add a landline number"
            onClick={() => this.setState({ isAddLandlineNumber: true })}
          />
        )}

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" label="Done" />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(SignatoryContactInformationForm);
