import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById } from "../../store/selectors/input";
import { getSignatories } from "../../store/selectors/appConfig";
import get from "lodash/get";
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
    const designation = this.getDesignation();
    const totalExperienceYears = this.getTotalExperienceYears();
    const employerName = this.getEmployerName();
    const isWorkAtTheCompany = this.getIsWorkAtCompany();
    this.setState(
      {
        isDesignation: !!designation,
        isTotalExperienceYearsFilled: !!(totalExperienceYears || totalExperienceYears === 0),
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

  getQualification() {
    return get(this.props.signatoryInfo[this.props.index], "kycDetails.qualification", "");
  }

  getEmploymentType() {
    return get(this.props.signatoryInfo[this.props.index], "employmentDetails.employmentType", "");
  }

  getTotalExperienceYears() {
    return get(
      this.props.signatoryInfo[this.props.index],
      "employmentDetails.totalExperienceYrs",
      ""
    );
  }

  getDesignation() {
    return get(this.props.signatoryInfo[this.props.index], "employmentDetails.designation", "");
  }

  getEmployerName() {
    return get(this.props.signatoryInfo[this.props.index], "employmentDetails.employerName", "");
  }

  getIsWorkAtCompany() {
    return get(
      this.props.signatoryInfo[this.props.index],
      "employmentDetails.isWorkAtTheCompany",
      ""
    );
  }

  totalExperienceYrsChangeHandle = value =>
    this.setState({ isTotalExperienceYearsFilled: !!(value || value === 0) });

  designationChangeHandle = value => this.setState({ isDesignation: !!value });

  employerNameChangeHandle = value => this.setState({ isEmployerNameFilled: !!value });

  handleSwitchIsWorkAtCompany = e => {
    const path = `prospect.signatoryInfo[${this.props.index}].employmentDetails.isWorkAtTheCompany`;
    this.props.updateProspect({
      [path]: e.target.checked
    });
    this.setState({ isWorkAtTheCompany: e.target.checked });
  };

  isContinueDisabled = () => {
    const qualification = this.getQualification();
    const employmentType = this.getEmploymentType();
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
              callback={this.totalExperienceYrsChangeHandle}
            />
            <TextInput
              id="SigEmpd.designation"
              indexes={[this.props.index]}
              callback={this.designationChangeHandle}
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
              callback={this.employerNameChangeHandle}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName"),
  signatoryInfo: getSignatories(state)
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
