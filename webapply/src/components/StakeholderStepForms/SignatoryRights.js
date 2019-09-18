import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import {
  getInputNameById,
  getInputValueById
} from "../../store/selectors/input";
import { updateField } from "../../store/actions/appConfig";

class SignatoryRights extends React.Component {
  updateAuthorityTypeValue(value) {
    this.props.updateField({
      value: value,
      name: this.props.authorityTypeInputName
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isSignatory !== this.props.isSignatory &&
      this.props.isSignatory === "false"
    ) {
      this.updateAuthorityTypeValue("");
    }
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect
            id="SigKycd.isSignatory"
            defaultValue="true"
            indexes={[this.props.index]}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect
            required={this.props.isSignatory === "true"}
            disabled={this.props.isSignatory === "false"}
            id="SigAcntSig.authorityType"
            indexes={[this.props.index]}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index]),
  authorityTypeInputName: getInputNameById(state, "SigAcntSig.authorityType", [
    index
  ])
});

const mapDispatchToProps = {
  updateField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryRights);
