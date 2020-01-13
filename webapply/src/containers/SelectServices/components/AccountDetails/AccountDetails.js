import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  AutoSaveField as Field,
  CheckboxGroup,
  CustomSelect,
  Checkbox
} from "../../../../components/Form";
import { Subtitle } from "../../../../components/Subtitle";
import { Divider } from "../Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { ALLOWED_CURRENCY } from "../../constants";

import { useStyles } from "./styled";

const INFO_TITLE =
  "You will get a separate account number for each currency you select. Note that currencies other than AED are subject to internal approval.";

const accountDetailsSchema = Yup.object({
  accountCurrencies: Yup.array().required("Field is required"),
  branchCity: Yup.string().required("Field is required"),
  branchID: Yup.string().required("Field is required"),
  receiveInterest: Yup.bool()
});

export const AccountDetailsComponent = ({ goToNext, applicationInfo: { islamicBanking } }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        accountCurrencies: [],
        branchCity: "",
        branchID: "",
        receiveInterest: false
      }}
      validationSchema={accountDetailsSchema}
      validateOnChange={false}
      onSubmit={goToNext}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="Select currencies" />
          <Field
            name="accountCurrencies"
            datalistId="accountCurrencies"
            path="prospect.accountInfo[0].accountCurrencies"
            infoTitle={INFO_TITLE}
            component={CheckboxGroup}
            filterOptions={options =>
              options.filter(currency => ALLOWED_CURRENCY.includes(currency.code))
            }
            classes={{ root: classes.radioButtonRoot }}
            contextualHelpProps={{ isDisableHoverListener: false }}
            contextualHelpText="Cheque book, Debit card and Rakvalue will be issued for eligible AED accounts only"
          />
          <Divider />
          <Subtitle title="Select branch" classes={{ wrapper: classes.subtitleBranch }} />
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                name="branchCity"
                datalistId="branchCity"
                path="prospect.organizationInfo.branchCity"
                label="Emirate / City"
                component={CustomSelect}
                onChange={e => {
                  setFieldValue("branchCity", e.target.value);
                  setFieldValue("branchID", "");
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="branchID"
                datalistId="branchCity"
                path="prospect.organizationInfo.branchID"
                filterOptions={options =>
                  options
                    .filter(city => city.code === values.branchCity)
                    .reduce((acc, curr) => (curr.subGroup ? [...acc, ...curr.subGroup] : acc), [])
                }
                label="Branch"
                placeholder="Branch"
                disabled={!values.branchCity}
                component={CustomSelect}
              />
            </Grid>
          </Grid>
          {!islamicBanking && (
            <>
              <Divider />
              <Subtitle title="Select interest" classes={{ wrapper: classes.subtitleInterest }} />
              <Field
                name="receiveInterest"
                path="prospect.accountInfo[0].receiveInterest"
                label="I don't wish to receive interest from my account"
                classes={{ formControlRoot: classes.formControl }}
                component={Checkbox}
              />
            </>
          )}
          <div className={classes.buttonWrapper}>
            <ContinueButton type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};
