import React, { Component } from "react";
import { connect } from "react-redux";
import CustomCheckbox from "../../../../../components/InputField/RefactoredCheckbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../../../../../components/InputField/TextInput";
import PureSelect from "../../../../../components/InputField/PureSelect";
import { getInputValueById } from "../../../../../store/selectors/input";
import { updateProspect } from "../../../../../store/actions/appConfig";

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

  checkboxHandleClick = value => {
    const { index, companyName } = this.props;
    const checkboxPath = `prospect.signatoryInfo[${index}].employmentDetails.isWorkAtTheCompany`;
    const fieldPath = `prospect.signatoryInfo[${index}].employmentDetails.employerName`;
    const employerName = value ? companyName : "";
    this.props.updateProspect({
      [checkboxPath]: value,
      [fieldPath]: employerName
    });
  };

  isContinueDisabled = () => {
    return !this.props.employerName;
  };

  render() {
    const { index, classes, employmentType, companyName, isWorkAtTheCompany } = this.props;
    return (
      <>
        <Grid container spacing={3} className={classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <PureSelect id="SigKycd.qualification" indexes={[index]} />
            <PureSelect id="SigEmpd.employmentType" indexes={[index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="SigEmpd.totalExperienceYrs" indexes={[index]} />
            <TextInput id="SigEmpd.designation" indexes={[index]} />
          </Grid>
          {employmentType === "O" && (
            <Grid item md={12} sm={12}>
              <TextInput id="SigEmpd.otherEmploymentType" indexes={[index]} />
            </Grid>
          )}
          <Grid item sm={12}>
            <CustomCheckbox
              id="SigEmpd.isWorkAtTheCompany"
              indexes={[index]}
              callback={this.checkboxHandleClick}
              label={`This Person works at ${companyName}`}
            />
          </Grid>
          <Grid item sm={12}>
            <TextInput id="SigEmpd.employerName" indexes={[index]} disabled={isWorkAtTheCompany} />
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
