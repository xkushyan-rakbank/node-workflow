import React from "react";
import isEmpty from "lodash/isEmpty";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getOptionsForSubId } from "../../../../utils/getInputSubOptions";

import { CheckboxGroup } from "../../../../components/Form";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import PureSelect from "../../../../components/InputField/PureSelect";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper/FormWrapper";
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";
import ContinueButton from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";
import { INPUT_ID_INDEX, INPUT_ID_INDEXES } from "../../constants";
import { accountCurrencies } from "../../../../constants/options";

const AccountDetailsSchema = Yup.object({
  accountCurrencies: Yup.array().required("Field is required")
});

const INFO_TITLE =
  "You will get a separate account number for each currency you select. Note that currencies other than AED are subject to internal approval.";

export const AccountDetailsComponent = ({
  islamicBanking,
  branchCityValue,
  branchCityConfig,
  goToNext
}) => {
  const subOptions = getOptionsForSubId(branchCityValue, branchCityConfig, true);
  const classes = useStyles();

  const onSubmit = values => {
    // TODO continue
    // console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{ accountCurrencies: [] }}
        validationSchema={AccountDetailsSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors }) => (
          <Form>
            <Subtitle title="Select currencies" />
            <CheckboxGroup
              options={accountCurrencies}
              id="accountCurrencies"
              name="accountCurrencies"
              errors={errors.accountCurrencies}
              value={values.accountCurrencies}
              title={INFO_TITLE}
            />

            <Divider />

            <Subtitle title="Select branch" />

            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>

      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        {/* TODO continue migrate to formik */}
        <Subtitle title="Select branch" />
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <PureSelect id="Org.branchCity" indexes={INPUT_ID_INDEXES} />
          </Grid>
          <Grid item md={6} sm={12}>
            <PureSelect
              id="Org.subCategory"
              indexes={INPUT_ID_INDEXES}
              subOptions={subOptions}
              disabled={isEmpty(branchCityValue)}
            />
          </Grid>
        </Grid>

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
