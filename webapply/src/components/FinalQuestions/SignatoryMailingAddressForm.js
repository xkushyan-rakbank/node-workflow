import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
import { getInputValueById } from "../../store/selectors/input";
import { getOrganizationInfo, getSignatories } from "../../store/selectors/appConfig";
import get from "lodash/get";
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
    const address = this.getAddressFieldData();
    const location = this.getLocationData();
    const boxNumber = this.getBoxNumberData();
    this.setState(
      {
        isAdressFieldFilled: !!address,
        isLocationFilled: !!location,
        isBoxNumberFilled: !!boxNumber
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

  getAddressFieldData() {
    return get(
      this.props.signatoryInfo[this.props.index],
      "addressInfo[0].addressDetails[0].preferredAddress",
      ""
    );
  }

  getLocationData() {
    return get(
      this.props.signatoryInfo[this.props.index],
      "addressInfo[0].addressDetails[0].addressLine1",
      ""
    );
  }

  getBoxNumberData() {
    return get(
      this.props.signatoryInfo[this.props.index],
      "addressInfo[0].addressDetails[0].poBox",
      ""
    );
  }

  getEmirateCityData() {
    return get(
      this.props.signatoryInfo[this.props.index],
      "addressInfo[0].addressDetails[0].emirateCity",
      ""
    );
  }

  getCompanyAddressFieldData() {
    return get(
      this.props.organizationInfo,
      "addressInfo[0].addressDetails[0].addressFieldDesc",
      ""
    );
  }

  getCompanyLocationData() {
    return get(this.props.organizationInfo, "addressInfo[0].addressDetails[0].addressLine1", "");
  }

  getCompanyBoxNumberData() {
    return get(this.props.organizationInfo, "addressInfo[0].addressDetails[0].poBox", "");
  }

  getCompanyEmirateCityData() {
    return get(this.props.organizationInfo, "addressInfo[0].addressDetails[0].emirateCity", "");
  }

  checkboxHandleClick = value => {
    const { index } = this.props;
    this.props.updateProspect({
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].preferredAddress`]: value
        ? this.getCompanyAddressFieldData()
        : "",
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].addressLine1`]: value
        ? this.getCompanyLocationData()
        : "",
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].emirateCity`]: value
        ? this.getCompanyEmirateCityData()
        : "",
      [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].poBox`]: value
        ? this.getCompanyBoxNumberData()
        : ""
    });
  };

  addressFieldChangeHandle = value => this.setState({ isAdressFieldFilled: !!value });

  locationChangeHandle = value => this.setState({ isLocationFilled: !!value });

  boxNumberChangeHandle = value => this.setState({ isBoxNumberFilled: !!value });

  isContinueDisabled = () => {
    const emirateCity = this.getEmirateCityData();
    return !(
      this.props.sameAsCompanyAddress ||
      (this.state.isAdressFieldFilled &&
        this.state.isLocationFilled &&
        this.state.isBoxNumberFilled &&
        emirateCity)
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
              callback={this.addressFieldChangeHandle}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigAddrAdrd.addressLine1"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
              callback={this.locationChangeHandle}
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
              callback={this.boxNumberChangeHandle}
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
  organizationInfo: getOrganizationInfo(state),
  signatoryInfo: getSignatories(state)
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
