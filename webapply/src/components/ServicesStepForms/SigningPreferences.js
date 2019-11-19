import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";

import Subtitle from "../Subtitle";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import { InfoTitle } from "./../Notifications";
import PureSelect from "../InputField/PureSelect";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import Divider from "../Divider";
import RadioGroup from "../InputField/RadioGroupButtons";
import TextArea from "../InputField/TextArea";

import * as appConfigSelectors from "../../store/selectors/appConfig";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const accountSigningType = get(prevProps, "accountSigningType.value");
    const { value } = this.props.accountSigningType;

    if (accountSigningType === "Others" && value !== "Others") {
      this.props.updateProspect({ [this.props.accountSigningInstn.name]: "" });
    }
  }

  render() {
    const { classes, accountSigningType, signatoryInfo = [] } = this.props;

    const { contactPersons } = this.state;
    const getValueInput = index => {
      if (signatoryInfo[index]) {
        return signatoryInfo[index].fullName;
      }
      return "";
    };

    return (
      <FormWrapper className={classes.formWrapper} handleContinue={this.props.goToNext}>
        <RadioGroup id="SigAcntSig.accountSigningType" indexes={[0]}>
          {accountSigningType.value === "Others" && (
            <TextArea id="SigAcntSig.accountSigningInstn" indexes={[0]} />
          )}
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

        {contactPersons.map((person, index) => (
          <React.Fragment key={index}>
            <TextInput id="Sig.fullName" indexes={[index]} />
            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <TextInput
                  id="OrgContReconf.primaryMobileNo"
                  indexes={[index]}
                  required={!!getValueInput(index)}
                  select={
                    <PureSelect
                      id="OrgContReconf.primaryMobCountryCode"
                      indexes={[index]}
                      combinedSelect
                      defaultValue="971"
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
                      defaultValue="971"
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

const mapStateToProps = state => ({
  accountSigningType: getGeneralInputProps(state, "SigAcntSig.accountSigningType", [0]),
  accountSigningInstn: getGeneralInputProps(state, "SigAcntSig.accountSigningInstn", [0]),
  signatoryInfo: appConfigSelectors.getSignatories(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SigningPreferences)
);
