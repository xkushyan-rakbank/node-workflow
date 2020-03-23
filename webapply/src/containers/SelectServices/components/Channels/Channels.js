import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";

import { checkIsChequeBookApplied, checkIsDebitCardApplied } from "./utils";
import { NAME_REGEX, MAX_NAME_IN_BUSINESS_LENGTH } from "../../../../utils/validation";
import { getRequiredMessage, getInvalidMessage } from "../../../../utils/getValidationMessage";

import { Checkbox, AutoSaveField as Field } from "../../../../components/Form";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../components/Notifications";
import { Subtitle } from "../../../../components/Subtitle";
import { SignatoriesList } from "./SignatoriesList";
import { ICONS, Icon } from "../../../../components/Icons/Icon";
import { Divider } from "../Divider";
import { ContexualHelp } from "../../../../components/Notifications";

import { useStyles } from "./styled";

// eslint-disable-next-line max-len
const DEBIT_CARD_INFO =
  "Business debit cards will be issued for eligible AED accounts only and they will be mailed by courier to your preferred address";
// eslint-disable-next-line max-len
const CHEQUE_BOOK_INFO =
  "Cheque book will be issued for eligible AED accounts only and they will be mailed by courier to your preferred address";

const channelsSchema = Yup.object({
  signatory: Yup.array().of(
    Yup.object().shape({
      nameOnDebitCard: Yup.string()
        .required(getRequiredMessage("Name on debit card"))
        .max(MAX_NAME_IN_BUSINESS_LENGTH, `Max length is ${MAX_NAME_IN_BUSINESS_LENGTH} symbols`)
        .matches(NAME_REGEX, getInvalidMessage("Name on debit card"))
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
  createFormChangeHandler,
  updateProspect,
  primaryMobCountryCode,
  accountCurrencies: selectedCurrency
}) => {
  const classes = useStyles();

  const isChequeBookApplied = checkIsChequeBookApplied(primaryMobCountryCode, selectedCurrency);
  const isDebitCardApplied = checkIsDebitCardApplied(
    stakeholders[0].accountSigningInfo,
    selectedCurrency
  );

  useEffect(() => {
    updateProspect({
      [pathDebitCardApplied]: isDebitCardApplied,
      [pathChequeBookApplied]: isChequeBookApplied
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChequeBookApplied, updateProspect]);

  return (
    <Formik
      initialValues={{
        debitCardApplied: isDebitCardApplied,
        chequeBookApplied: isChequeBookApplied,
        eStatements: true,
        mailStatements: false,
        signatory: (isHasSignatories && isDebitCardApplied ? stakeholders : []).map(
          ({ firstName, lastName }) => ({
            nameOnDebitCard: `${firstName} ${lastName}`.slice(0, MAX_NAME_IN_BUSINESS_LENGTH)
          })
        )
      }}
      validationSchema={channelsSchema}
      validateOnChange={false}
      onSubmit={goToNext}
    >
      {createFormChangeHandler(({ values, setValues }) => (
        <Form>
          <Subtitle title="Business debit Cards" />
          <ContexualHelp
            isDisableHoverListener={false}
            classes={classes}
            placement="left"
            title={"Business debit card will be send to the signatory's preferred mailing address"}
          >
            <span>
              <Field
                name="debitCardApplied"
                path={pathDebitCardApplied}
                label="I want business debit cards for all the company signatories"
                classes={{ infoTitle: classes.infoTitle }}
                component={Checkbox}
                infoTitle={DEBIT_CARD_INFO}
                disabled
                isLoadDefaultValueFromStore={false}
                inputProps={{ tabIndex: 0 }}
              />
            </span>
          </ContexualHelp>
          {isHasSignatories && values.debitCardApplied && (
            <SignatoriesList stakeholders={stakeholders} />
          )}

          <Divider classes={{ divider: classes.divider }} />

          <Subtitle title="Cheque book" />
          <ContexualHelp
            isDisableHoverListener={false}
            classes={classes}
            placement="left"
            title={
              "Cheque book will be printed with the company name given and will be send to the Company address"
            }
          >
            <span>
              <Field
                name="chequeBookApplied"
                path={pathChequeBookApplied}
                label="I want a cheque book for the company"
                classes={{ infoTitle: classes.infoTitle }}
                component={Checkbox}
                infoTitle={CHEQUE_BOOK_INFO}
                disabled
                isLoadDefaultValueFromStore={false}
                inputProps={{ tabIndex: 0 }}
              />
            </span>
          </ContexualHelp>
          <Divider />

          <Subtitle title="Bank statements" />

          <CustomCheckbox
            name="eStatements"
            path={"prospect.accountInfo[0].eStatements"}
            label="I want online bank statements"
            classes={{ formControlRoot: classes.eStatementsFormControl }}
            onChange={() => {
              setValues({
                mailStatements: false,
                eStatements: true
              });
            }}
            inputProps={{ tabIndex: 0 }}
          />

          <CustomCheckbox
            name="mailStatements"
            path={"prospect.accountInfo[0].mailStatements"}
            label="I want paper statements (monthly charges apply)"
            classes={{ formControlRoot: classes.mailStatementsFormControl }}
            onChange={() => {
              setValues({
                eStatements: false,
                mailStatements: true
              });
            }}
            inputProps={{ tabIndex: 0 }}
          />

          <Grid
            container
            direction="row"
            justify="space-between"
            classes={{ root: classes.rootGrid }}
          >
            <Grid item xs={9}>
              {!values.eStatements && (
                <InfoTitle title="Paper statements will be mailed by courier to your preferred address" />
              )}
            </Grid>
            <Grid item xs={3}>
              <ContinueButton type="submit" />
            </Grid>
          </Grid>
        </Form>
      ))}
    </Formik>
  );
};
