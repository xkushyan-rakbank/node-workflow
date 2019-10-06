import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
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

class SignatoryEmploymentDetailsForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      isWorkInCompany: false
    };
  }

  render() {
    return (
      <>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <TextInput id="SigKycd.qualification" indexes={[this.props.index]} />

            <PureSelect id="SigEmpd.employmentType" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="SigEmpd.totalExperienceYrs" indexes={[this.props.index]} />
            <TextInput id="SigEmpd.designation" indexes={[this.props.index]} />
          </Grid>
          <Grid item sm={12}>
            <Checkbox
              value={this.state.isWorkInCompany}
              onChange={event => {
                this.setState({ isWorkInCompany: event.target.checked });
              }}
              label={`This Person works at ${this.props.companyName}`}
            />
          </Grid>
          <Grid item sm={12}>
            <TextInput id="SigEmpd.employerName" indexes={[this.props.index]} />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  companyName: getInputValueById(state, "Org.companyName")
});

export default withStyles(styles)(connect(mapStateToProps)(SignatoryEmploymentDetailsForm));
