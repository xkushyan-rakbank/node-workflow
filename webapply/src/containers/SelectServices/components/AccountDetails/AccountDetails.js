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
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";
import { accountCurrencies, emirates, branches } from "../../../../constants/options";

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
      onSubmit={goToNext}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="Select currencies" />
          <Field
            options={accountCurrencies}
            name="accountCurrencies"
            path="prospect.accountInfo[0].accountCurrencies"
            infoTitle={INFO_TITLE}
            component={CheckboxGroup}
          />
          <Divider />
          <Subtitle title="Select branch" />
          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <Field
                name="branchCity"
                path="prospect.organizationInfo.branchCity"
                options={emirates}
                label="Emirate / City"
                placeholder="Emirate / City"
                component={CustomSelect}
                onChange={e => {
                  setFieldValue("branchCity", e.target.value);
                  setFieldValue("branchID", "");
                }}
                shrink={false}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Field
                name="branchID"
                path="prospect.organizationInfo.branchID"
                options={branches.filter(item => item.emirateCode === values.branchCity)}
                label="Branch"
                placeholder="Branch"
                disabled={!values.branchCity}
                component={CustomSelect}
                shrink={false}
              />
            </Grid>
          </Grid>
          {!islamicBanking && (
            <>
              <Divider />
              <Subtitle title="Select interest" />
              <Field
                name="receiveInterest"
                path="prospect.accountInfo[0].receiveInterest"
                label="I don't wish to receive interest from my account"
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
