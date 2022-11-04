/* eslint-disable max-len */
import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Formik, Form } from "formik";
import round from "lodash/round";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import { format, isValid } from "date-fns";
import InputAdornment from "@material-ui/core/InputAdornment";

import { checkFullNameLength } from "./utils";
import { InfoTitle } from "../../../../components/InfoTitle";
import { updateProspect } from "../../../../store/actions/appConfig";

import {
  CustomSelect,
  Input,
  InputGroup,
  AutoSaveField as Field,
  Checkbox,
  DatePicker,
  //CheckboxGroup,
  InlineRadioGroup,
  SelectAutocomplete,
  NumberFormat
} from "../../../../components/Form";
import { yesNoOptions } from "../../../../constants/options";
import { DATE_FORMAT, UAE } from "../../../../constants";
import { MAX_COMPANY_NAME_LENGTH, MAX_LICENSE_NUMBER_LENGTH } from "../../constants";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { ContexualHelp } from "../../../../components/Notifications";
import { Icon, ICONS } from "../../../../components/Icons";
import {
  getInvalidMessage,
  getRequiredMessage,
  getMinDateMessage,
  getNotTrimmedMessage
} from "../../../../utils/getValidationMessage";
import { StakeholdersNameManager } from "../StakeholdersNameProvider/StakeholdersNameProvider";
import {
  NAME_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  checkIsTrimmed,
  //ALPHANUMERIC_REGEX,
  LICENSE_NUMBER_REGEX
} from "../../../../utils/validation";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { resetStakeholderInfo } from "../../../../store/actions/stakeholders";
import { getPercentageWithoutCurrentStakeholder } from "../../../../store/selectors/stakeholders";

import { useStyles } from "./styled";

const currentYear = format(new Date(), "yyyy");
const FiftyYearsAgo = new Date();
FiftyYearsAgo.setFullYear(FiftyYearsAgo.getFullYear() - 50, 0, 1);
const FiftyYearsAgoYear = FiftyYearsAgo.getFullYear();
const PercentageInput = props => <NumberFormat decimalSeparator="." decimalScale={2} {...props} />;

const personalInformationSchema = totalPercentageWithoutCurrentStakeholder =>
  Yup.object().shape({
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
        .test("space validation", getNotTrimmedMessage("First name"), checkIsTrimmed)
        .test(
          "length validation",
          "First, Middle and Last name combined have a limit of 120 characters",
          function(firstName) {
            const { middleName, lastName } = this.parent;
            return checkFullNameLength(firstName, middleName, lastName);
          }
        )
    }),
    middleName: Yup.string()
      .max(8, "Maximum 8 characters allowed")
      .matches(NAME_REGEX, getInvalidMessage("Middle name"))
      .test("space validation", getNotTrimmedMessage("Middle name"), checkIsTrimmed)
      .test(
        "length validation",
        "First, Middle and Last name combined have a limit of 120 characters",
        function(middleName) {
          const { firstName, lastName } = this.parent;
          return checkFullNameLength(firstName, middleName, lastName);
        }
      ),
    lastName: Yup.string().when("isShareholderACompany", {
      is: isShareholderACompany => !isShareholderACompany,
      then: Yup.string()
        .required(getRequiredMessage("Last name"))
        .max(40, "Maximum 40 characters allowed")
        .matches(NAME_REGEX, getInvalidMessage("Last name"))
        .test("space validation", getNotTrimmedMessage("Last name"), checkIsTrimmed)
        .test(
          "length validation",
          "First, Middle and Last name combined have a limit of 120 characters",
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
        .min(new Date(1900, 0, 1), getMinDateMessage("Date of birth"))
        .max(new Date(), getInvalidMessage("Date of birth"))
        .typeError(getInvalidMessage("Date of birth"))
        .required(getRequiredMessage("Date of birth"))
    }),
    isPEP: Yup.boolean().when("isShareholderACompany", {
      is: isShareholderACompany => !isShareholderACompany,
      then: Yup.boolean()
        .nullable()
        .required(
          getRequiredMessage(
            "Is Person has held a position in the government or in a government-owned company/organization"
          )
        )
    }),
    companyName: Yup.string()
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
      .test("space validation", getNotTrimmedMessage("Company name"), checkIsTrimmed)
      .when("isShareholderACompany", {
        is: isShareholderACompany => isShareholderACompany,
        then: Yup.string().required(getRequiredMessage("Company name"))
      }),
    tradeLicenseNo: Yup.string().when("isShareholderACompany", {
      is: isShareholderACompany => isShareholderACompany,
      then: Yup.string()
        .required(getRequiredMessage("TL Number"))
        .matches(LICENSE_NUMBER_REGEX, getInvalidMessage("TL Number"))
    }),
    country: Yup.string().when("isShareholderACompany", {
      is: isShareholderACompany => isShareholderACompany,
      then: Yup.string()
        //.default("United Arab Emirates")
        .required(getRequiredMessage("Country of Incorporation"))
    }),
    dateOfIncorporation: Yup.date().when("isShareholderACompany", {
      is: isShareholderACompany => isShareholderACompany,
      then: Yup.date()
        .nullable()
        .min(
          new Date(FiftyYearsAgoYear, 0, 1),
          `License issuing date should not be less than 01/01/${FiftyYearsAgoYear}`
        )
        .max(new Date(currentYear, 11, 31), getInvalidMessage("License issuing date"))
        .typeError(getInvalidMessage("License issuing date"))
        .required(getRequiredMessage("License issuing date"))
    }),
    shareHoldingPercentage: Yup.number().when("isShareholderACompany", {
      is: isShareholderACompany => isShareholderACompany,
      then: Yup.number()
        .min(0, "Shareholders can't hold less than 0% of shares in total")
        .max(
          round(100 - totalPercentageWithoutCurrentStakeholder, 2),
          "Shareholders can't hold more than 100% of shares in total"
        )
        .required(getRequiredMessage("Percentage"))
    }),
    isShareholder: Yup.boolean().when("isShareholderACompany", {
      is: isShareholderACompany => isShareholderACompany,
      then: Yup.boolean()
        .nullable()
        .required(getRequiredMessage("Is this company a shareholder"))
    })
  });

export const PersonalInformationStep = ({
  index,
  handleContinue,
  id,
  createFormChangeHandler,
  signatoryDocs,
  resetStakeholderInfo,
  totalPercentageWithoutCurrentStakeholder,
  signatoryProminentPosition,
  signatoryTlnumber,
  isShareholderACompany,
  updateProspect,
  signatoryCompanyInfo
}) => {
  const classes = useStyles();
  const personalInfoRef = useRef();

  useEffect(() => {
    const {
      hasProminentPosition = "",
      hasDiplomaticPassport = "",
      isMemberofRulingFamily = ""
    } = signatoryCompanyInfo;
    if (hasProminentPosition || hasDiplomaticPassport || isMemberofRulingFamily) {
      updateProspect({
        [`prospect.signatoryInfo[${index}].kycDetails.isPEP`]: true
      });
    } else {
      updateProspect({
        [`prospect.signatoryInfo[${index}].kycDetails.isPEP`]: false
      });
    }
  }, [
    signatoryCompanyInfo.hasProminentPosition,
    signatoryCompanyInfo.hasDiplomaticPassport,
    signatoryCompanyInfo.isMemberofRulingFamily
  ]);

  const createChangeProspectHandler = values => prospect => ({
    ...prospect,
    [`prospect.signatoryInfo[${index}].fullName`]: values.isShareholderACompany
      ? values.companyName
      : [values.firstName, values.middleName, values.lastName].filter(item => item).join(" ")
    // eslint-disable-next-line max-len
    // [`prospect.signatoryInfo[${index}].signatoryCompanyInfo.hasProminentPosition`]: values.isShareholderACompany
    //   ? values.hasProminentPosition
    //   : false
  });

  const createChangeHandler = (values, setFieldValue) => event => {
    const { name, value } = event.target;
    const data = {
      ...values,
      id,
      [name]: value
    };

    StakeholdersNameManager && StakeholdersNameManager.changeStakeholderFullName(data);
    setFieldValue(name, value);
  };

  const changeDateProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(value, DATE_FORMAT) };

  const createShareholderHandler = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    setFieldValue("isShareholder", value);
    const shareHoldingPercentage = value !== values.isShareholder && !value ? 0 : "";
    setFieldValue("shareHoldingPercentage", shareHoldingPercentage);
  };
  return (
    <Formik
      innerRef={personalInfoRef}
      initialValues={{
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        kycDetails: {
          isShareholderACompany: false
        },
        isShareholder: "",
        shareHoldingPercentage: "",
        dateOfBirth: "",
        isPEP: "",
        companyName: "",
        tradeLicenseNo: signatoryTlnumber,
        dateOfIncorporation: "",
        country: UAE,
        hasProminentPosition: signatoryProminentPosition
      }}
      onSubmit={handleContinue}
      validationSchema={personalInformationSchema(totalPercentageWithoutCurrentStakeholder)}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, setFieldValue, errors, touched }) => {
        const shareholderHandler = createShareholderHandler({ values, setFieldValue });
        return (
          <Form>
            <Grid item container spacing={3}>
              <Grid item xs={12} className={cx("mb-25 mt-25", classes.companyFieldWrapper)}>
                <Field
                  name="isShareholderACompany"
                  path={`prospect.signatoryInfo[${index}].kycDetails.isShareholderACompany`}
                  label="This stakeholder is a company"
                  component={Checkbox}
                  onChange={() => {
                    resetStakeholderInfo(index);
                    setFieldValue("isShareholderACompany", !values.isShareholderACompany);
                    setFieldValue("dateOfBirth", "");
                    setFieldValue("middleName", "");
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
            {values.isShareholderACompany ? (
              <>
                <Grid item container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="companyName"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.companyName`}
                      label="Company Name"
                      placeholder="Company Name"
                      component={Input}
                      changeProspect={createChangeProspectHandler(values)}
                      InputProps={{
                        inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                      }}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Field
                      name="tradeLicenseNo"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.tradeLicenseNo`}
                      label="TL Number"
                      placeholder="TL Number"
                      component={Input}
                      InputProps={{
                        inputProps: { maxLength: MAX_LICENSE_NUMBER_LENGTH, tabIndex: 0 }
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="dateOfIncorporation"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.dateOfIncorporation`}
                      label="Date of Incorporation"
                      //placeholder="Year of TL Issued/Year of Incorporation"
                      component={DatePicker}
                      minDate={FiftyYearsAgo}
                      changeProspect={changeDateProspectHandler}
                      InputProps={{
                        inputProps: { tabIndex: 0 }
                      }}
                      maxDate={new Date()}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="country"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.countryOfIncorporation`}
                      label="Country of Incorporation"
                      datalistId="countryOfIncorporation"
                      component={SelectAutocomplete}
                      InputProps={{
                        inputProps: { maxLength: 30, tabIndex: 0 }
                      }}
                    />
                  </Grid>
                  <Grid item container spacing={3}>
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="isShareholder"
                        component={InlineRadioGroup}
                        path={`prospect.signatoryInfo[${index}].kycDetails.isShareholder`}
                        options={yesNoOptions}
                        label="Is this company a shareholder?"
                        onChange={shareholderHandler}
                        contextualHelpProps={{
                          isDisableHoverListener: false,
                          placement: "bottom-end"
                        }}
                        contextualHelpText="Select 'Yes' if this Company holds any shares based on Memorandum of Association/ Articles of Association/ Partners agreement/ Service Agreement/ Share Certificate"
                        InputProps={{
                          inputProps: { tabIndex: 0 }
                        }}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Field
                        name="shareHoldingPercentage"
                        path={`prospect.signatoryInfo[${index}].kycDetails.shareHoldingPercentage`}
                        label="Percentage"
                        placeholder={values.isShareholder ? "33.33" : "Percentage"}
                        disabled={!values.isShareholder}
                        component={Input}
                        InputProps={{
                          inputComponent: PercentageInput,
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          inputProps: { maxLength: 6, tabIndex: 0 }
                        }}
                        contextualHelpText="Mention the percentage of shares held based on  Memorandum of Association/ Articles of Association/ Partners agreement/ Service Agreement/ Share Certificate"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item className={classes.textGrid} sm={12} xs={12}>
                    <p>
                      Any signatory/shareholder/senior official (including their close
                      relatives/associates)
                    </p>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      //typeRadio
                      name="hasProminentPosition"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.hasProminentPosition`}
                      label="Currently hold or have held in past, prominent position in a government/judicial/military/political organisation within or outside UAE"
                      component={Checkbox}
                      //options={Checkbox}
                      InputProps={{
                        inputProps: { tabIndex: 0 }
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="displomaticPassport"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.hasDiplomaticPassport`}
                      label="Currently hold a diplomatic passport in UAE or other country"
                      component={Checkbox}
                      inputProps={{ tabIndex: 0 }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="memberOfRulingFamily"
                      path={`prospect.signatoryInfo[${index}].signatoryCompanyInfo.isMemberofRulingFamily`}
                      label="Is a member of Ruling family in UAE or outside UAE"
                      component={Checkbox}
                      inputProps={{ tabIndex: 0 }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid item container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <InputGroup
                      error={
                        (touched.firstName && errors.firstName) ||
                        (touched.salutation && errors.salutation)
                      }
                    >
                      <Field
                        name="salutation"
                        path={`prospect.signatoryInfo[${index}].kycDetails.salutation`}
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

                  <Grid item sm={6} xs={12}>
                    <Field
                      name="middleName"
                      path={`prospect.signatoryInfo[${index}].middleName`}
                      label="Middle Name (optional)"
                      placeholder="Middle Name (optional)"
                      disabled={!!values.isShareholderACompany}
                      component={Input}
                      onKeyUp={createChangeHandler(values, setFieldValue)}
                      changeProspect={createChangeProspectHandler(values)}
                      InputProps={{
                        inputProps: { maxLength: 8, tabIndex: 0 }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="lastName"
                      path={`prospect.signatoryInfo[${index}].lastName`}
                      label="Last name"
                      placeholder="Last name"
                      disabled={!!values.isShareholderACompany}
                      component={Input}
                      onKeyUp={createChangeHandler(values, setFieldValue)}
                      changeProspect={createChangeProspectHandler(values)}
                      InputProps={{
                        inputProps: { maxLength: 40, tabIndex: 0 }
                      }}
                      contextualHelpText="Surname of the stakeholder exactly the way it is mentioned in the passport"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
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
                      maxDate={new Date()}
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
                  label="This Person, or a relative of this person by blood or by law, or a close associate, holds/has held a position in the government or in a government-owned company/organization in any country."
                  disabled={!!values.isShareholderACompany}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </>
            )}

            <SubmitButton />
          </Form>
        );
      })}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  signatoryDocs: get(getSignatories(state)[index], "stakeholdersDocuments.documents", []),
  totalPercentageWithoutCurrentStakeholder: getPercentageWithoutCurrentStakeholder(state, index),
  signatoryProminentPosition: get(
    getSignatories(state)[index],
    "signatoryCompanyInfo.hasProminentPosition",
    ""
  ),
  signatoryCompanyInfo: get(getSignatories(state)[index], "signatoryCompanyInfo", ""),
  isShareholderACompany: get(getSignatories(state)[index], "kycDetails.isShareholderACompany", ""),
  signatoryTlnumber: get(getSignatories(state)[index], "signatoryCompanyInfo.tradeLicenseNo", "")
});

const mapDispatchToProps = {
  resetStakeholderInfo,
  updateProspect
};

export const PersonalInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationStep);
