import React from "react";
import { withStyles } from "@material-ui/core";
import Subtitle from "../Subtitle";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InfoTitle from "../InfoTitle";
import PureSelect from "../InputField/PureSelect";
import TextInput from "../InputField/TextInput";
import Grid from "@material-ui/core/Grid";
import AddButton from "../Buttons/AddButton";

const style = {
  formWrapper: {
    margin: 0
  },
  radio: {
    color: "#517085"
  },
  contactsTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  addButton: {
    marginTop: "12px"
  },
  radioLabel: {
    "& > span": {
      fontSize: "14px"
    }
  }
};

class SigningPreferences extends React.Component {
  state = {
    contactPersons: [""]
  };

  handleAddPerson = () => {
    const contactPersons = this.state.contactPersons;
    if (contactPersons.length === 1) {
      contactPersons.push("");
      this.setState({ contactPersons });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <FormWrapper className={classes.formWrapper} handleContinue={this.props.goToNext}>
        <Subtitle title="Signing transactions" />

        <RadioGroup name="signing_transactions">
          <div className="box-group-grid">
            <FormControlLabel
              value="all"
              control={
                <Radio color="secondary" classes={{ root: classes.radio }} />}

              className={classes.radioLabel}
              label="All of us must sign"
            />
            <FormControlLabel
              value="any"
              control={
                <Radio color="secondary" classes={{ root: classes.radio }} />
              }
              className={classes.radioLabel}
              label="Any of us can sign"
            />
            <FormControlLabel
              value="other"
              control={
                <Radio color="secondary" classes={{ root: classes.radio }} />
              }
              className={classes.radioLabel}
              label="Other (please specify)"
            />
          </div>
        </RadioGroup>

        <div className={classes.contactsTitle}>
          <Subtitle title="Contacts for re-confirming transactions" />
          <InfoTitle title="Maximum two people" />
        </div>

        {this.state.contactPersons.map((person, index) => (
          <React.Fragment key={index}>
            <TextInput id="Sig.fullName" indexes={[index]} />
            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <TextInput
                  id="OrgContReconf.primaryMobileNo"
                  indexes={[index]}
                  select={
                    <PureSelect
                      id="OrgContReconf.primaryMobCountryCode"
                      indexes={[index]}
                      combinedSelect
                    />
                  }
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextInput
                  id="OrgContReconf.primaryPhoneNo"
                  indexes={[index]}
                  select={
                    <PureSelect
                      id="OrgContReconf.primaryPhoneCountryCode"
                      indexes={[index]}
                      combinedSelect
                    />
                  }
                />
              </Grid>
            </Grid>
          </React.Fragment>
        ))}

        <AddButton
          title="Add another person"
          onClick={this.handleAddPerson}
          className={classes.addButton}
        />
      </FormWrapper>
    );
  }
}

export default withStyles(style)(SigningPreferences);
