import React from "react";
import { Formik, Form } from "formik";
import get from "lodash/get";

import { Divider } from "@material-ui/core";
import { SignatoriesList } from "./SignatoriesList";
import Subtitle from "../../../../components/Subtitle";
import { Checkbox, AutoSaveField as Field } from "../../../../components/Form";
// import { getStatusDebitCardApplied, getStatusChequeBookApplied } from "./utils";

export const ChannelsComponent = ({ stakeholders }) => {
  // const { isDisabledDebitCard } = getStatusDebitCardApplied(props);
  // const { isDisabledChequeBook } = getStatusChequeBookApplied(props);

  const isHasSignatories = stakeholders.some(stakeholder =>
    get(stakeholder, "kycDetails.isSignatory")
  );
  return (
    <Formik
      initialValues={{
        debitCardApplied: ""
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="Debit Cards" />

          <Field
            name="debitCardApplied"
            path=" prospect.accountInfo[0].debitCardApplied"
            label="I want debit cards for all the company signatories"
            component={Checkbox}
            disabled={true}
          />

          {isHasSignatories && <SignatoriesList stakeholders={stakeholders} />}

          <Divider />

          <Subtitle title="Cheque book" />

          <Field
            name="chequeBookApplied"
            path=" prospect.accountInfo[0].chequeBookApplied"
            label="I want debit cards for all the company signatories"
            component={Checkbox}
            disabled={true}
          />

          <Divider />

          <Subtitle title="Bank statements" />
        </Form>
      )}
    </Formik>
  );
};
