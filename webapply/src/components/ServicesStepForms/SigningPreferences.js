import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";

import Subtitle from "../Subtitle";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import InfoTitle from "../InfoTitle";
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
  handleAddPerson = () => {
    const { signatoryInfo, signInfoFullNameInput, updateProspect } = this.props;

    if (signatoryInfo.length === 1) {
      const path = signInfoFullNameInput.config.name.replace("*", signatoryInfo.length);
      updateProspect({ [path]: "" });
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
    const { classes, accountSigningType, signatoryInfo, goToNext } = this.props;

    const getValueInput = index => {
      if (signatoryInfo[index]) {
        return signatoryInfo[index].fullName;
      }
      return "";
    };

    const contactGroup = (index = 0) => (
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
    );

    return (
      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        <RadioGroup
          id="SigAcntSig.accountSigningType"
          indexes={[0]}
          helpMessage="text help TODO replace text"
        >
          {accountSigningType.value === "Others" && (
            <TextArea id="SigAcntSig.accountSigningInstn" indexes={[0]} />
          )}
        </RadioGroup>

        <Divider />

        <div className={classes.contactsTitle}>
          <Subtitle title="Contacts for re-confirming transactions" />
          <InfoTitle
            typeInfo
            title="You can have up to two contacts"
            styles={{ marginTop: "2px", marginBottom: "6px" }}
          />
        </div>

        {signatoryInfo.length
          ? signatoryInfo.map((person, index) => contactGroup(index))
          : contactGroup()}

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
  signatoryInfo: appConfigSelectors.getSignatories(state),
  signInfoFullNameInput: getGeneralInputProps(state, "Sig.fullName", [0]),
  accountSigningType: getGeneralInputProps(state, "SigAcntSig.accountSigningType", [0]),
  accountSigningInstn: getGeneralInputProps(state, "SigAcntSig.accountSigningInstn", [0])
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
