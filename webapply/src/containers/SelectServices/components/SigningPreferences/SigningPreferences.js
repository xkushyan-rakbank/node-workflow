import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { prospect } from "../../../../constants/config";
import { ACCOUNTS_SIGNING_NAME_OTHER } from "../../constants";
import { accountSigningTypes, countryCodeOptions } from "../../../../constants/options";

import Divider from "../../../../components/Divider";
import Subtitle from "../../../../components/Subtitle";
import { TextArea } from "../../../../components/Form/TextArea/TextArea";
import { AddButton } from "../../../../components/Buttons/AddButton";
import { CustomSelect } from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { Input, InputGroup } from "./../../../../components/Form";
import { RadioGroupWrapper } from "../../../../components/Form/Radio/RadioGroupButtons";
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
  })
  // signatoryInfo: Yup.array().of(
  //   Yup.object().shape({
  //     fullName: Yup.number().required("Required")
  //   })
  // )
});

export const SigningPreferencesComponent = ({
  signatoryInfo,
  accountSigningType,
  accountSigningInstn,
  goToNext
}) => {
  const classes = useStyles();
  const onSubmit = e => {
    // TODO
    // console.log(e)
    goToNext();
  };

  const getNameField = (name, index) => `signatoryInfo[${index}].contactDetails.${name}`;

  return (
    <>
      <Formik
        initialValues={{
          accountSigningType: "",
          accountSigningInstn: "",
          signatoryInfo: prospect.signatoryInfo
        }}
        validationSchema={signingPreferencesSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Subtitle title="Signing transactions" helpMessage="help message todo" />
            <Field
              name="accountSigningType"
              options={accountSigningTypes}
              onChange={e => {
                setFieldValue("accountSigningType", e.currentTarget.value);
                setFieldValue("accountSigningInstn", "");
              }}
              component={RadioGroupWrapper}
            >
              {values.accountSigningType === ACCOUNTS_SIGNING_NAME_OTHER && (
                <Field
                  name="accountSigningInstn"
                  placeholder="Please specify (Max 120 characters)"
                  component={TextArea}
                />
              )}
            </Field>

            <Divider />

            <ConfirmingTransactions />
            <FieldArray name="signatoryInfo">
              {arrayHelpers => (
                <>
                  {values.signatoryInfo.map((signatory, index) => (
                    <React.Fragment key={index}>
                      <Field
                        name={`signatoryInfo[${index}].fullName`}
                        label="Your Name"
                        placeholder="Your Name"
                        component={Input}
                      />

                      <Grid container spacing={3}>
                        <Grid item md={6} sm={12}>
                          <InputGroup>
                            <Field
                              name={getNameField("primaryMobCountryCode", index)}
                              required
                              options={countryCodeOptions}
                              component={CustomSelect}
                              shrink={false}
                            />
                            <Field
                              name={getNameField("primaryMobileNo", index)}
                              label="Primary mobile no."
                              placeholder="Primary mobile no."
                              component={Input}
                            />
                          </InputGroup>
                        </Grid>

                        <Grid item md={6} sm={12}>
                          <InputGroup>
                            <Field
                              name={getNameField("primaryPhoneCountryCode", index)}
                              options={countryCodeOptions}
                              component={CustomSelect}
                              shrink={false}
                            />
                            <Field
                              name={getNameField("primaryPhoneNo", index)}
                              label="Landline phone no. (optional)"
                              placeholder="Landline phone no. (optional)"
                              component={Input}
                            />
                          </InputGroup>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ))}

                  <AddButton
                    title="Add another person"
                    onClick={() =>
                      arrayHelpers.insert(prospect.signatoryInfo.length, {
                        ...prospect.signatoryInfo
                      })
                    }
                    className={classes.addButton}
                    disabled={values.signatoryInfo.length === MAX_SIGNATORIES}
                  />
                </>
              )}
            </FieldArray>

            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
