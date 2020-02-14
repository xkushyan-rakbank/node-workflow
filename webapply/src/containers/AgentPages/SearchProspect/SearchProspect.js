import React, { useCallback, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import get from "lodash/get";
import * as Yup from "yup";
import omit from "lodash/omit";

import { Input, CustomSelect, InputGroup, AutoSaveField as Field } from "../../../components/Form";
import {
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH,
  NAME_REGEX,
  ALPHANUMERIC_REGEX,
  UAE_MOBILE_PHONE_REGEX
} from "../../../utils/validation";
import { MAX_EMAIL_LENGTH } from "./constants";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { SearchResult } from "../SearchResult";
import { UAE_CODE } from "../../../constants";
import { getInvalidMessage } from "../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const searchProspectSchema = Yup.object({
  fname: Yup.string()
    .max(30, "Maximum 30 characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("Applicant Name")),
  mobileNo: Yup.string().when("countryCode", {
    is: countryCode => countryCode === UAE_CODE,
    then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, `${getInvalidMessage("Mobile Number")}`),
    otherwise: Yup.string()
      .matches(NUMBER_REGEX, `${getInvalidMessage("Mobile Number")} (wrong characters)`)
      .min(
        MIN_NON_UAE_PHONE_LENGTH,
        `${getInvalidMessage("Mobile Number")} (min length is not reached)`
      )
      .test(
        "length validation",
        `${getInvalidMessage("Mobile Number")} (max length exceeded)`,
        function() {
          const { countryCode = "", mobileNo = "" } = this.parent;
          return countryCode.length + mobileNo.length <= MAX_NON_UAE_PHONE_LENGTH;
        }
      )
  }),
  email: Yup.string().email(getInvalidMessage("Email")),
  raktrackNumber: Yup.string()
    .max(20, "Maximum 20 characters allowed")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("RAKtrack Lead Reference Number")),
  tradeLicenseNo: Yup.string()
    .max(20, "Maximum 20 characters allowed")
    .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Trade License Number"))
});

const initialValues = {
  fname: "",
  countryCode: UAE_CODE,
  mobileNo: "",
  email: "",
  raktrackNumber: "",
  tradeLicenseNo: ""
};

export const SearchProspectComponent = ({ searchApplications, searchResults, isLoading }) => {
  const classes = useStyles();
  const [isSearchLaunched, setSearchStatus] = useState(false);
  const handleSubmit = useCallback(
    values => {
      setSearchStatus(true);
      searchApplications(values);
    },
    [searchApplications]
  );

  return (
    <div className={classes.baseForm}>
      <h2>Search Applications</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={searchProspectSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Field
              name="fname"
              path="searchInfo.fname"
              label="Applicant Name"
              placeholder="Applicant Name"
              contextualHelpText="This should be the name of the person who has registered for WebApply and initiated the application on behalf of the company."
              component={Input}
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />

            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <InputGroup>
                  <Field
                    name="countryCode"
                    path="searchInfo.countryCode"
                    datalistId="countryCode"
                    component={CustomSelect}
                    shrink={false}
                    inputProps={{ tabIndex: 0 }}
                  />

                  <Field
                    name="mobileNo"
                    path="searchInfo.mobileNo"
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    contextualHelpText="This should be the mobile number of the person who has registered for WebApply and initiated the application on behalf of the company."
                    component={Input}
                    InputProps={{
                      inputProps: { tabIndex: 0 }
                    }}
                  />
                </InputGroup>
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="email"
                  path="searchInfo.email"
                  label="E-mail Address"
                  placeholder="E-mail Address"
                  contextualHelpText="This should be the email id of the person who has registered for WebApply and initiated the application on behalf of the company."
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: MAX_EMAIL_LENGTH, tabIndex: 0 }
                  }}
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
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="tradeLicenseNo"
                  path="searchInfo.tradeLicenseNo"
                  label="Trade License Number"
                  placeholder="Track License Number"
                  component={Input}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
            </Grid>

            <div className="linkContainer">
              <SubmitButton
                justify="flex-end"
                label="Search"
                disabled={
                  isLoading || Object.keys(omit(values, ["countryCode"])).every(key => !values[key])
                }
              />
            </div>
          </Form>
        )}
      </Formik>
      {isSearchLaunched && !isLoading && (
        <SearchResult searchResults={get(searchResults, "searchResult", [])} />
      )}
    </div>
  );
};
