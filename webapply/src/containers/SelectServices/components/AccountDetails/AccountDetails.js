import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  AutoSaveField as Field,
  CheckboxGroup,
  SelectAutocomplete,
  Checkbox
} from "../../../../components/Form";
import { INITIAL_INDEX } from "../../constants";
import { Subtitle } from "../../../../components/Subtitle";
import { Divider } from "../Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { DATA_CURRENCIES } from "../../constants";
import {
  getRequiredMessage,
  getRequiredNotTextInputMessage
} from "../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const INFO_TITLE =
  "You will get a separate account number for each currency you select. Note that only AED accounts are eligible for business debit card, cheque book and RAKvalue package";

const accountDetailsSchema = Yup.object({
  accountCurrencies: Yup.array().required(getRequiredNotTextInputMessage("Currencies")),
  branchCity: Yup.string().required(getRequiredMessage("Emirate / City")),
  branchID: Yup.string().required(getRequiredMessage("Branch")),
  receiveInterest: Yup.bool()
});

export const AccountDetailsComponent = ({ goToNext, islamicBanking, updateProspect }) => {
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
            path={`prospect.accountInfo[${INITIAL_INDEX}].accountCurrencies`}
            infoTitle={INFO_TITLE}
            component={CheckboxGroup}
            options={DATA_CURRENCIES}
            classes={{ root: classes.radioButtonRoot }}
            contextualHelpProps={{ isDisableHoverListener: false }}
            contextualHelpText="Cheque book, Debit card and Rakvalue will be issued for eligible AED accounts only"
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
          />
          <Divider />
          <Subtitle title="Select branch" classes={{ wrapper: classes.subtitleBranch }} />
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Field
                name="branchCity"
                datalistId="branchCity"
                path="prospect.organizationInfo.branchCity"
                label="Emirate / City"
                isSearchable
                component={SelectAutocomplete}
                onChange={id => {
                  setFieldValue("branchCity", id);
                  setFieldValue("branchID", "");
                }}
                tabIndex="0"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                name="branchID"
                datalistId="branchCity"
                path="prospect.organizationInfo.branchID"
                filterOptions={options =>
                  options
                    .filter(city => city.code === values.branchCity)
                    .reduce((acc, curr) => (curr.subGroup ? [...acc, ...curr.subGroup] : acc), [])
                }
                onChange={id => {
                  setFieldValue("branchID", id);
                  updateProspect({ [`prospect.accountInfo[${INITIAL_INDEX}].branchId`]: id });
                  updateProspect({ "prospect.organizationInfo.branchID": id });
                }}
                label="Branch"
                placeholder="Branch"
                disabled={!values.branchCity}
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
          </Grid>
          {!islamicBanking && (
            <>
              <Divider />
              <Subtitle title="Select interest" classes={{ wrapper: classes.subtitleInterest }} />
              <Field
                name="receiveInterest"
                path={`prospect.accountInfo[${INITIAL_INDEX}].receiveInterest`}
                label="I don't wish to receive interest from my account"
                classes={{ formControlRoot: classes.formControl }}
                component={Checkbox}
                inputProps={{ tabIndex: 0 }}
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
