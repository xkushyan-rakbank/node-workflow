import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
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
  }
};

const OTHER_SOURCE_OF_WEALTH = "O";

class SignatoryWealthForm extends Component {
  static defaultProps = {
    index: 0
  };

  state = {
    isOtherFilled: false
  };

  componentDidMount() {
    this.setState({ isOtherFilled: !!this.props.otherSoursOfWealth }, () => {
      const isButtonDisabled = this.isContinueDisabled();
      this.props.setIsContinueDisabled(isButtonDisabled);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
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

  othersChangeHandle = value => this.setState({ isOtherFilled: !!value });

  isContinueDisabled = () => {
    return !(
      (!this.isOtherSourceOfWealthSelected() || this.state.isOtherFilled) &&
      this.props.soursOfWealth
    );
  };

  render() {
    const isOtherSourceOfWealthSelected = this.isOtherSourceOfWealthSelected();
    return (
      <>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={12} sm={12}>
            <PureSelect id="SigKycdWlth.wealthType" indexes={[this.props.index]} />
          </Grid>
          {isOtherSourceOfWealthSelected && (
            <Grid item md={12} sm={12}>
              <TextInput
                id="SigKycdWlth.others"
                indexes={[this.props.index]}
                required={isOtherSourceOfWealthSelected}
                callback={this.othersChangeHandle}
              />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  soursOfWealth: getInputValueById(state, "SigKycdWlth.wealthType", [index]),
  otherSoursOfWealth: getInputValueById(state, "SigKycdWlth.others", [index]),
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
