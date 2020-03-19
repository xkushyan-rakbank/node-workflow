import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import { format, isValid } from "date-fns";

import { getApplicantInfo } from "../../../../store/selectors/appConfig";
import { checkFullNameLength } from "./utils";
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
import { yesNoOptions } from "../../../../constants/options";
import { DATE_FORMAT } from "../../../../constants";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { ContexualHelp } from "../../../../components/Notifications";
import { Icon, ICONS } from "../../../../components/Icons";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";
import { StakeholdersNameManager } from "../StakeholdersNameProvider/StakeholdersNameProvider";
import { NAME_REGEX, checkIsTrimmed } from "../../../../utils/validation";

import { useStyles } from "./styled";

const personalInformationSchema = Yup.object().shape({
  salutation: Yup.string().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.string().required(getRequiredMessage("Salutation"))
  }),
  firstName: Yup.string().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.string()
      .required(getRequiredMessage("First name"))
      .max(30, "Maximum 30 characters allowed")
      .matches(NAME_REGEX, getInvalidMessage("First name"))
      .test("space validation", getInvalidMessage("First name"), checkIsTrimmed)
      .test(
        "length validation",
        "First, Middle and Last name combined have a limit of 77 characters",
        function(firstName) {
          const { middleName, lastName } = this.parent;
          return checkFullNameLength(firstName, middleName, lastName);
        }
      )
  }),
  middleName: Yup.string()
    .max(30, "Maximum 30 characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("Middle name"))
    .test("space validation", getInvalidMessage("Middle name"), checkIsTrimmed)
    .test(
      "length validation",
      "First, Middle and Last name combined have a limit of 77 characters",
      function(middleName) {
        const { firstName, lastName } = this.parent;
        return checkFullNameLength(firstName, middleName, lastName);
      }
    ),
  lastName: Yup.string().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.string()
      .required(getRequiredMessage("Last name"))
      .max(30, "Maximum 30 characters allowed")
      .matches(NAME_REGEX, getInvalidMessage("Last name"))
      .test("space validation", getInvalidMessage("Last name"), checkIsTrimmed)
      .test(
        "length validation",
        "First, Middle and Last name combined have a limit of 77 characters",
        function(lastName) {
          const { firstName, middleName } = this.parent;
          return checkFullNameLength(firstName, middleName, lastName);
        }
      )
  }),
  dateOfBirth: Yup.date().when("isShareholderACompany", {
    is: isShareholderACompany => !isShareholderACompany,
    then: Yup.date()
      .nullable()
      .typeError(getInvalidMessage("Date of birth"))
      .required(getRequiredMessage("Date of birth"))
  }),
  isPEP: Yup.boolean().required(
    "Field Is Person has held a position in the government or in a government-owned company/organizatio not filled"
  )
});

export const PersonalInformation = ({ index, handleContinue, id }) => {
  const classes = useStyles();

  const { changeStakeholderFullName } = StakeholdersNameManager;
  const applicantInfo = useSelector(getApplicantInfo);

  const createChangeProspectHandler = values => prospect => ({
    ...prospect,
    [`prospect.signatoryInfo[${index}].fullName`]: values.isShareholderACompany
      ? applicantInfo.fullName
      : [values.firstName, values.middleName, values.lastName].filter(item => item).join(" ")
  });

  const createChangeHandler = (values, setFieldValue) => event => {
    const { name, value } = event.target;
    const data = {
      ...values,
      id,
      [name]: value
    };

    changeStakeholderFullName(data);
    setFieldValue(name, value);
  };

  return (
    <Formik
      initialValues={{
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        isShareholderACompany: false,
        dateOfBirth: "",
        isPEP: ""
      }}
      onSubmit={handleContinue}
      validationSchema={personalInformationSchema}
      validateOnChange={true}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <Grid item container spacing={3}>
            <Grid item sm={12} className={cx("mb-25 mt-25", classes.companyFieldWrapper)}>
              <Field
                name="isShareholderACompany"
                path={"prospect.orgKYCDetails.isShareholderACompany"}
                label="This stakeholder is a company"
                component={Checkbox}
                onChange={() => {
                  setFieldValue("isShareholderACompany", !values.isShareholderACompany);
                }}
                changeProspect={createChangeProspectHandler(values)}
                inputProps={{ tabIndex: 0 }}
              />
              <ContexualHelp
                title="Select this check box if another company holds any shares based on Memorandum of Association / Articles of Association / Partners agreement / Service Agreement / Share Certificate"
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
              <InputGroup
                error={
                  (touched.firstName && errors.firstName) ||
                  (touched.salutation && errors.salutation)
                }
              >
                <Field
                  name="salutation"
                  path={`prospect.signatoryInfo[${index}].salutation`}
                  disabled={!!values.isShareholderACompany}
                  component={CustomSelect}
                  shrink={false}
                  datalistId="salutation"
                  inputProps={{ tabIndex: 0 }}
                  ErrorMessageComponent={() => null}
                />

                <Field
                  name="firstName"
                  path={`prospect.signatoryInfo[${index}].firstName`}
                  label="First name"
                  placeholder="First name"
                  disabled={!!values.isShareholderACompany}
                  component={Input}
                  changeProspect={createChangeProspectHandler(values)}
                  onChange={createChangeHandler(values, setFieldValue)}
                  InputProps={{
                    inputProps: { maxLength: 30, tabIndex: 0 }
                  }}
                  contextualHelpText="Given Name of the stakeholder exactly the way it is mentioned in the passport"
                  ErrorMessageComponent={() => null}
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
                onChange={createChangeHandler(values, setFieldValue)}
                changeProspect={createChangeProspectHandler(values)}
                InputProps={{
                  inputProps: { maxLength: 30, tabIndex: 0 }
                }}
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
                onChange={createChangeHandler(values, setFieldValue)}
                changeProspect={createChangeProspectHandler(values)}
                InputProps={{
                  inputProps: { maxLength: 30, tabIndex: 0 }
                }}
                contextualHelpText="Surname of the stakeholder exactly the way it is mentioned in the passport"
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
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
                changeProspect={(_, value, path) =>
                  isValid(value) && {
                    [path]: format(value, DATE_FORMAT)
                  }
                }
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
            disabled={!!values.isShareholderACompany}
            label="This Person, or a relative of this person by blood or by law, or a close associate, holds/has held a position in the government or in a government-owned company/organization in any country."
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
          />

          <SubmitButton />
        </Form>
      )}
    </Formik>
  );
};
