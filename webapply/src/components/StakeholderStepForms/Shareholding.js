import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import get from "lodash/get";
import { getSignatories } from "../../store/selectors/appConfig";
import { getInputNameById, getInputValueById } from "../../store/selectors/input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ErrorMessage } from "./../Notifications";
import { updateProspect } from "../../store/actions/appConfig";
import InlineRadioGroup from "../InputField/InlineRadioGroup";

class Shareholding extends React.Component {
  inputProps = {
    endAdornment: <InputAdornment position="end">%</InputAdornment>
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isShareholder !== this.props.isShareholder &&
      this.props.isShareholder === false
    ) {
      this.updateShareholderPercentageValue(0);
    }
  }

  updateShareholderPercentageValue(value) {
    this.props.updateProspect({ [this.props.shareholderPercentageInputName]: value });
  }

  customValidationMessage = ({ isFocused }) => {
    if (!isFocused && this.props.totalPercentage > 100) {
      return <ErrorMessage error="Shareholders can't hold more than 100% of shares in total" />;
    }

    return null;
  };

  render() {
    return (
      <Grid container>
        <InlineRadioGroup id="SigKycd.isShareholder" indexes={[this.props.index]} />

        <Grid item md={12}>
          <TextInput
            type="number"
            disabled={!this.props.isShareholder}
            id="SigKycd.shareHoldingPercentage"
            defaultValue={!this.props.isShareholder && 0}
            min="0"
            customValidationMessage={this.customValidationMessage}
            required={this.props.isShareholder}
            indexes={[this.props.index]}
            InputProps={this.inputProps}
            isError={this.props.isError}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => {
  const signatories = getSignatories(state);
  const totalPercentage = signatories.reduce(
    (acc, item) => acc + Number(get(item, "kycDetails.shareHoldingPercentage", 0)),
    0
  );
  return {
    isShareholder: getInputValueById(state, "SigKycd.isShareholder", [index]),
    shareholderPercentageInputName: getInputNameById(state, "SigKycd.shareHoldingPercentage", [
      index
    ]),
    // temp - will work only on WireMock data
    isSoleProprietor: getInputValueById(state, "SigAcntSig.authorityType", [index]) === "SP",
    currentPercentage: getInputValueById(state, "SigKycd.shareHoldingPercentage", [index]),
    signatories,
    totalPercentage,
    isError: totalPercentage > 100
  };
};

const mapDispatchToProps = {
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shareholding);
