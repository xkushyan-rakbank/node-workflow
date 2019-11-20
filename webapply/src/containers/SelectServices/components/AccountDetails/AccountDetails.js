import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { CheckboxGroup, CustomSelect } from "../../../../components/Form";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper/FormWrapper";
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";
import ContinueButton from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";
import { INPUT_ID_INDEX } from "../../constants";
import { accountCurrencies, emiratesCities } from "../../../../constants/options";

const INFO_TITLE =
  "You will get a separate account number for each currency you select. Note that currencies other than AED are subject to internal approval.";
const getSubCategory = branchCityKey => {
  if (!branchCityKey) {
    return [];
  }
  const emirate = emiratesCities.find(emirate => emirate.code === branchCityKey);
  return emirate.subCategory;
};

const AccountDetailsSchema = Yup.object({
  accountCurrencies: Yup.array().required("Field is required"),
  branchCity: Yup.string().required("Field is required"),
  subCategory: Yup.string().required("Field is required")
});

export const AccountDetailsComponent = ({
  islamicBanking,
  branchCityValue,
  branchCityConfig,
  goToNext
}) => {
  const classes = useStyles();

  const onSubmit = values => {
    // TODO continue
    // console.log(values);
  };

  const [branchCity, setBranchCity] = useState("");

  let setFieldValue;
  const clearValueBranch = (value, cb) => {
    setBranchCity(value);
    setFieldValue = cb;
  };

  useEffect(() => {
    setFieldValue("subCategory", "");
  }, [branchCity, setFieldValue]);

  return (
    <>
      <Formik
        initialValues={{
          accountCurrencies: [],
          branchCity: "",
          subCategory: ""
        }}
        validationSchema={AccountDetailsSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          clearValueBranch(values.branchCity, setFieldValue);
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
                  {/* TODO fix placeholder shrink prop*/}
                  <Field
                    name="branchCity"
                    options={emiratesCities}
                    extractId={option => option.key}
                    label="Emirate / City"
                    placeholder="Emirate / City"
                    component={CustomSelect}
                    shrink={true}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  {/* TODO fix placeholder shrink prop*/}
                  <Field
                    name="subCategory"
                    options={getSubCategory(values["branchCity"])}
                    label="Branch"
                    placeholder="Branch"
                    extractId={option => option.key}
                    component={CustomSelect}
                    shrink={true}
                  />
                </Grid>
              </Grid>

              <div className={classes.buttonWrapper}>
                <ContinueButton type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>

      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        {/* TODO continue migrate to formik */}
        {!islamicBanking && (
          <>
            <Divider />
            <Subtitle title="Select interest" />
            <Checkbox id="Acnt.receiveInterest" indexes={INPUT_ID_INDEX} />
          </>
        )}
      </FormWrapper>
    </>
  );
};
