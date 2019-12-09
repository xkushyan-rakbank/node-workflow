import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Divider, Grid } from "@material-ui/core";

import { checkIsDebitCardApplied, checkIsChequeBookApplied } from "./utils";
import { NAME_REGEX } from "../../../../utils/validation";

import { Checkbox, AutoSaveField as Field } from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import Subtitle from "../../../../components/Subtitle";
import { SignatoriesList } from "./SignatoriesList";
import { ICONS, Icon } from "../../../../components/Icons/Icon";

const MAX_LENGTH_NAME_ON_DEBIT_CARD = 15;

const channelsSchema = Yup.object({
  signatory: Yup.array().of(
    Yup.object().shape({
      nameOnDebitCard: Yup.string()
        .matches(NAME_REGEX, "This is not a valid name")
        .max(16, "Max length is 16 symbols")
        .required("Field is required")
    })
  )
});

const CustomCheckbox = props => (
  <Field
    component={Checkbox}
    icon={<Icon name={ICONS.unCheckedRadio} alt="select icon" />}
    checkedIcon={<Icon name={ICONS.checkedRadio} alt="selected icon" />}
    {...props}
  />
);

export const ChannelsComponent = ({ isHasSignatories, stakeholders, goToNext, ...props }) => {
  const isDisabledDebitCard = checkIsDebitCardApplied(props);
  const isDisabledChequeBook = checkIsChequeBookApplied(props);

  return (
    <Formik
      initialValues={{
        debitCardApplied: "",
        chequeBookApplied: "",
        eStatements: false,
        mailStatements: false,
        signatory: stakeholders.map(({ firstName, lastName }) => ({
          nameOnDebitCard: `${firstName} ${lastName}`.slice(0, MAX_LENGTH_NAME_ON_DEBIT_CARD)
        }))
      }}
      validationSchema={channelsSchema}
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
            label="I want a cheque book for the company"
            component={Checkbox}
            disabled={isDisabledChequeBook}
          />

          <Divider />

          <Subtitle title="Bank statements" />

          <CustomCheckbox
            name="eStatements"
            path="prospect.accountInfo[0].eStatements"
            label="I want online bank statements"
            onChange={() => {
              setFieldValue("mailStatements", false);
              setFieldValue("eStatements", true);
            }}
          />

          <CustomCheckbox
            name="mailStatements"
            path="prospect.accountInfo[0].mailStatements"
            label="I want paper statements (monthly charges apply)"
            onChange={() => {
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
