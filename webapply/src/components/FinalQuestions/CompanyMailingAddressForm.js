import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";
import { connect } from "react-redux";
import { getInputValueById } from "../../store/selectors/input";

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
  constructor(props) {
    super(props);

    this.state = {
      addressCount: 1,
      isAddressFieldFilled: false,
      isLocationFilled: false,
      isBoxNumberFilled: false
    };
  }

  componentDidMount() {
    const { poBox, addressLine1, addressFieldDesc } = this.props;
    this.setState(
      {
        isAddressFieldFilled: !!addressFieldDesc,
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

  callbackHandle = (value, name) => this.setState({ [name]: !!value });

  isContinueDisabled = () => {
    const { spaceType, emirateCity } = this.props;
    return !(
      this.state.isAddressFieldFilled &&
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
                    storeFlag="isAddressFieldFilled"
                    callback={this.callbackHandle}
                  />
                  <TextInput
                    id="OrgAddrAdrd.addressLine1"
                    indexes={[index, 0]}
                    storeFlag="isLocationFilled"
                    callback={this.callbackHandle}
                  />
                  <PureSelect id="OrgAddrAdrd.emirateCity" indexes={[index, 0]} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect id="OrgAddrAdrdSpace.spaceType" indexes={[index, 0]} />
                  <TextInput
                    id="OrgAddrAdrd.poBox"
                    indexes={[index, 0]}
                    storeFlag="isBoxNumberFilled"
                    callback={this.callbackHandle}
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
  emirateCity: getInputValueById(state, "OrgAddrAdrd.emirateCity", [0, 0]),
  spaceType: getInputValueById(state, "OrgAddrAdrdSpace.spaceType", [0, 0]),
  poBox: getInputValueById(state, "OrgAddrAdrd.poBox", [0, 0]),
  addressLine1: getInputValueById(state, "OrgAddrAdrd.addressLine1", [0, 0]),
  addressFieldDesc: getInputValueById(state, "OrgAddrAdrd.addressFieldDesc", [0, 0])
});

export default withStyles(styles)(connect(mapStateToProps)(CompanyMailingAddressForm));
