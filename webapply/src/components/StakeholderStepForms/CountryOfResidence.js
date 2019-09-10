import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import TextInput from "../InputField/TextInput";
import {
  getInputNameById,
  getInputValueById
} from "../../store/selectors/appConfig";
import { updateField } from "../../store/actions/appConfig";

class CountryOfResidence extends React.Component {
  static defaultProps = {
    index: 0
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.residenceCountry !== this.props.residenceCountry) {
      this.setEidNumberValue(this.isSelectedOAE() ? "784" : "");
    }
  }

  setEidNumberValue(value) {
    this.props.updateField({
      value,
      name: this.props.eidNumberInputName
    });
  }

  isSelectedOAE() {
    return this.props.residenceCountry === "AE";
  }

  render() {
    const { index, isSignatory } = this.props;
    const isOAE = this.isSelectedOAE();

    return (
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect
            disabled={isSignatory}
            defaultValue={isSignatory ? "AE" : undefined}
            id="SigKycd.residenceCountry"
            indexes={[index]}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput
            placeholder="784-XXXX-XXXXXXX-X"
            required={isOAE}
            disabled={!isOAE}
            defaultValue={isOAE ? "784" : undefined}
            id="SigKycdEmid.eidNumber"
            indexes={[index]}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  residenceCountry: getInputValueById(state, "SigKycd.residenceCountry", [
    index
  ]),
  isSignatory:
    getInputValueById(state, "SigKycd.isSignatory", [index]) === "true",
  eidNumberInputName: getInputNameById(state, "SigKycdEmid.eidNumber", [index])
});

const mapDispatchToProps = {
  updateField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryOfResidence);
