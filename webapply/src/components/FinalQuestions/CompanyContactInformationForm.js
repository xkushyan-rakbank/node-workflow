import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";

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

class CompanyContactInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      secondaryPhoneNumber: false
    };
  }

  handleSecondaryPhoneBtnClick = () => {
    this.setState({ secondaryPhoneNumber: true });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle
          title="Preferred contact information"
          className={this.props.classes.title}
        />

        <Grid container>
          <InfoTitle title="Heads up! We can only send chequebooks if you use a phone number from the UAE." />
        </Grid>

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <TextInput
              id="OrgCont.primaryMobileNo"
              select={
                <PureSelect
                  id="OrgCont.primaryMobCountryCode"
                  defaultValue="USA"
                  combinedSelect
                />
              }
            />
            {this.state.secondaryPhoneNumber && (
              <TextInput
                id="OrgCont.primaryPhoneNo"
                select={
                  <PureSelect
                    id="OrgCont.primaryPhoneCountryCode"
                    defaultValue="USA"
                    combinedSelect
                  />
                }
              />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="OrgCont.primaryEmail" />
          </Grid>
        </Grid>

        {!this.state.secondaryPhoneNumber && (
          <AddButton
            onClick={this.handleSecondaryPhoneBtnClick}
            title="Add a landline number"
          />
        )}

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" label="Done" />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(CompanyContactInformationForm);
