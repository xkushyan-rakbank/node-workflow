import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { connect } from "react-redux";
import { updateProspect } from "../../store/actions/appConfig";
import get from "lodash/get";

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

class CompanyMailingAddressForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      addressCount: 1,
      isAdressFieldFilled: false,
      isLocationFilled: false,
      isBoxNumberFilled: false
    };
  }

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
      this.props.organizationInfo,
      "addressInfo[0].addressDetails[0].addressFieldDesc",
      ""
    );
  }

  getLocationData() {
    return get(this.props.organizationInfo, "addressInfo[0].addressDetails[0].addressLine1", "");
  }

  getBoxNumberData() {
    return get(this.props.organizationInfo, "addressInfo[0].addressDetails[0].poBox", "");
  }

  getSpaceTypeData() {
    return get(
      this.props.organizationInfo,
      "addressInfo[0].addressDetails[0].typeOfSpaceOccupied.spaceType",
      ""
    );
  }

  getEmirateCityData() {
    return get(this.props.organizationInfo, "addressInfo[0].addressDetails[0].emirateCity", "");
  }

  addressFieldChangeHandle = value => this.setState({ isAdressFieldFilled: !!value });

  locationChangeHandle = value => this.setState({ isLocationFilled: !!value });

  boxNumberChangeHandle = value => this.setState({ isBoxNumberFilled: !!value });

  isContinueDisabled = () => {
    const spaceType = this.getSpaceTypeData();
    const emirateCity = this.getEmirateCityData();
    console.log(
      this.state.isAdressFieldFilled,
      this.state.isLocationFilled,
      this.state.isBoxNumberFilled,
      !!spaceType,
      !!emirateCity
    );
    return !(
      this.state.isAdressFieldFilled &&
      this.state.isLocationFilled &&
      this.state.isBoxNumberFilled &&
      spaceType &&
      emirateCity
    );
  };

  render() {
    return (
      <>
        <Grid container>
          <InfoTitle title="You guessed it, we will use this section for our communication with you" />
        </Grid>

        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {Array.from(Array(this.state.addressCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput
                    id="OrgAddrAdrd.addressFieldDesc"
                    indexes={[index, 0]}
                    required={index === 0}
                    callback={this.addressFieldChangeHandle}
                  />
                  <TextInput
                    id="OrgAddrAdrd.addressLine1"
                    indexes={[index, 0]}
                    required={index === 0}
                    callback={this.locationChangeHandle}
                  />
                  <PureSelect
                    id="OrgAddrAdrd.emirateCity"
                    indexes={[index, 0]}
                    required={index === 0}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    id="OrgAddrAdrdSpace.spaceType"
                    indexes={[index, 0]}
                    required={index === 0}
                  />
                  <TextInput
                    id="OrgAddrAdrd.poBox"
                    indexes={[index, 0]}
                    required={index === 0}
                    callback={this.boxNumberChangeHandle}
                  />
                  <TextInput
                    id="OrgAddrAdrd.country"
                    indexes={[index, 0]}
                    disabled
                    defaultValue="United Arab Emirates"
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  organizationInfo: getOrganizationInfo(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyMailingAddressForm)
);
