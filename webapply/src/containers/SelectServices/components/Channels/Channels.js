import React from "react";
import { Formik, Form } from "formik";
import get from "lodash/get";
import { Divider, Grid } from "@material-ui/core";

import { getStatusDebitCardApplied, getStatusChequeBookApplied } from "./utils";
import { Checkbox, AutoSaveField as Field } from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import Subtitle from "../../../../components/Subtitle";
import { SignatoriesList } from "./SignatoriesList";

export const ChannelsComponent = ({ stakeholders, goToNext, ...props }) => {
  const { isDisabledDebitCard } = getStatusDebitCardApplied(props);
  const { isDisabledChequeBook } = getStatusChequeBookApplied(props);

  const isHasSignatories = stakeholders.some(stakeholder =>
    get(stakeholder, "kycDetails.isSignatory")
  );

  return (
    <Formik
      initialValues={{
        debitCardApplied: "",
        chequeBookApplied: "",
        eStatements: false,
        mailStatements: false
      }}
      onSubmit={goToNext}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="Debit Cards" />

          <Field
            name="debitCardApplied"
            path=" prospect.accountInfo[0].debitCardApplied"
            label="I want debit cards for all the company signatories"
            component={Checkbox}
            disabled={isDisabledDebitCard}
          />

          {isHasSignatories && <SignatoriesList stakeholders={stakeholders} />}

          <Divider />

          <Subtitle title="Cheque book" />

          <Field
            name="chequeBookApplied"
            path=" prospect.accountInfo[0].chequeBookApplied"
            label="I want debit cards for all the company signatories"
            component={Checkbox}
            disabled={isDisabledChequeBook}
          />

          <Divider />

          <Subtitle title="Bank statements" />

          <Field
            name="eStatements"
            path="prospect.accountInfo[0].eStatements"
            label="I want online bank statements"
            component={Checkbox}
            useRadioIcon
            onChange={e => {
              setFieldValue("mailStatements", false);
              setFieldValue("eStatements", true);
            }}
          />

          <Field
            name="mailStatements"
            path="prospect.accountInfo[0].mailStatements"
            label="I want paper statements (monthly charges apply)"
            component={Checkbox}
            useRadioIcon
            onChange={e => {
              setFieldValue("eStatements", false);
              setFieldValue("mailStatements", true);
            }}
          />

          <Grid container direction="row" justify="space-between" style={{ padding: 20 }}>
            <Grid item xs={9}>
              <InfoTitle title="These will be mailed by courier to your preferred address" />
            </Grid>
            <Grid item xs={3}>
              <ContinueButton type="submit" />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
