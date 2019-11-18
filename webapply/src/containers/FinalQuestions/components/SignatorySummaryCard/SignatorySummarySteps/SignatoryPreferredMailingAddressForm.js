import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../../../../../components/InputField/TextInput";
import PureSelect from "../../../../../components/InputField/PureSelect";
import CustomCheckbox from "../../../../../components/InputField/RefactoredCheckbox";
import { getInputValueById } from "../../../../../store/selectors/input";
import { updateProspect } from "../../../../../store/actions/appConfig";

const styles = {
  title: {
    fontSize: "16px",
    marginBottom: "20px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  }
};

class SignatoryPreferredMailingAddressForm extends React.Component {
  static defaultProps = {
    index: 0
  };

  componentDidMount() {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  checkboxHandleClick = value => {
    const {
      index,
      organizationPoBox,
      organizationAddressFieldDesc,
      organizationEmirateCity,
      organizationAddressLine1
    } = this.props;
    this.props.updateProspect({
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].preferredAddress`]: value
        ? organizationAddressFieldDesc
        : "",
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].addressLine1`]: value
        ? organizationAddressLine1
        : "",
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].emirateCity`]: value
        ? organizationEmirateCity
        : "",
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].poBox`]: value
        ? organizationPoBox
        : ""
    });
  };

  isContinueDisabled = () => {
    return !(this.props.sameAsCompanyAddress ? true : this.props.emirateCity);
  };

  render() {
    const { sameAsCompanyAddress } = this.props;
    return (
      <>
        <Grid container>
          <CustomCheckbox
            id="Sig.sameAsCompanyAddress"
            indexes={[this.props.index]}
            callback={this.checkboxHandleClick}
          />
        </Grid>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item sm={12}>
            <TextInput
              id="SigAddrAdrd.preferredAddress"
              indexes={[this.props.index, 0, 0]}
              disabled={sameAsCompanyAddress}
              required={!sameAsCompanyAddress}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigAddrAdrd.addressLine1"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
            <PureSelect
              id="SigAddrAdrd.emirateCity"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigAddrAdrd.poBox"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
            <TextInput
              id="SigAddrAdrd.country"
              indexes={[this.props.index, 0, 0]}
              defaultValue="United Arab Emirates"
              disabled
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  sameAsCompanyAddress: getInputValueById(state, "Sig.sameAsCompanyAddress", [index]),
  organizationEmirateCity: getInputValueById(state, "OrgAddrAdrd.emirateCity", [0, 0]),
  organizationPoBox: getInputValueById(state, "OrgAddrAdrd.poBox", [0, 0]),
  organizationAddressLine1: getInputValueById(state, "OrgAddrAdrd.addressLine1", [0, 0]),
  organizationAddressFieldDesc: getInputValueById(state, "OrgAddrAdrd.addressFieldDesc", [0, 0]),
  emirateCity: getInputValueById(state, "SigAddrAdrd.emirateCity", [index, 0, 0])
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignatoryPreferredMailingAddressForm)
);
