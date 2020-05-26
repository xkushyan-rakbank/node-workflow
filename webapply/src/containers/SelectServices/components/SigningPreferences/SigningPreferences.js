import React from "react";
import get from "lodash/get";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import { NAME_REGEX, SPECIAL_CHARACTERS_REGEX } from "../../../../utils/validation";
import { SIGNING_TRANSACTIONS_TYPE } from "../../../../constants";
import { UAE_CODE } from "../../../../constants";
import { Subtitle } from "../../../../components/Subtitle";
import {
  Input,
  InputGroup,
  CustomSelect,
  CheckboxGroup,
  AutoSaveField as Field,
  LinkedField
} from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { Divider } from "../Divider";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { ConfirmingTransactions } from "./ConfirmingTransactions";
import { ArrayRemoveButton } from "../../../FinalQuestions/components/Buttons/ArrayRemoveButton";

import { useStyles } from "./styled";
import {
  getRequiredMessage,
  getRequiredNotTextInputMessage,
  getInvalidMessage
} from "../../../../utils/getValidationMessage";

const MAX_SIGNATORIES = 2;
const MAX_ACCOUNT_SIGNING_INSTN_LENGTH = 50;
const MAX_RECONFIRMING_FULL_NAME_LENGTH = 79;

const getSigningPreferencesSchema = () =>
  Yup.object({
    accountSigningType: Yup.string()
      .required(getRequiredNotTextInputMessage("Signing transactions"))
      .min(2, "Field is required"),
    accountSigningInstn: Yup.string().when("accountSigningType", {
      is: selectedAccountType => selectedAccountType === SIGNING_TRANSACTIONS_TYPE.OTHER,
      then: Yup.string()
        .max(
          MAX_ACCOUNT_SIGNING_INSTN_LENGTH,
          `Max length is ${MAX_ACCOUNT_SIGNING_INSTN_LENGTH} symbols`
        )
        .required(getRequiredMessage("Others"))
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Others"))
    }),
    signatories: Yup.array().of(
      Yup.object().shape({
        TxnReconfirmingfullname: Yup.string()
          .required(getRequiredMessage("Full name"))
          // eslint-disable-next-line no-template-curly-in-string
          .max(MAX_RECONFIRMING_FULL_NAME_LENGTH, "Maximum ${max} characters allowed")
          .matches(NAME_REGEX, getInvalidMessage("Full name")),
        primaryMobCountryCode: Yup.string().required(getRequiredMessage("County code")),
        primaryMobileNo: Yup.string().when("TxnReconfirmingfullname", {
          is: value => !!value,
          then: Yup.string()
            .required(getRequiredMessage("Primary mobile number"))
            .phoneNo({
              fieldName: "Primary mobile number",
              codeFieldName: "primaryMobCountryCode"
            })
        }),
        primaryPhoneCountryCode: Yup.string(),
        primaryPhoneNo: Yup.string().phoneNo({
          fieldName: "Landline number",
          codeFieldName: "primaryPhoneCountryCode",
          isLandline: true
        })
      })
    )
  });
// eslint-disable-next-line max-len
const pathSignatoryInfo = "prospect.signatoryInfo[0].accountSigningInfo.accountSigningInstn";

export const SigningPreferencesComponent = ({
  goToNext,
  createFormChangeHandler,
  updateProspect,
  organizationInfo
}) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        accountSigningType: "",
        accountSigningInstn: "",
        signatories: organizationInfo.contactDetailsForTxnReconfirming || []
      }}
      validationSchema={getSigningPreferencesSchema}
      validateOnChange={false}
      onSubmit={goToNext}
    >
      {createFormChangeHandler(
        ({
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
                    Select the signing instructions applicable for banking transactions and
                    services. For detailed instructions please select Other.
                    <br />
                    <br />
                    Select &quot;Any of us sign&quot; option for Single signatory/Sole proprietor
                    <br />
                    <br />
                    Business Debit card will be issued only if the selected option is &quot;Any of
                    us can sign&quot;
                  </>
                }
              />
              <Field
                name="accountSigningType"
                path={
                  // eslint-disable-next-line max-len
                  "prospect.signatoryInfo[0].accountSigningInfo.accountSigningType"
                }
                typeRadio
                datalistId="accountSignType"
                onSelect={e => {
                  setFieldValue("accountSigningType", e.target.value);
                  setFieldValue("accountSigningInstn", "");
                }}
                changeProspect={prospect => {
                  if (accountSigningInstn) {
                    return { ...prospect, [pathSignatoryInfo]: "" };
                  }
                  return prospect;
                }}
                component={CheckboxGroup}
                classes={{ root: classes.radioButtonRoot }}
                textArea={
                  accountSigningType === SIGNING_TRANSACTIONS_TYPE.OTHER && (
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
                          inputProps: { maxLength: MAX_ACCOUNT_SIGNING_INSTN_LENGTH, tabIndex: 0 }
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
                    {signatories.map((_, index) => {
                      // eslint-disable-next-line max-len
                      const prospectPath = `prospect.organizationInfo.contactDetailsForTxnReconfirming[${index}]`;

                      return (
                        <Grid
                          containerkey={index}
                          item
                          // xs={isMaxAddedSignatories ? 11 : 12}
                          sm={11}
                          xs={12}
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
                              inputProps: {
                                maxLength: MAX_RECONFIRMING_FULL_NAME_LENGTH,
                                tabIndex: 0
                              }
                            }}
                          />

                          <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                              <InputGroup>
                                <LinkedField
                                  name={`signatories[${index}].primaryMobCountryCode`}
                                  linkedFieldName={`signatories[${index}].primaryMobileNo`}
                                  path={`${prospectPath}.primaryMobCountryCode`}
                                  linkedPath={`${prospectPath}.primaryMobileNo`}
                                  datalistId="countryCode"
                                  component={CustomSelect}
                                  shrink={false}
                                  inputProps={{ tabIndex: 0 }}
                                />
                                <LinkedField
                                  name={`signatories[${index}].primaryMobileNo`}
                                  linkedFieldName={`signatories[${index}].primaryMobCountryCode`}
                                  path={`${prospectPath}.primaryMobileNo`}
                                  linkedPath={`${prospectPath}.primaryMobCountryCode`}
                                  label="Primary mobile number"
                                  placeholder="55xxxxxxx"
                                  component={Input}
                                  InputProps={{
                                    inputProps: { tabIndex: 0 }
                                  }}
                                />
                              </InputGroup>
                            </Grid>

                            <Grid item sm={6} xs={12}>
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
                                  label="Landline number (optional)"
                                  placeholder="42xxxxxx"
                                  component={Input}
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
                        disabled={
                          !get(signatories[0], "TxnReconfirmingfullname") || signatoriesErrors
                        }
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
        }
      )}
    </Formik>
  );
};
