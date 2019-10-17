import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import InlineRadioGroup from "../InputField/InlineRadioGroup";
import { getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

class SignatoryRights extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isSignatory && !this.props.isSignatory) {
      this.props.updateProspect({
        [`prospect.signatoryInfo[${this.props.index}].accountSigningInfo.authorityType`]: ""
      });
    }
  }

  render() {
    return (
      <Grid container>
        <InlineRadioGroup id="SigKycd.isSignatory" indexes={[this.props.index]} />
        <PureSelect
          disabled={!this.props.isSignatory}
          required={this.props.isSignatory}
          id="SigAcntSig.authorityType"
          indexes={[this.props.index]}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => {
  return {
    isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index])
  };
};

const mapDispatchToProps = {
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryRights);
