import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import PureSelect from "../components/InputField/PureSelect";
import SectionTitle from "../components/SectionTitle";
import SubmitButton from "../components/Buttons/SubmitButton";
import DatePicker from "../components/InputField/DatePicker";
import TextInput from "../components/InputField/TextInput";
import validateForm from "../utils/validate";

const style = {
  sectionTitleIndent: {
    marginBottom: "24px"
  },
  topIndent: {
    marginTop: "40px"
  }
};

class AboutCompany extends React.Component {
  submitForm = event => {
    event.preventDefault();
    const errorList = validateForm(event);

    if (!errorList.length) {
      this.props.history.push("/StakeholdersInfo");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="mainContainer">
        <h2>Tell Us about Your Company</h2>
        <p className="formDescription">
          Explanation text goes here. One to three short sentences maximum. This
          is the third sentence.
        </p>
        <form onSubmit={this.submitForm} noValidate>
          <SectionTitle
            title="Company Details"
            className={classes.sectionTitleIndent}
          />

          <TextInput id="Org.companyName" />

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <PureSelect id="Okyc.constitutionType" />
            </Grid>
            <Grid item md={6} sm={12}>
              <PureSelect id="Okyc.companyCategory" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <TextInput id="Org.vatRegistrationNumber" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextInput id="Org.numberOfEmployees" />
            </Grid>
          </Grid>

          <SectionTitle
            title="Industry"
            className={cx(classes.sectionTitleIndent, classes.topIndent)}
          />

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <PureSelect id="OkycIndus.industry" indexes={[0]} />
            </Grid>
            <Grid item md={6} sm={12}>
              <PureSelect id="OkycIndus.subCategory" indexes={[0]} disabled />
            </Grid>
          </Grid>

          <SectionTitle
            title="License Information"
            className={cx(classes.sectionTitleIndent, classes.topIndent)}
          />

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <TextInput id="Org.licenseNumber" />
            </Grid>
            <Grid item md={6} sm={12}>
              <DatePicker id="Org.licenseIssueDate" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <PureSelect id="Org.licenseIssuingAuthority" />
            </Grid>
            <Grid item md={6} sm={12}>
              <PureSelect id="Org.countryOfIncorporation" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <DatePicker id="Org.dateOfIncorporation" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextInput id="Okyc.yearsInBusiness" />
            </Grid>
          </Grid>

          <SubmitButton />
        </form>
      </div>
    );
  }
}

export default withStyles(style)(AboutCompany);
