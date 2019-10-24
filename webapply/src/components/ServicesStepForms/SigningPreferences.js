import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import Subtitle from "../Subtitle";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import RadioGroup from "@material-ui/core/RadioGroup";
import InfoTitle from "../InfoTitle";
import PureSelect from "../InputField/PureSelect";
import TextInput from "../InputField/TextInput";
import Grid from "@material-ui/core/Grid";
import AddButton from "../Buttons/AddButton";
import Divider from "../Divider";
import RadioButton from "../InputField/RadioButton";

const style = {
  formWrapper: {
    margin: 0
  },
  contactsTitle: {
    display: "flex",
    flexDirection: "column"
  },
  addButton: {
    marginTop: "12px"
  },
  textArea: {
    resize: "none",
    width: "328px",
    padding: "16px",
    height: "80px",
    borderRadius: "8px",
    border: "solid 1px rgba(194, 194, 194, 0.56)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "Open Sans",
    fontSize: "12px",
    color: "#000",
    "&::placeholder": {
      color: "#666"
    }
  },
  gridGroup: {
    alignItems: "baseline"
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
          <div className={cx("box-group-grid", classes.gridGroup)}>
            <RadioButton value="any" label="Any of us can sign" />
            <RadioButton value="other" label="Other (please specify)" />
            <RadioButton value="all" label="All of us must sign" />
            <textarea
              className={classes.textArea}
              placeholder="Please specify (Maxium 120 characters)"
              maxLength="120"
            />
          </div>
        </RadioGroup>

        <Divider />

        <div className={classes.contactsTitle}>
          <Subtitle title="Contacts for re-confirming transactions" />
          <InfoTitle
            title="You can have up to two contacts"
            styles={{
              marginTop: "2px",
              marginBottom: "6px"
            }}
          />
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
