import React from "react";
import { connect } from "react-redux";
import SectionTitle from "../SectionTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
import { getInputValueById } from "../../store/selectors/appConfig";

const styles = {
  title: {
    fontSize: "16px",
    marginBottom: "20px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  }
};

class SignatoryMailingAddressForm extends React.Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle
          title="Preferred mailing address"
          className={this.props.classes.title}
        />

        <Grid container>
          <CustomCheckbox
            id="Sig.sameAsCompanyAddress"
            indexes={[this.props.index]}
          />
        </Grid>
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            <TextInput
              id="SigAddrAdrd.preferredAddress"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigAddrAdrd.addressLine1"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
            <PureSelect
              id="SigAddrAdrd.country"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigAddrAdrd.poBox"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
            <PureSelect
              id="SigAddrAdrd.emirateCity"
              indexes={[this.props.index, 0, 0]}
              disabled={this.props.sameAsCompanyAddress}
              required={!this.props.sameAsCompanyAddress}
            />
          </Grid>
        </Grid>

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  sameAsCompanyAddress: getInputValueById(state, "Sig.sameAsCompanyAddress", [
    index
  ])
});

export default withStyles(styles)(
  connect(mapStateToProps)(SignatoryMailingAddressForm)
);
