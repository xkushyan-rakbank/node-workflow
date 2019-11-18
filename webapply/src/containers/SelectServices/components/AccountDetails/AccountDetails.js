import React from "react";
import isEmpty from "lodash/isEmpty";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { getOptionsForSubId } from "../../../../utils/getInputSubOptions";

import CheckboxGroup from "../../../../components/InputField/CheckboxGroup";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import PureSelect from "../../../../components/InputField/PureSelect";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper/FormWrapper";
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";
import ContinueButton from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";
import { INPUT_ID_INDEX, INPUT_ID_INDEXES } from "../../constants";

const AccountDetailsSchema = Yup.object({
  accountCurrencies: Yup.array().required("At least one checkbox is required") // TODO change text
});

export const AccountDetailsComponent = props => {
  const { islamicBanking, branchCityValue, branchCityConfig, goToNext } = props;
  const subOptions = getOptionsForSubId(branchCityValue, branchCityConfig, true);
  const classes = useStyles();

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          // TODO refactor
          checkboxGroup: [],
          singleCheckbox: false
        }}
        validationSchema={AccountDetailsSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Field
              name="accountCurrencies"
              // TODO remove hardcoded options
              options={[
                {
                  code: "AED",
                  displayText: "AED",
                  key: "AED",
                  value: "AED"
                },
                {
                  code: "USD",
                  displayText: "USD",
                  key: "USD",
                  value: "USD"
                },
                {
                  code: "EUR",
                  displayText: "EUR",
                  key: "EUR",
                  value: "EUR"
                },
                {
                  code: "GBP",
                  displayText: "GBP",
                  key: "GBP",
                  value: "GBP"
                }
              ]}
              component={CheckboxGroup}
            />

            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>

      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        <Subtitle title="Select currencies" />
        <CheckboxGroup id="Acnt.accountCurrencies" indexes={INPUT_ID_INDEX} />

        <Divider />

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
