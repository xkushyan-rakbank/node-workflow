import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { DatePicker } from "../../Form/DatePicker/DatePicker";
import { InlineRadioGroup } from "../../Form/InlineRadioGroup/InlineRadioGroup";
import InfoTitle from "../../InfoTitle";
import { CustomSelect, Input, InputGroup, AutoSaveField as Field, Checkbox } from "../../Form";
import { yesNoOptions } from "../../../constants/options";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { ContexualHelp } from "../../Notifications";
import { Icon, ICONS } from "../../Icons";
import { useStyles } from "./styled";

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
  return (
    <Formik
      initialValues={{
        gender: "",
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
      {({ values }) => (
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
                isDisableHoverListener={false}
              >
                <span className={classes.questionIcon}>
                  <Icon name={ICONS.question} alt="question" className={classes.iconSize} />
                </span>
              </ContexualHelp>
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item md={6} sm={12}>
              <InputGroup>
                <Field
                  name="gender"
                  path={`prospect.signatoryInfo[${index}].gender`}
                  disabled={!!values.isShareholderACompany}
                  component={CustomSelect}
                  shrink={false}
                  datalistId="gender"
                />

                <Field
                  name="firstName"
                  path={`prospect.signatoryInfo[${index}].firstName`}
                  label="First name"
                  placeholder="First name"
                  disabled={!!values.isShareholderACompany}
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
                disabled={!!values.isShareholderACompany}
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
                disabled={!!values.isShareholderACompany}
                component={Input}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="dateOfBirth"
                path={`prospect.signatoryInfo[${index}].kycDetails.dateOfBirth`}
                label="Date of Birth"
                placeholder="Date of Birth"
                disabled={!!values.isShareholderACompany}
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
      )}
    </Formik>
  );
};
