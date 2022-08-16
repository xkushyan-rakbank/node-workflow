import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import {
  Input,
  SelectAutocomplete,
  AutoSaveField as Field,
  NumberFormat
} from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import {
  NUMBER_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  checkIsTrimmed
} from "../../../../utils/validation";
import { updateProspect } from "../../../../store/actions/appConfig";
import { MAX_COMPANY_NAME_LENGTH, MAX_REGISTRATION_NUMBER_LENGTH } from "../../constants";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";
import { useStyles } from "../styled";

const initialValues = {
  companyName: "",
  vatRegistrationNumber: "",
  numberOfEmployees: "0",
  companyCategory: ""
};

const companyDetailsSchema = () =>
  Yup.object({
    companyName: Yup.string()
      .required(getRequiredMessage("Company name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
      .test("space validation", getInvalidMessage("Company name"), checkIsTrimmed),
    vatRegistrationNumber: Yup.string().matches(
      NUMBER_REGEX,
      getInvalidMessage("Registration number")
    ),
    numberOfEmployees: Yup.number()
      .typeError("Not valid number")
      .min(0, "Must be more than or equal to 0")
      .max(99999, "Must be less than or equal to 99,999")
      .integer(getInvalidMessage("Number of employees")),
    companyCategory: Yup.string().required(getRequiredMessage("Company category"))
  });

export const CompanyDetails = ({ handleContinue, createFormChangeHandler, companyName }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    companyName !== "" &&
      dispatch(
        updateProspect({
          "prospect.kycAnnexure.companyName": companyName
        })
      );
  }, [companyName]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companyDetailsSchema}
      validateOnChange={false}
      onSubmit={handleContinue}
    >
      {createFormChangeHandler(values => (
        <Form>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="companyName"
                label="Company Name"
                path="prospect.organizationInfo.companyName"
                contextualHelpText="The company name given here will appear in all Bank records including Cheque Books. If the Company's name in Trade License is more than 50 characters long (including space), then an abbreviation can be used. Example If the company name is 'Airlift Global Automation and Heavy Equipment Rental LLC', mention the company name as 'Airlift Global Automation H E R'"
                infoTitle="These details should be the same as in your Trade License"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="companyCategory"
                label="Company Category"
                path="prospect.orgKYCDetails.companyCategory"
                contextualHelpText="Select Foreign / Offshore / Non-Resident company if applicable. In case of a Free Zone company  select Free Zone. In case of Civil Company select  Partnerships. Select appropriate category in all other cases"
                datalistId="companyCategory"
                component={SelectAutocomplete}
                tabIndex="0"
                isSearchable
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="vatRegistrationNumber"
                label="VAT registration number (optional)"
                placeholder="123456789012345"
                path="prospect.organizationInfo.vatRegistrationNumber"
                infoTitle="This should be the same as your TRN number of UAE"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_REGISTRATION_NUMBER_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="numberOfEmployees"
                label="Number of employees (optional)"
                path="prospect.organizationInfo.numberOfEmployees"
                component={Input}
                changeProspect={(_, value, path) => ({ [path]: value || "0" })}
                InputProps={{
                  inputComponent: NumberFormat,
                  inputProps: {
                    tabIndex: 0,
                    allowNegative: false,
                    decimalScale: 0
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid
            className={cx(classes.continueButton, classes.detailsContinueButton)}
            container
            direction="row"
            justify="flex-end"
          >
            <ContinueButton type="submit" />
          </Grid>
        </Form>
      ))}
    </Formik>
  );
};
