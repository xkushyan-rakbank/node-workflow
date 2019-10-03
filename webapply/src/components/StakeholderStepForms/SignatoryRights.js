import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import InlineRadioGroup from "../InputField/InlineRadioGroup";
import { getInputNameById, getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

class SignatoryRights extends React.Component {
  updateAuthorityTypeValue(value) {
    this.props.updateProspect({
      [this.props.authorityTypeInputName]: value
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isSignatory !== this.props.isSignatory && this.props.isSignatory === "false") {
      this.updateAuthorityTypeValue("");
    }
  }

  render() {
    return (
      <Grid container>
        <InlineRadioGroup id="SigKycd.isSignatory" indexes={[0]} />
        <PureSelect
          disabled={!this.props.isSignatory}
          id="SigAcntSig.authorityType"
          indexes={[this.props.index]}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state, { index }) => {
  return {
    isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index]),
    authorityTypeInputName: getInputNameById(state, "SigAcntSig.authorityType", [index])
  };
};

const mapDispatchToProps = {
  updateProspect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryRights);
