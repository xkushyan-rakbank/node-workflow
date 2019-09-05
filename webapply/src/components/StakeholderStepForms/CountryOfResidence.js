import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/PureSelect";
import Input from "../InputField/TextInput";
import { getInputValueById } from "../../store/selectors/appConfig";

class CountryOfResidence extends React.Component {
  static defaultProps = {
    index: 0
  };

  render() {
    const { index, isOAE, isSignatory } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <Select
            disabled={isSignatory}
            defaultValue="AE"
            id="SigKycd.residenceCountry"
            indexes={[index]}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <Input
            defaultValue="784-XXXX-XXXXXXX-X"
            disabled={!isOAE}
            id="SigKycdEmid.eidNumber"
            indexes={[index]}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  isOAE: getInputValueById(state, "SigKycd.residenceCountry", [index]) === "AE",
  isSignatory:
    getInputValueById(state, "SigKycd.isSignatory", [index]) === "true"
});

export default connect(mapStateToProps)(CountryOfResidence);
