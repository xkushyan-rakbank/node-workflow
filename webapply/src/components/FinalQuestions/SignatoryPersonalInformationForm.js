import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { connect } from "react-redux";
import { getInputValueById } from "../../store/selectors/input";

const styles = {
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  }
};

class SignatoryPersonalInformationForm extends Component {
  static defaultProps = {
    index: 0
  };

  componentDidMount() {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  isContinueDisabled = () => {
    return !(this.props.maritalStatus === "O"
      ? this.props.maritalStatusOthers
      : this.props.mothersMaidenName);
  };

  render() {
    return (
      <>
        <Grid spacing={3} container className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="Sig.maritalStatus" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="Sig.mothersMaidenName" indexes={[this.props.index]} />
          </Grid>
          {this.props.maritalStatus === "O" && (
            <Grid item md={12} sm={12}>
              <TextInput id="Sig.maritalStatusOthers" indexes={[this.props.index]} />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  maritalStatus: getInputValueById(state, "Sig.maritalStatus", [index, 0]),
  mothersMaidenName: getInputValueById(state, "Sig.mothersMaidenName", [index, 0]),
  maritalStatusOthers: getInputValueById(state, "Sig.maritalStatusOthers", [index, 0])
});

export default withStyles(styles)(connect(mapStateToProps)(SignatoryPersonalInformationForm));
