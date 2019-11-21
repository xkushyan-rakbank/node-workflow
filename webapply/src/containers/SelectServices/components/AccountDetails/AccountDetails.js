import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { CheckboxGroup, CustomSelect } from "../../../../components/Form";
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";
import { accountCurrencies, emirates, emiratesCities } from "../../../../constants/options";

const INFO_TITLE =
  "You will get a separate account number for each currency you select. Note that currencies other than AED are subject to internal approval.";

const getEmirateCities = branchCityKey => {
  if (!branchCityKey) {
    return [];
  }
  const emirateData = emiratesCities.find(emirate => emirate.emirateCode === branchCityKey);
  return emirateData.cities;
};

const AccountDetailsSchema = Yup.object({
  accountCurrencies: Yup.array().required("Field is required"),
  branchCity: Yup.string().required("Field is required"),
  subCategory: Yup.string().required("Field is required")
});

export const AccountDetailsComponent = ({ goToNext, applicationInfo: { islamicBanking } }) => {
  const classes = useStyles();
  const onSubmit = values => {
    // TODO continue update store values
    // console.log(values);
    // goToNext()
  };

  return (
    <>
      <Formik
        initialValues={{
          accountCurrencies: [],
          branchCity: "",
          subCategory: "",
          receiveInterest: false
        }}
        validationSchema={AccountDetailsSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Subtitle title="Select currencies" />
              <Field
                options={accountCurrencies}
                name="accountCurrencies"
                infoTitle={INFO_TITLE}
                component={CheckboxGroup}
              />

              <Divider />

              <Subtitle title="Select branch" />
              <Grid container spacing={3}>
                <Grid item md={6} sm={12}>
                  {/* TODO fix bug placeholder shrink prop*/}
                  <Field
                    name="branchCity"
                    options={emirates}
                    extractId={option => option.key}
                    label="Emirate / City"
                    placeholder="Emirate / City"
                    onChange={e => {
                      setFieldValue("branchCity", e.target.value);
                      setFieldValue("subCategory", "");
                    }}
                    component={CustomSelect}
                    shrink={true}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  {/* TODO fix bug placeholder shrink prop */}
                  <Field
                    name="subCategory"
                    options={getEmirateCities(values["branchCity"])}
                    label="Branch"
                    placeholder="Branch"
                    extractId={option => option.key}
                    component={CustomSelect}
                    shrink={true}
                  />
                </Grid>
              </Grid>

              {!islamicBanking && (
                <>
                  <Divider />
                  <Subtitle title="Select interest" />
                  {/* TODO use Checkbox component after Oleg merge in dev */}
                  <Field
                    name="receiveInterest"
                    options={[
                      {
                        code: "receiveInterest",
                        displayText: "I don't wish to receive interest from my account",
                        key: "receiveInterest",
                        value: true
                      }
                    ]}
                    infoTitle={INFO_TITLE}
                    component={CheckboxGroup}
                  />
                </>
              )}

              <div className={classes.buttonWrapper}>
                <ContinueButton type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
