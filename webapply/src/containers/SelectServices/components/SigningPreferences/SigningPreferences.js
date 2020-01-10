import React from "react";
import get from "lodash/get";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import {
  PHONE_REGEX,
  NAME_REGEX,
  UAE_MOBILE_PHONE_REGEX,
  UAE_LANDLINE_PHONE_REGEX
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
  accountSigningType: Yup.string().required("Field is required"),
  accountSigningInstn: Yup.string().when("accountSigningType", {
    is: selectedAccountType => selectedAccountType === ACCOUNTS_SIGNING_NAME_OTHER,
    then: Yup.string()
      .max(120, "Max length is 120 symbols")
      .required("Field is required")
  }),
  signatories: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().matches(NAME_REGEX, "This is not a valid name"),
      primaryMobCountryCode: Yup.string(),
      primaryMobileNo: Yup.string().when("fullName", {
        is: value => !!value,
        then: Yup.string()
          .required("You need to provide mobile number")
          .when("primaryMobCountryCode", {
            is: primaryMobCountryCode => primaryMobCountryCode === UAE_CODE,
            then: Yup.string().matches(UAE_MOBILE_PHONE_REGEX, "This is not a valid phone"),
            otherwise: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
          })
      }),
      primaryPhoneCountryCode: Yup.string(),
      primaryPhoneNo: Yup.string().when("primaryPhoneCountryCode", {
        is: primaryPhoneCountryCode => primaryPhoneCountryCode === UAE_CODE,
        then: Yup.string().matches(UAE_LANDLINE_PHONE_REGEX, "This is not a valid phone"),
        otherwise: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
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
            fullName: "",
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
      {({ values, setFieldValue, errors }) => {
        const signatoriesErrors = Object.keys(get(errors, "signatories", [])).length;
        const { accountSigningInstn, accountSigningType, signatories } = values;

        return (
          <Form>
            <Subtitle title="Signing transactions" helpMessage="help message todo" />
            <Field
              name="accountSigningType"
              path="prospect.signatoryInfo[0].accountSigningInfo.accountSigningType"
              typeRadio
              datalistId="accountSignType"
              onSelect={e => {
                setFieldValue("accountSigningType", e.currentTarget.value);
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
                      placeholder="Please specify (Max 120 characters)"
                      classes={{ formControlRoot: classes.formControl }}
                      maxLength={120}
                      multiline
                      rows={2}
                      component={Input}
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
                    const prospectPath = `prospect.organizationInfo.contactDetailsForTxnReconfirming.[${index}]`;

                    return (
                      <React.Fragment key={index}>
                        <div className={classes.confirmingTransaction}>
                          <Field
                            // TODO find out correct path also update validation schema !!
                            name={`signatories[${index}].fullName`}
                            path={`prospect.signatoryInfo[${index}].fullName`}
                            label="Your Name"
                            placeholder="Your Name"
                            component={Input}
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
                                />
                                <Field
                                  name={`signatories[${index}].primaryMobileNo`}
                                  path={`${prospectPath}.primaryMobileNo`}
                                  label="Primary mobile no."
                                  placeholder="55xxxxxxx"
                                  component={Input}
                                  type="number"
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
                                />
                                <Field
                                  name={`signatories[${index}].primaryPhoneNo`}
                                  path={`${prospectPath}.primaryPhoneNo`}
                                  label="Landline phone no. (optional)"
                                  placeholder="42xxxxxx"
                                  component={Input}
                                  type="number"
                                />
                              </InputGroup>

                              {!!index && (
                                <ArrayRemoveButton
                                  arrayHelpers={arrayHelpers}
                                  dataArray={values.signatories}
                                  itemIndex={index}
                                  updateProspect={updateProspect}
                                  prospectPath="prospect.organizationInfo.contactDetailsForTxnReconfirming"
                                  title="Delete"
                                />
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      </React.Fragment>
                    );
                  })}

                  {signatories.length < MAX_SIGNATORIES && (
                    <AddButton
                      title="Add another person"
                      onClick={() => {
                        arrayHelpers.insert(signatories.length, {
                          fullName: "",
                          primaryMobCountryCode: UAE_CODE,
                          primaryMobileNo: "",
                          primaryPhoneCountryCode: UAE_CODE,
                          primaryPhoneNo: ""
                        });
                      }}
                      className={classes.addButton}
                      disabled={!signatories[0].fullName.length || signatoriesErrors}
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
