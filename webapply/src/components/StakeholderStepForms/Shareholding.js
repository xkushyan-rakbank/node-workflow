import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import get from "lodash/get";
import PureSelect from "../InputField/PureSelect";
import { getSignatories } from "../../store/selectors/appConfig";
import { getInputNameById, getInputValueById } from "../../store/selectors/input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ErrorMessage from "../ErrorMessage";
import { updateField } from "../../store/actions/appConfig";

class Shareholding extends React.Component {
  inputProps = {
    endAdornment: <InputAdornment position="end">%</InputAdornment>
  };

  componentDidMount() {
    if (this.props.isSoleProprietor) {
      this.updateShareholderPercentageValue(100);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isShareholder !== this.props.isShareholder &&
      this.props.isShareholder === "false"
    ) {
      this.updateShareholderPercentageValue(0);
    }
  }

  updateShareholderPercentageValue(value) {
    this.props.updateField({
      value,
      name: this.props.shareholderPercentageInputName
    });
  }

  otherSignatoriesPercentage() {
    return this.props.signatories
      .filter((item, index) => index !== this.props.index)
      .map(item => get(item, "kycDetails.shareHoldingPercentage", 0))
      .map(item => Number(item))
      .reduce((acc, item) => acc + item, 0);
  }

  availablePercentage() {
    return 100 - this.otherSignatoriesPercentage();
  }

  customValidationMessage = ({ inputRef, isFocused }) => {
    if (inputRef && !isFocused && Number(inputRef.value) > 100) {
      return <ErrorMessage error="Shareholders can't hold more than 100% of shares in total" />;
    }

    return null;
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect
            id="SigKycd.isShareholder"
            indexes={[this.props.index]}
            defaultValue="true"
            disabled={this.props.isSoleProprietor}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput
            type="number"
            disabled={this.props.isShareholder === "false" || this.props.isSoleProprietor}
            id="SigKycd.shareHoldingPercentage"
            defaultValue={this.props.isSoleProprietor ? 100 : undefined}
            min="0"
            max={this.availablePercentage()}
            customValidationMessage={this.customValidationMessage}
            required={this.props.isShareholder === "true"}
            indexes={[this.props.index]}
            InputProps={this.inputProps}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  isShareholder: getInputValueById(state, "SigKycd.isShareholder", [index]),
  shareholderPercentageInputName: getInputNameById(state, "SigKycd.shareHoldingPercentage", [
    index
  ]),
  // temp - will work only on WireMock data
  isSoleProprietor: getInputValueById(state, "SigAcntSig.authorityType", [index]) === "SP",
  currentPercentage: getInputValueById(state, "SigKycd.shareHoldingPercentage", [index]),
  signatories: getSignatories(state)
});

const mapDispatchToProps = {
  updateField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shareholding);
