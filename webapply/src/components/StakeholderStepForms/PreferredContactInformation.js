import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import AddButton from "../Buttons/AddButton";
import RemoveButton from "../Buttons/RemoveButton";
import { getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

const styles = {
  relative: {
    position: "relative"
  },
  removeButton: { right: "-45px" }
};

class PreferredContactInformation extends React.Component {
  state = {
    isShownLandlineNumber: false
  };

  removeLandlineNumber = () => {
    this.setState({ isShownLandlineNumber: false });
    const { index } = this.props;
    this.props.updateProspect({
      [`prospect.signatoryInfo[${index}].contactDetails.primaryPhoneNo`]: ""
    });
  };

  addLandlineNumber = () => {
    this.setState({ isShownLandlineNumber: true });
  };

  render() {
    const { classes, isSignatory } = this.props;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigCont.primaryMobileNo"
              indexes={[this.props.index]}
              disabled={!isSignatory}
              select={
                <PureSelect
                  id="SigCont.primaryMobCountryCode"
                  indexes={[this.props.index]}
                  defaultValue="UAE"
                  combinedSelect
                  disabled={!isSignatory}
                />
              }
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigCont.primaryEmail"
              indexes={[this.props.index]}
              disabled={!isSignatory}
            />
          </Grid>
        </Grid>

        {this.state.isShownLandlineNumber ? (
          <Grid container spacing={3}>
            <Grid item md={6} sm={12} className={classes.relative}>
              <TextInput
                id="SigCont.primaryPhoneNo"
                indexes={[this.props.index]}
                disabled={!isSignatory}
                select={
                  <PureSelect
                    id="SigCont.primaryPhoneCountryCode"
                    indexes={[this.props.index]}
                    defaultValue="UAE"
                    combinedSelect
                    disabled={!isSignatory}
                  />
                }
              />
              <RemoveButton
                onClick={this.removeLandlineNumber}
                className={classes.removeButton}
                title=""
              />
            </Grid>
          </Grid>
        ) : (
          <AddButton title="Add a landline number" onClick={this.addLandlineNumber} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index])
});

const mapDispatchToProps = { updateProspect };

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PreferredContactInformation)
);
