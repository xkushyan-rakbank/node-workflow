import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { getInputNameById, getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

const styles = {
  title: {
    fontSize: "16px"
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

const OTHER_SOURCE_OF_WEALTH = "O";

class SignatoryWealthForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.soursOfWealth !== this.props.soursOfWealth &&
      !this.isOtherSourceOfWealthSelected()
    ) {
      this.updateOtherWealthTypeValue("");
    }
  }

  isOtherSourceOfWealthSelected() {
    // temp - work only on WireMock data
    return this.props.soursOfWealth === OTHER_SOURCE_OF_WEALTH;
  }

  updateOtherWealthTypeValue(value) {
    this.props.updateProspect({ [this.props.otherWealthTypeInputName]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle title="Wealth" className={this.props.classes.title} />

        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="SigKycdWlth.wealthType" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="SigKycdWlth.others"
              indexes={[this.props.index]}
              required={this.isOtherSourceOfWealthSelected()}
              disabled={!this.isOtherSourceOfWealthSelected()}
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
  soursOfWealth: getInputValueById(state, "SigKycdWlth.wealthType", [index]),
  otherWealthTypeInputName: getInputNameById(state, "SigKycdWlth.others", [index])
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignatoryWealthForm)
);
