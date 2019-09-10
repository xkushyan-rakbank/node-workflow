import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import get from "lodash/get";
import PureSelect from "../InputField/PureSelect";
import {
  getInputValueById,
  getSignatories
} from "../../store/selectors/appConfig";
import InputAdornment from "@material-ui/core/InputAdornment";

class Shareholding extends React.Component {
  inputProps = {
    endAdornment: <InputAdornment position="end">%</InputAdornment>
  };

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
            disabled={
              this.props.isShareholder === "false" ||
              this.props.isSoleProprietor
            }
            id="SigKycd.shareHoldingPercentage"
            defaultValue={this.props.isSoleProprietor ? 100 : undefined}
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
  // temp - will work only on WireMock data
  isSoleProprietor:
    getInputValueById(state, "SigAcntSig.authorityType", [index]) === "SP",
  currentPercentage: getInputValueById(
    state,
    "SigKycd.shareHoldingPercentage",
    [index]
  ),
  signatories: getSignatories(state)
});

export default connect(mapStateToProps)(Shareholding);
