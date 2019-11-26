import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { DatePicker } from "../../Form/DatePicker/DatePicker";
import { InlineRadioGroup } from "../../Form/InlineRadioGroup/InlineRadioGroup";
import InfoTitle from "../../InfoTitle";
import { CustomSelect, Input, InputGroup, AutoSaveField as Field, Checkbox } from "../../Form";
import { genderOptions, yesNoOptions } from "../../../constants/options";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { useStyles } from "./styled";
import { ContexualHelp } from "../../Notifications";
import questionMark from "../../../assets/icons/question_mark_grey.png";

const personalInformationSchema = Yup.object().shape({
  firstName: Yup.string().when("isShareholderACompany", {
    is: false,
    then: Yup.string().required("Required")
  }),
  lastName: Yup.string().when("isShareholderACompany", {
    is: false,
    then: Yup.string().required("Required")
  }),
  dateOfBirth: Yup.date().when("isShareholderACompany", {
    is: false,
    then: Yup.date().required("Required")
  }),
  isPEP: Yup.boolean().required("Required")
});

export const PersonalInformation = ({ index, handleContinue }) => {
  const classes = useStyles();
  const checkIsShareholderACompany = values => get(values, "isShareholderACompany");
  return (
    <Formik
      initialValues={{
        gender: "Mr.",
        firstName: "",
        middleName: "",
        lastName: "",
        isShareholderACompany: "",
        dateOfBirth: "",
        isPEP: ""
      }}
      onSubmit={handleContinue}
      validationSchema={personalInformationSchema}
    >
      {({ values }) => {
        const isShareholderACompany = checkIsShareholderACompany(values);
        return (
          <Form>
            <Grid item container spacing={3}>
              <Grid item sm={12} className={cx("mb-25 mt-25", classes.companyFieldWrapper)}>
                <Field
                  name="isShareholderACompany"
                  path={`prospect.signatoryInfo[${index}].kycDetails.isShareholderACompany`}
                  label="This stakeholder is a company"
                  component={Checkbox}
                />
                <ContexualHelp
                  title="Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  placement="right"
                  onFocus={false}
                >
                  <img alt="" src={questionMark} className={classes.questionIcon} />
                </ContexualHelp>
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item md={6} sm={12}>
                <InputGroup>
                  <Field
                    name="gender"
                    path={`prospect.signatoryInfo[${index}].gender`}
                    options={genderOptions}
                    disabled={isShareholderACompany}
                    component={CustomSelect}
                    shrink={false}
                  />

                  <Field
                    name="firstName"
                    path={`prospect.signatoryInfo[${index}].firstName`}
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
                  path={`prospect.signatoryInfo[${index}].middleName`}
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
                  path={`prospect.signatoryInfo[${index}].lastName`}
                  label="Last name"
                  placeholder="Last name"
                  disabled={isShareholderACompany}
                  component={Input}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Field
                  name="dateOfBirth"
                  path={`prospect.signatoryInfo[${index}].kycDetails.dateOfBirth`}
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
              name="isPEP"
              path={`prospect.signatoryInfo[${index}].kycDetails.isPEP`}
              component={InlineRadioGroup}
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
