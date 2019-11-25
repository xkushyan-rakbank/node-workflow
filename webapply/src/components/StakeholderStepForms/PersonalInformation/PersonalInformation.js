import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";

import { DatePicker } from "../../Form/DatePicker/DatePicker";
import CustomCheckbox from "../../InputField/RefactoredCheckbox";
import { InlineRadioGroup } from "../../Form/InlineRadioGroup/InlineRadioGroup";
import InfoTitle from "../../InfoTitle";
import { CustomSelect, Input, InputGroup } from "../../Form";
import { genderOptions, yesNoOptions } from "../../../constants/options";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { useStyles } from "./styled";

const personalInformationSchema = Yup.object().shape({
  firstName: Yup.string().when("kycDetails.isShareholderACompany", {
    is: false,
    then: Yup.string().required("Required")
  }),
  lastName: Yup.string().when("kycDetails.isShareholderACompany", {
    is: false,
    then: Yup.string().required("Required")
  }),
  kycDetails: Yup.object().shape({
    dateOfBirth: Yup.date().required("Required"),
    isPEP: Yup.boolean().required("Required")
  })
});

export const PersonalInformation = props => {
  const classes = useStyles();
  const { index, handleContinue } = props;
  const checkIsShareholderACompany = values => get(values, "kycDetails.isShareholderACompany");
  return (
    <Formik
      initialValues={{
        gender: "Mr.",
        firstName: "",
        middleName: "",
        lastName: "",
        kycDetails: {
          isShareholderACompany: false,
          dateOfBirth: null,
          isPEP: ""
        }
      }}
      onSubmit={handleContinue}
      validationSchema={personalInformationSchema}
    >
      {props => {
        const isShareholderACompany = checkIsShareholderACompany(props.value);
        return (
          <Form>
            <Grid item container spacing={3}>
              <Grid item sm={12} className="mb-25 mt-25">
                <Field
                  name="kycDetails.isShareholderACompany"
                  label="This stakeholder is a company"
                  type="checkbox"
                  component={CustomCheckbox}
                  id="Okyc.isShareholderACompany"
                  indexes={[index]}
                  withQuestion
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item md={6} sm={12}>
                <InputGroup>
                  <Field
                    name="gender"
                    options={genderOptions}
                    disabled={isShareholderACompany}
                    component={CustomSelect}
                    shrink={false}
                  />

                  <Field
                    name="firstName"
                    label="First name"
                    placeholder="First name"
                    disabled={isShareholderACompany}
                    component={Input}
                  />
                </InputGroup>
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="middleName"
                  label="Middle Name (Optional)"
                  placeholder="Middle Name (Optional)"
                  disabled={isShareholderACompany}
                  component={Input}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item md={6} sm={12}>
                <Field
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                  disabled={isShareholderACompany}
                  component={Input}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="kycDetails.dateOfBirth"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  disabled={isShareholderACompany}
                  component={DatePicker}
                />
              </Grid>
            </Grid>
            <InfoTitle title="The details of this section should be the same as in the person’s passport" />
            <div className={classes.divider} />
            <Field
              component={InlineRadioGroup}
              name="kycDetails.isPEP"
              options={yesNoOptions}
              label="Is this person a signatory?"
            />

            <SubmitButton />
          </Form>
        );
      }}
    </Formik>
  );
};
