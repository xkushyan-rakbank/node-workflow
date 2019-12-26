import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";

import { checkIsDebitCardApplied, checkIsChequeBookApplied } from "./utils";
import { NAME_REGEX } from "../../../../utils/validation";

import { Checkbox, AutoSaveField as Field } from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import { Subtitle } from "../../../../components/Subtitle";
import { SignatoriesList } from "./SignatoriesList";
import { ICONS, Icon } from "../../../../components/Icons/Icon";
import { Divider } from "../Divider";

import { useStyles } from "./styled";

const MAX_LENGTH_NAME_ON_DEBIT_CARD = 15;
// eslint-disable-next-line max-len
const DEBIT_CARD_INFO =
  "Debit cards will be issued for eligible AED accounts only and they will be mailed by courier to your preferred address";
// eslint-disable-next-line max-len
const CHEQUE_BOOK_INFO =
  "Cheque book will be issued for eligible AED accounts only and they will be mailed by courier to your preferred address";

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

const pathDebitCardApplied = "prospect.accountInfo[0].debitCardApplied";
const pathChequeBookApplied = "prospect.accountInfo[0].chequeBookApplied";

export const ChannelsComponent = ({
  isHasSignatories,
  stakeholders,
  goToNext,
  updateProspect,
  debitCardApplied,
  ...props
}) => {
  const { isDisabledDebitCard, isDebitCardApplied } = checkIsDebitCardApplied(props);
  const { isDisabledChequeBook, isChequeBookApplied } = checkIsChequeBookApplied(props);
  const classes = useStyles();

  useEffect(() => {
    updateProspect({
      [pathDebitCardApplied]: isDebitCardApplied,
      [pathChequeBookApplied]: isChequeBookApplied
    });
  }, [isChequeBookApplied, isDebitCardApplied, updateProspect]);

  return (
    <Formik
      initialValues={{
        debitCardApplied: isDebitCardApplied,
        chequeBookApplied: isChequeBookApplied,
        eStatements: false,
        mailStatements: false,
        signatory: stakeholders.map(({ firstName, lastName }) => ({
          nameOnDebitCard: `${firstName} ${lastName}`.slice(0, MAX_LENGTH_NAME_ON_DEBIT_CARD)
        }))
      }}
      validationSchema={channelsSchema}
      validateOnChange={false}
      onSubmit={goToNext}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="Debit Cards" />

          <Field
            name="debitCardApplied"
            path={pathDebitCardApplied}
            label="I want debit cards for all the company signatories"
            classes={{ infoTitle: classes.infoTitle }}
            component={Checkbox}
            infoTitle={DEBIT_CARD_INFO}
            disabled={isDisabledDebitCard}
          />

          {isHasSignatories && <SignatoriesList stakeholders={stakeholders} />}

          <Divider classes={{ divider: classes.divider }} />

          <Subtitle title="Cheque book" />

          <Field
            name="chequeBookApplied"
            path={pathChequeBookApplied}
            label="I want a cheque book for the company"
            classes={{ infoTitle: classes.infoTitle }}
            component={Checkbox}
            infoTitle={CHEQUE_BOOK_INFO}
            disabled={isDisabledChequeBook}
          />

          <Divider />

          <Subtitle title="Bank statements" />

          <CustomCheckbox
            name="eStatements"
            path="prospect.accountInfo[0].eStatements"
            label="I want online bank statements"
            classes={{ formControlRoot: classes.eStatementsFormControl }}
            onChange={() => {
              setFieldValue("mailStatements", false);
              setFieldValue("eStatements", true);
            }}
          />

          <CustomCheckbox
            name="mailStatements"
            path="prospect.accountInfo[0].mailStatements"
            label="I want paper statements (monthly charges apply)"
            classes={{ formControlRoot: classes.mailStatementsFormControl }}
            onChange={() => {
              setFieldValue("eStatements", false);
              setFieldValue("mailStatements", true);
            }}
          />

          <Grid
            container
            direction="row"
            justify="space-between"
            classes={{ root: classes.rootGrid }}
          >
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
