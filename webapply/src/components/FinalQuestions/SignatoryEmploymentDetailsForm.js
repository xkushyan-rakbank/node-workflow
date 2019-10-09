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
    handleContinue: () => {},
    index: 0
  };

  state = {
    isWorkAtTheCompany: false,
    isDesignation: false,
    isTotalExperienceYearsFilled: false,
    isEmployerNameFilled: false
  };

  componentDidMount() {
    const { designation, employerName, totalExperienceYrs, isWorkAtTheCompany } = this.props;
    this.setState(
      {
        isDesignation: !!designation,
        isTotalExperienceYearsFilled: totalExperienceYrs || totalExperienceYrs === 0,
        isEmployerNameFilled: !!employerName,
        isWorkAtTheCompany
      },
      () => {
        const isButtonDisabled = this.isContinueDisabled();
        this.props.setIsContinueDisabled(isButtonDisabled);
      }
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  callbackHandle = (value, name) => this.setState({ [name]: !!(value || value === 0) });

  handleSwitchIsWorkAtCompany = e => {
    const path = `prospect.signatoryInfo[${this.props.index}].employmentDetails.isWorkAtTheCompany`;
    this.props.updateProspect({
      [path]: e.target.checked
    });
    this.setState({ isWorkAtTheCompany: e.target.checked });
  };

  isContinueDisabled = () => {
    const { qualification, employmentType } = this.props;
    const { isDesignation, isTotalExperienceYearsFilled, isEmployerNameFilled } = this.state;
    return !(
      isDesignation &&
      isTotalExperienceYearsFilled &&
      isEmployerNameFilled &&
      qualification &&
      employmentType
    );
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
            <TextInput
              id="SigEmpd.totalExperienceYrs"
              indexes={[this.props.index]}
              storeFlag="isTotalExperienceYearsFilled"
              callback={this.callbackHandle}
            />
            <TextInput
              id="SigEmpd.designation"
              indexes={[this.props.index]}
              storeFlag="isDesignation"
              callback={this.callbackHandle}
            />
          </Grid>
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
              storeFlag="isEmployerNameFilled"
              callback={this.callbackHandle}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName"),
  isWorkAtTheCompany: getInputValueById(state, "SigEmpd.isWorkAtTheCompany", [0, 0]),
  employerName: getInputValueById(state, "SigEmpd.employerName", [0, 0]),
  designation: getInputValueById(state, "SigEmpd.designation", [0, 0]),
  totalExperienceYrs: getInputValueById(state, "SigEmpd.totalExperienceYrs", [0, 0]),
  employmentType: getInputValueById(state, "SigEmpd.employmentType", [0, 0]),
  qualification: getInputValueById(state, "SigKycd.qualification", [0, 0])
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
