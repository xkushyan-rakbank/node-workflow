import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { InfoTitle } from "../../../../components/InfoTitle";
import {
  CustomSelect,
  Input,
  InputGroup,
  AutoSaveField as Field,
  Checkbox,
  DatePicker,
  InlineRadioGroup
} from "../../../../components/Form";
import { withCompanyStakeholderFormik } from "../StakeholderFormik";
import { yesNoOptions } from "../../../../constants/options";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { ContexualHelp } from "../../../../components/Notifications";
import { Icon, ICONS } from "../../../../components/Icons";

import { NAME_REGEX } from "../../../../utils/validation";

import { useStyles } from "./styled";

const personalInformationSchema = Yup.object().shape({
  firstName: Yup.string().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.string()
      .required("Required")
      .matches(NAME_REGEX, "This is not a valid first name")
  }),
  middleName: Yup.string().matches(NAME_REGEX, "This is not a valid middle name"),
  lastName: Yup.string().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.string()
      .required("Required")
      .matches(NAME_REGEX, "This is not a valid last name")
  }),
  dateOfBirth: Yup.date().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.date()
      .typeError("This is not a valid date")
      .required("Required")
  }),
  isPEP: Yup.boolean().required("Required")
});

export const PersonalInformation = ({
  index,
  handleContinue,
  filledStakeholder,
  setFillStakeholder
}) => {
  const classes = useStyles();
  const setUnfilledStakeholder = () => setFillStakeholder(index, false);

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
      {withCompanyStakeholderFormik(
        { filledStakeholder, setUnfilledStakeholder },
        ({ values, setFieldValue, resetForm }) => (
          <Form>
            <Grid item container spacing={3}>
              <Grid item sm={12} className={cx("mb-25 mt-25", classes.companyFieldWrapper)}>
                <Field
                  name="isShareholderACompany"
                  path={`prospect.signatoryInfo[${index}].kycDetails.isShareholderACompany`}
                  label="This stakeholder is a company"
                  component={Checkbox}
                  onChange={() => {
                    resetForm();
                    setFieldValue("isShareholderACompany", !values.isShareholderACompany);
                  }}
                />
                <ContexualHelp
                  title="Select 'Yes' if this person holds any shares based on Memorandum of Association/Articles of Association/Partners agreement/Service Agreement/Share"
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
              label="This Person, or a relative of this person by relation or by law, or a close associate, holds/has held a position in the government or in a government-owned company/organization in any country."
            />

            <SubmitButton />
          </Form>
        )
      )}
    </Formik>
  );
};
