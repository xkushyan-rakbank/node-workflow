import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { getSignatories } from "../../store/selectors/appConfig";
import { connect } from "react-redux";
import get from "lodash/get";

const styles = {
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  }
};

class SignatoryPersonalInformationForm extends Component {
  static defaultProps = {
    index: 0
  };

  state = {
    isMothersMaidenNameFilled: false,
    isMaritalStatusOthersFilled: false
  };

  componentDidMount() {
    const mothersMaidenName = this.getMothersMaidenName();
    const maritalStatusOthers = this.getMaritalStatusOthers();
    this.setState(
      {
        isMothersMaidenNameFilled: !!mothersMaidenName,
        isMaritalStatusOthersFilled: !!maritalStatusOthers
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

  getMaritalStatus() {
    return get(this.props.signatoryInfo[this.props.index], "maritalStatus", "");
  }

  getMaritalStatusOthers() {
    return get(this.props.signatoryInfo[this.props.index], "maritalStatusOthers", "");
  }

  getMothersMaidenName() {
    return get(this.props.signatoryInfo[this.props.index], "mothersMaidenName", "");
  }

  maritalStatusChangeHandle = value => this.setState({ isMothersMaidenNameFilled: !!value });

  maritalStatusOthersChangeHandle = value =>
    this.setState({ isMaritalStatusOthersFilled: !!value });

  isContinueDisabled = () => {
    const { isMothersMaidenNameFilled, isMaritalStatusOthersFilled } = this.state;
    const maritalStatus = this.getMaritalStatus();
    return !(
      isMothersMaidenNameFilled &&
      maritalStatus &&
      (maritalStatus !== "O" || isMaritalStatusOthersFilled)
    );
  };

  render() {
    return (
      <>
        <Grid spacing={3} container className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="Sig.maritalStatus" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="Sig.mothersMaidenName"
              indexes={[this.props.index]}
              callback={this.maritalStatusChangeHandle}
            />
          </Grid>
          {this.getMaritalStatus() === "O" && (
            <Grid item md={12} sm={12}>
              <TextInput
                id="Sig.maritalStatusOthers"
                indexes={[this.props.index]}
                callback={this.maritalStatusOthersChangeHandle}
              />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  signatoryInfo: getSignatories(state)
});

export default withStyles(styles)(connect(mapStateToProps)(SignatoryPersonalInformationForm));
