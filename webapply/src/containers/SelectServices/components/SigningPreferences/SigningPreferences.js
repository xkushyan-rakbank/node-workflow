import React from "react";
import get from "lodash/get";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import {
  NAME_REGEX,
  UAE_MOBILE_PHONE_REGEX,
  UAE_LANDLINE_PHONE_REGEX,
  NUMBER_REGEX,
  MIN_NON_UAE_PHONE_LENGTH,
  MAX_NON_UAE_PHONE_LENGTH
} from "../../../../utils/validation";
import { ACCOUNTS_SIGNING_NAME_OTHER } from "../../constants";
import { UAE_CODE } from "../../../../constants";
import { Subtitle } from "../../../../components/Subtitle";
import {
  Input,
  InputGroup,
  CustomSelect,
  CheckboxGroup,
  AutoSaveField as Field
} from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { Divider } from "../Divider";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { ConfirmingTransactions } from "./ConfirmingTransactions";
import { ArrayRemoveButton } from "../../../FinalQuestions/components/Buttons/ArrayRemoveButton";

import { useStyles } from "./styled";

const MAX_SIGNATORIES = 2;
const signingPreferencesSchema = Yup.object({
  accountSigningType: Yup.string()
    .required("Field is required")
    .min(2),
  accountSigningInstn: Yup.string().when("accountSigningType", {
    is: selectedAccountType => selectedAccountType === ACCOUNTS_SIGNING_NAME_OTHER,
    then: Yup.string()
      .max(50, "Max length is 50 symbols")
      .required("Field is required")
  }),
  signatories: Yup.array().of(
    Yup.object().shape({
      TxnReconfirmingfullname: Yup.string()
        .matches(NAME_REGEX, "This is not a valid name")
        .required("Field is required"),
      primaryMobCountryCode: Yup.string().required("Field is required"),
      primaryMobileNo: Yup.string()
        .when("TxnReconfirmingfullname", {
          is: value => !!value,
          then: Yup.string()
            .required("You need to provide mobile number")
            .when("primaryMobCountryCode", {
              is: primaryMobCountryCode => primaryMobCountryCode === UAE_CODE,
              then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, "This is not a valid phone"),
              otherwise: Yup.string()
                .matches(NUMBER_REGEX, "This is not a valid phone not number (wrong characters)")
                .min(
                  MIN_NON_UAE_PHONE_LENGTH,
                  "This is not a valid phone (min length is not reached)"
                )
                .test(
                  "length validation",
                  "This is not a valid phone (max length exceeded)",
                  function(mobilePhone) {
                    return (
                      mobilePhone &&
                      this.parent &&
                      this.parent.primaryMobCountryCode &&
                      this.parent.primaryMobCountryCode.length + mobilePhone.length <=
                        MAX_NON_UAE_PHONE_LENGTH
                    );
                  }
                )
            })
        })
        .required("Field is required"),
      primaryPhoneCountryCode: Yup.string(),
      primaryPhoneNo: Yup.string().when("primaryPhoneCountryCode", {
        is: primaryPhoneCountryCode => primaryPhoneCountryCode === UAE_CODE,
        then: Yup.string().matches(UAE_LANDLINE_PHONE_REGEX, "This is not a valid phone"),
        otherwise: Yup.string()
          .matches(NUMBER_REGEX, "This is not a valid phone not number (wrong characters)")
          .min(MIN_NON_UAE_PHONE_LENGTH, "This is not a valid phone (min length is not reached)")
          .test("length validation", "This is not a valid phone (max length exceeded)", function() {
            const { primaryPhoneCountryCode = "", primaryPhoneNo = "" } = this.parent;
            return (
              primaryPhoneCountryCode.length + primaryPhoneNo.length <= MAX_NON_UAE_PHONE_LENGTH
            );
          })
      })
    })
  )
});
const pathSignatoryInfo = "prospect.signatoryInfo[0].accountSigningInfo.accountSigningInstn";

export const SigningPreferencesComponent = ({ organizationInfo, goToNext, updateProspect }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        accountSigningType: "",
        accountSigningInstn: "",
        signatories: [
          {
            TxnReconfirmingfullname: "",
            primaryMobCountryCode: UAE_CODE,
            primaryMobileNo: "",
            primaryPhoneCountryCode: UAE_CODE,
            primaryPhoneNo: ""
          }
        ]
      }}
      validationSchema={signingPreferencesSchema}
      validateOnChange={false}
      onSubmit={goToNext}
    >
      {({
        values: { accountSigningInstn, accountSigningType, signatories },
        setFieldValue,
        errors
      }) => {
        const signatoriesErrors = Object.keys(get(errors, "signatories", [])).length;
        const isMaxAddedSignatories = signatories.length === MAX_SIGNATORIES;

        return (
          <Form>
            <Subtitle
              title="Signing transactions"
              helpMessage={
                <>
                  Select the signing instructions applicable for banking transactions and services.
                  For detailed instructions please select Other.
                  <br />
                  <br />
                  Select &quot;Any of us sign&quot; option for Single signatory/Sole proprietor
                  <br />
                  <br />
                  Business Debit card will be issued only if the selected option is &quot;Any of us
                  can sign&quot;
                </>
              }
            />
            <Field
              name="accountSigningType"
              path="prospect.signatoryInfo[0].accountSigningInfo.accountSigningType"
              typeRadio
              datalistId="accountSignType"
              onSelect={e => {
                setFieldValue("accountSigningType", e.target.value);
                setFieldValue("accountSigningInstn", "");
                if (accountSigningInstn) {
                  updateProspect({ [pathSignatoryInfo]: "" });
                }
              }}
              component={CheckboxGroup}
              classes={{ root: classes.radioButtonRoot }}
              textArea={
                accountSigningType === ACCOUNTS_SIGNING_NAME_OTHER && (
                  <div className={classes.textAreaWrap}>
                    <Field
                      name="accountSigningInstn"
                      path={pathSignatoryInfo}
                      placeholder="Please specify (Maximum 50 characters)"
                      classes={{ formControlRoot: classes.formControl }}
                      multiline
                      rows={2}
                      component={Input}
                      InputProps={{
                        inputProps: { maxLength: 50, tabIndex: 0 }
                      }}
                    />
                  </div>
                )
              }
            />
            <Divider />
            <ConfirmingTransactions />

            <FieldArray name="signatories">
              {arrayHelpers => (
                <>
                  {signatories.map((data, index) => {
                    // eslint-disable-next-line max-len
                    const prospectPath = `prospect.organizationInfo.contactDetailsForTxnReconfirming[${index}]`;

                    return (
                      <Grid
                        containerkey={index}
                        item
                        sm={isMaxAddedSignatories ? 11 : 12}
                        key={index}
                        className={classes.confirmingTransaction}
                      >
                        <Field
                          name={`signatories[${index}].TxnReconfirmingfullname`}
                          path={`${prospectPath}.TxnReconfirmingfullname`}
                          label="Full Name"
                          placeholder="Full Name"
                          component={Input}
                          InputProps={{
                            inputProps: { tabIndex: 0 }
                          }}
                        />

                        <Grid container spacing={3}>
                          <Grid item md={6} sm={12}>
                            <InputGroup>
                              <Field
                                name={`signatories[${index}].primaryMobCountryCode`}
                                path={`${prospectPath}.primaryMobCountryCode`}
                                datalistId="countryCode"
                                component={CustomSelect}
                                shrink={false}
                                inputProps={{ tabIndex: 0 }}
                              />
                              <Field
                                name={`signatories[${index}].primaryMobileNo`}
                                path={`${prospectPath}.primaryMobileNo`}
                                label="Primary mobile no."
                                placeholder="55xxxxxxx"
                                component={Input}
                                type="number"
                                InputProps={{
                                  inputProps: { tabIndex: 0 }
                                }}
                              />
                            </InputGroup>
                          </Grid>

                          <Grid item md={6} sm={12}>
                            <InputGroup>
                              <Field
                                name={`signatories[${index}].primaryPhoneCountryCode`}
                                path={`${prospectPath}.primaryPhoneCountryCode`}
                                datalistId="countryCode"
                                component={CustomSelect}
                                shrink={false}
                                inputProps={{ tabIndex: 0 }}
                              />
                              <Field
                                name={`signatories[${index}].primaryPhoneNo`}
                                path={`${prospectPath}.primaryPhoneNo`}
                                label="Landline phone no. (optional)"
                                placeholder="42xxxxxx"
                                component={Input}
                                type="number"
                                InputProps={{
                                  inputProps: { tabIndex: 0 }
                                }}
                              />
                            </InputGroup>
                          </Grid>
                        </Grid>

                        {isMaxAddedSignatories && (
                          <ArrayRemoveButton
                            className={classes.deleteContact}
                            arrayHelpers={arrayHelpers}
                            dataArray={signatories}
                            itemIndex={index}
                            updateProspect={updateProspect}
                            prospectPath="prospect.organizationInfo.contactDetailsForTxnReconfirming"
                            title="Delete"
                          />
                        )}
                      </Grid>
                    );
                  })}

                  {signatories.length < MAX_SIGNATORIES && (
                    <AddButton
                      title="Add another person"
                      onClick={() => {
                        arrayHelpers.insert(signatories.length, {
                          primaryMobCountryCode: UAE_CODE,
                          primaryMobileNo: "",
                          primaryPhoneCountryCode: UAE_CODE,
                          primaryPhoneNo: "",
                          TxnReconfirmingfullname: ""
                        });
                      }}
                      className={classes.addButton}
                      disabled={!signatories[0].TxnReconfirmingfullname.length || signatoriesErrors}
                    />
                  )}
                </>
              )}
            </FieldArray>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
