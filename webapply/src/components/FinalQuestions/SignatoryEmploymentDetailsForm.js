import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById } from "../../store/selectors/input";
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

class SignatoryEmploymentDetailsForm extends Component {
  static defaultProps = {
    index: 0
  };

  state = {
    isWorkAtTheCompany: false
  };

  componentDidMount() {
    const { isWorkAtTheCompany } = this.props;
    this.setState({ isWorkAtTheCompany });
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  handleSwitchIsWorkAtCompany = e => {
    const { index, companyName } = this.props;
    const checkboxPath = `prospect.signatoryInfo[${index}].employmentDetails.isWorkAtTheCompany`;
    const fieldPath = `prospect.signatoryInfo[${index}].employmentDetails.employerName`;
    const employerName = e.target.checked ? companyName : "";
    this.props.updateProspect({
      [checkboxPath]: e.target.checked,
      [fieldPath]: employerName
    });
    this.setState({ isWorkAtTheCompany: e.target.checked });
  };

  isContinueDisabled = () => {
    return !this.props.employerName;
  };

  render() {
    return (
      <>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="SigKycd.qualification" indexes={[this.props.index]} />
            <PureSelect id="SigEmpd.employmentType" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="SigEmpd.totalExperienceYrs" indexes={[this.props.index]} />
            <TextInput id="SigEmpd.designation" indexes={[this.props.index]} />
          </Grid>
          {this.props.employmentType === "O" && (
            <Grid item md={12} sm={12}>
              <TextInput id="SigEmpd.otherEmploymentType" indexes={[this.props.index]} />
            </Grid>
          )}
          <Grid item sm={12}>
            <Checkbox
              value={this.state.isWorkAtTheCompany}
              onChange={e => this.handleSwitchIsWorkAtCompany(e)}
              label={`This Person works at ${this.props.companyName}`}
            />
          </Grid>
          <Grid item sm={12}>
            <TextInput
              id="SigEmpd.employerName"
              indexes={[this.props.index]}
              disabled={this.state.isWorkAtTheCompany}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  companyName: getInputValueById(state, "Org.companyName"),
  employerName: getInputValueById(state, "SigEmpd.employerName", [index, 0]),
  employmentType: getInputValueById(state, "SigEmpd.employmentType", [index, 0]),
  isWorkAtTheCompany: getInputValueById(state, "SigEmpd.isWorkAtTheCompany", [index, 0])
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignatoryEmploymentDetailsForm)
);
