import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import omit from "lodash/omit";
import { Input, CustomSelect, InputGroup, AutoSaveField as Field } from "./../../components/Form";
import { countryCodeOptions } from "./../../constants/options";
import { NAME_REGEX, EMAIL_REGEX, LEAD_LICENSE_REGEX } from "./../../utils/validation";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { SearchResult } from "./../SearchResult/index";
import { searchApplications } from "./../../store/actions/searchProspect";
import * as getSearchResult from "./../../store/selectors/searchProspect";
import { useStyles } from "./styled";

const searchProspectSchema = Yup.object({
  fname: Yup.string().matches(NAME_REGEX, "This is not a valid name"),
  mobileNo: Yup.string().matches(NAME_REGEX, "This is not a valid mobile no."),
  email: Yup.string().matches(EMAIL_REGEX, "This is not a valid email"),
  raktrackNumber: Yup.string()
    .max(20, "Maximum 20 charactors allowed")
    .matches(LEAD_LICENSE_REGEX, "This is not a valid rak track lead reference number"),
  tradeLicenseNo: Yup.string()
    .max(20, "Maximum 20 charactors allowed")
    .matches(LEAD_LICENSE_REGEX, "This is not a valid trade license number")
});

const SearchProspect = ({ searchApplications, searchResults }) => {
  const classes = useStyles();

  const handleSubmit = useCallback(
    values => {
      searchApplications(values);
    },
    [searchApplications]
  );

  return (
    <div className={classes.baseForm}>
      <h2>Search Application</h2>

      <Formik
        initialValues={{
          fname: "",
          countryCode: countryCodeOptions[0].label,
          mobileNo: "",
          email: "",
          raktrackNumber: "",
          tradeLicenseNo: ""
        }}
        validationSchema={searchProspectSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Field
              name="fname"
              path="searchInfo.fname"
              label="Applicant Name"
              placeholder="Applicant Name"
              contexualHelpText="This should be the name of the person who has registered for WebApply and initiated the application on behalf of the company."
              component={Input}
            />

            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <InputGroup>
                  <Field
                    name="countryCode"
                    path="searchInfo.countryCode"
                    options={countryCodeOptions}
                    component={CustomSelect}
                    extractId={option => option.key}
                    shrink={false}
                  />

                  <Field
                    name="mobileNo"
                    path="searchInfo.mobileNo"
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    contexualHelpText="This should be the mobile number of the person who has registered for WebApply and initiated the application on behalf of the company."
                    component={Input}
                  />
                </InputGroup>
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="email"
                  path="searchInfo.email"
                  label="E-mail Address"
                  placeholder="E-mail Address"
                  contexualHelpText="This should be the email id of the person who has registered for WebApply and initiated the application on behalf of the company."
                  component={Input}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <Field
                  name="raktrackNumber"
                  path="searchInfo.raktrackNumber"
                  label="RAKtrack Lead Reference Number"
                  placeholder="RAKtrack Lead Reference Number"
                  component={Input}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="tradeLicenseNo"
                  path="searchInfo.tradeLicenseNo"
                  label="Trade License Number"
                  placeholder="Track License Number"
                  component={Input}
                />
              </Grid>
            </Grid>

            <div className="linkContainer">
              <SubmitButton
                justify="flex-end"
                label="Search"
                disabled={Object.keys(omit(values, ["countryCode"])).every(key => !values[key])}
              />
            </div>
          </Form>
        )}
      </Formik>
      {searchResults.searchResult && <SearchResult searchResults={searchResults.searchResult} />}
    </div>
  );
};

const mapStateToProps = state => ({
  searchResults: getSearchResult.getSearchResult(state)
});

const mapDispatchToProps = {
  searchApplications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProspect);
