import React, { useState, useCallback } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import { PHONE_REGEX, NAME_REGEX } from "../../../../utils/validation";
import { ACCOUNTS_SIGNING_NAME_OTHER } from "../../constants";
import { accountSigningTypes, countryCodeOptions } from "../../../../constants/options";
import Subtitle from "../../../../components/Subtitle";
import {
  Input,
  InputGroup,
  CustomSelect,
  CheckboxGroup,
  AutoSaveField as Field
} from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import Divider from "../../../../components/Divider";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { ConfirmingTransactions } from "./ConfirmingTransactions";
import { useStyles } from "./styled";

const MAX_SIGNATORIES = 2;
const signingPreferencesSchema = Yup.object({
  accountSigningType: Yup.string().required("Field is required"),
  accountSigningInstn: Yup.string().when("accountSigningType", {
    is: ACCOUNTS_SIGNING_NAME_OTHER,
    then: Yup.string()
      .max(120, "Max length is 120 symbols")
      .required("Field is required")
  }),
  signatories: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().matches(NAME_REGEX, "This is not a valid name"),
      primaryMobCountryCode: Yup.string(),
      primaryMobileNo: Yup.string()
        .matches(PHONE_REGEX, "This is not a valid phone")
        .when("fullName", {
          is: value => !!value,
          then: Yup.string().required("You need to provide mobile number")
        }),
      primaryPhoneCountryCode: Yup.string(),
      primaryPhoneNo: Yup.string().matches(PHONE_REGEX, "This is not a valid phone")
    })
  )
});

export const SigningPreferencesComponent = ({ organizationInfo, goToNext }) => {
  const classes = useStyles();
  const [countOfSignatories, setCountOfSignatories] = useState(
    Math.max((organizationInfo.contactDetailsForTxnReconfirming || []).length, 1)
  );
  const handleAddNewPerson = useCallback(() => {
    setCountOfSignatories(countOfSignatories + 1);
  }, [countOfSignatories]);

  return (
    <Formik
      initialValues={{
        accountSigningType: "",
        accountSigningInstn: "",
        signatories: [...new Array(MAX_SIGNATORIES)].map(() => ({
          fullName: "",
          primaryMobCountryCode: "",
          primaryMobileNo: "",
          primaryPhoneCountryCode: "",
          primaryPhoneNo: ""
        }))
      }}
      validationSchema={signingPreferencesSchema}
      onSubmit={goToNext}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="Signing transactions" helpMessage="help message todo" />
          <Field
            name="accountSigningType"
            options={accountSigningTypes}
            path="prospect.signatoryInfo[0].accountSigningInfo.accountSigningType"
            typeRadio
            onSelect={e => {
              setFieldValue("accountSigningType", e.currentTarget.value);
              setFieldValue("accountSigningInstn", "");
            }}
            component={CheckboxGroup}
          />
          {values.accountSigningType === ACCOUNTS_SIGNING_NAME_OTHER && (
            <div className={classes.textAreaWrap}>
              <Field
                name="accountSigningInstn"
                path="prospect.signatoryInfo[0].accountSigningInfo.accountSigningInstn"
                placeholder="Please specify (Max 120 characters)"
                maxLength={120}
                multiline
                rows={4}
                component={Input}
              />
            </div>
          )}
          <Divider />
          <ConfirmingTransactions />
          <FieldArray name="signatories">
            {arrayHelpers => (
              <>
                {[...Array(countOfSignatories).keys()].map(index => {
                  // eslint-disable-next-line max-len
                  const prefix = `prospect.organizationInfo.contactDetailsForTxnReconfirming[${index}]`;

                  return (
                    <React.Fragment key={index}>
                      <Field
                        name={`signatories.${index}.fullName`}
                        path={`prospect.signatoryInfo[${index}].fullName`}
                        label="Your Name"
                        placeholder="Your Name"
                        component={Input}
                      />

                      <Grid container spacing={3}>
                        <Grid item md={6} sm={12}>
                          <InputGroup>
                            <Field
                              name={`signatories.${index}.primaryMobCountryCode`}
                              path={`${prefix}.primaryMobCountryCode`}
                              options={countryCodeOptions}
                              component={CustomSelect}
                              shrink={false}
                            />
                            <Field
                              name={`signatories.${index}.primaryMobileNo`}
                              path={`${prefix}.primaryMobileNo`}
                              label="Primary mobile no."
                              placeholder="Primary mobile no."
                              component={Input}
                            />
                          </InputGroup>
                        </Grid>

                        <Grid item md={6} sm={12}>
                          <InputGroup>
                            <Field
                              name={`signatories.${index}.primaryPhoneCountryCode`}
                              path={`${prefix}.primaryPhoneNo`}
                              options={countryCodeOptions}
                              component={CustomSelect}
                              shrink={false}
                            />
                            <Field
                              name={`signatories.${index}.primaryPhoneNo`}
                              path={`${prefix}.primaryPhoneCountryCode`}
                              label="Landline phone no. (optional)"
                              placeholder="Landline phone no. (optional)"
                              component={Input}
                            />
                          </InputGroup>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                })}

                {countOfSignatories < MAX_SIGNATORIES && (
                  <AddButton
                    title="Add another person"
                    onClick={handleAddNewPerson}
                    className={classes.addButton}
                  />
                )}
              </>
            )}
          </FieldArray>
          <div className={classes.buttonWrapper}>
            <ContinueButton type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};
