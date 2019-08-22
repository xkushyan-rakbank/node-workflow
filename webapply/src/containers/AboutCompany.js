import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import Input from "../components/InputField/Input";
import Select from "../components/InputField/Select";
import SectionTitle from "../components/SectionTitle";
import SubmitButton from "../components/Buttons/SubmitButton";
import DatePicker from "../components/InputField/DatePicker";
import { codes } from "./../constants";

const style = {
  sectionTitleIndent: {
    marginBottom: "24px"
  },
  topIndent: {
    marginTop: "40px"
  }
};

const initialValues = {
  lisenceDate: null,
  incorporationDate: null
};

const AboutCompany = props => {
  const handleSubmit = values => {
    console.log("values", JSON.stringify(values, null, 2));
  };
  const { classes } = props;
  return (
    <>
      <h2>Tell Us about Your Company</h2>
      <p className="formDescription">
        Explanation text goes here. One to three short sentences maximum. This
        is the third sentence.
      </p>
      <Formik
        validateOnBlur
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {props => (
          <form onSubmit={handleSubmit}>
            <SectionTitle
              title="Company Details"
              className={classes.sectionTitleIndent}
            />
            <Input
              required
              type="text"
              name="companyName"
              placeholder="Company placeholder"
              label="Company name"
              infoTitle="This is the same as in your Trade License"
            />

            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <Select
                  name="companyCategory"
                  label="Company Category"
                  options={codes}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Input
                  type="text"
                  name="numberOfEmployees"
                  placeholder="Number of Employees"
                  label="Number of employees"
                />
              </Grid>
            </Grid>
            <Input
              required
              type="text"
              name="companyName"
              placeholder="Company name"
              label="Company name"
              infoTitle="This is the same as your TRN number of UAE"
            />

            <SectionTitle
              title="Industry"
              className={cx(classes.sectionTitleIndent, classes.topIndent)}
            />

            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <Select name="industry" label="Industry" options={codes} />
              </Grid>
              <Grid item md={6} sm={12}>
                <Select
                  name="subCategory"
                  label="Sub-category"
                  options={codes}
                />
              </Grid>
            </Grid>

            <SectionTitle
              title="License Information"
              className={cx(classes.sectionTitleIndent, classes.topIndent)}
            />
            <Input
              required
              type="text"
              name="licensNumber"
              placeholder="Licens Number"
              label="Licens"
            />

            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <Select
                  name="licenseIssuingAuthority"
                  label="License issuing authority"
                  options={codes}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="lisenceDate"
                  label="Lisence issuing date"
                  component={DatePicker}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <Field
                  name="incorporationDate"
                  label="Lisence issuing date"
                  component={DatePicker}
                  infoTitle="Your date of incorporation is the date when the business was established"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Select
                  name="countryOfIncorporation"
                  label="Country of incorporation"
                  options={codes}
                />
              </Grid>
            </Grid>
            <Link to="/add-company-stakeholders">
              <SubmitButton />
            </Link>
          </form>
        )}
      </Formik>
    </>
  );
};

export default withStyles(style)(AboutCompany);
