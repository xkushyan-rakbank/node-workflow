import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
import { getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

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

class SignatoryMailingAddressForm extends React.Component {
  static defaultProps = {
    index: 0
  };

  state = {
    isAdressFieldFilled: false,
    isLocationFilled: false,
    isBoxNumberFilled: false
  };

  componentDidMount() {
    const { addressFieldDesc, addressLine1, poBox } = this.props;
    this.setState(
      {
        isAdressFieldFilled: !!addressFieldDesc,
        isLocationFilled: !!addressLine1,
        isBoxNumberFilled: !!poBox
      },
      () => {
        const isButtonDisabled = this.isContinueDisabled();
        this.props.setIsContinueDisabled(isButtonDisabled);
      }
    );
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

  callbackHandle = (value, name) => this.setState({ [name]: !!value });

  isContinueDisabled = () => {
    return !(
      this.props.sameAsCompanyAddress ||
      (this.state.isAdressFieldFilled &&
        this.state.isLocationFilled &&
        this.state.isBoxNumberFilled &&
        this.props.emirateCity)
    );
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
              storeFlag="isAdressFieldFilled"
              callback={this.callbackHandle}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigAddrAdrd.addressLine1"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
              storeFlag="isLocationFilled"
              callback={this.callbackHandle}
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
              storeFlag="isBoxNumberFilled"
              callback={this.callbackHandle}
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
  emirateCity: getInputValueById(state, "SigAddrAdrd.emirateCity", [index, 0, 0]),
  poBox: getInputValueById(state, "SigAddrAdrd.poBox", [index, 0, 0]),
  addressLine1: getInputValueById(state, "SigAddrAdrd.addressLine1", [index, 0, 0]),
  addressFieldDesc: getInputValueById(state, "SigAddrAdrd.preferredAddress", [index, 0, 0])
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignatoryMailingAddressForm)
);
