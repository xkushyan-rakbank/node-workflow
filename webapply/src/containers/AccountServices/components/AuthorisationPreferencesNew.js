import React from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { ReactComponent as LetsGoGreen } from "../../../assets/icons/letsGoGreenIcon.svg";
import { AutoSaveField as Field, InlineRadioGroup, Input } from "../../../components/Form";
import { SinglyOptionList, yesNoOptions } from "../../../constants/options";
import { ContexualHelp } from "../../../components/Notifications";
import { DisclaimerNote } from "../../../components/InfoNote/DisclaimerNote";
import { useStyles } from "../styled";

const labelTextForGoGreenOption = (
  <span style={{ display: "flex", alignItems: "center" }}>
    <p style={{ margin: "0px" }}>
      Yes, let’s go green <span style={{ fontSize: "12px" }}>(free)</span>
    </p>
    <LetsGoGreen style={{ marginLeft: 4 }} />
  </span>
);

const labelTextForPreferPaper = <p style={{ margin: "0px" }}>No, I prefer paper</p>;

const YesNoListForRecieveStatementMode = [
  {
    code: "Yes",
    key: "Yes",
    value: true,
    label: labelTextForGoGreenOption
  },
  {
    code: "No",
    key: "No",
    value: false,
    label: labelTextForPreferPaper
  }
];

export const AuthorisationPreferences = ({
  values,
  radioChangeHandler,
  accountServiceChangeHandler,
  openDebitCardPriceGuideDialogOnClick,
  setFieldValue,
  isChqbookNameFieldEditable,
  statementsViaRadioColor,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div data-testid="authorisationPreferencesSection">
      <div className={classes.questionareWrapper} data-testid="signingRightsQuestion">
        <label className={classes.sectionLabel}>Who has signing rights for this account?</label>
        <Field
          typeRadio
          options={SinglyOptionList}
          name="signingPreferences"
          path={"prospect.accountInfo.signingPreferences"}
          component={InlineRadioGroup}
          customIcon={false}
          classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
          radioColor="primary"
          onChange={radioChangeHandler}
          dataTestId="signingRightsRadioBtn"
        />
      </div>
      <div className={classes.questionareWrapper} data-testid="companyChequebookContainer">
        <label className={classes.sectionLabel}>
          Would you like a company chequebook?
          <ContexualHelp
            title={"Chequebook availability is subject to\n successful credit checks."}
            placement="right"
            isDisableHoverListener={false}
            classes={classes.infoIcon}
          >
            <HelpOutlineIcon className={classes.infoIcon} />
          </ContexualHelp>
        </label>
        <Field
          typeRadio
          options={yesNoOptions}
          name="chequeBookApplied"
          path={"prospect.accountInfo.chequeBookApplied"}
          component={InlineRadioGroup}
          onChange={radioChangeHandler}
          customIcon={false}
          classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
          radioColor="primary"
          data-testid="chequeBookRadioBtn"
          InputProps={{
            inputProps: { tabIndex: 0, "data-testid": "chequeBookRadioBtn" }
          }}
        />
        {values.chequeBookApplied && (
          <Field
            name="nameOnChequeBook"
            label={"Name on cheque book"}
            path={"prospect.accountInfo.nameOnChequeBook"}
            placeholder={"Name on cheque book"}
            InputProps={{
              inputProps: { tabIndex: 1, maxLength: 50, "data-testid": "chequeBookNameField" }
            }}
            component={Input}
            classes={{ formControlRoot: classes.customLabel }}
            disabled={isChqbookNameFieldEditable}
          />
        )}
      </div>
      <div className={classes.questionareWrapper} data-testid="debitCardAppliedContainer">
        <label className={classes.sectionLabel}>
          Would you like to apply for a business debit card?
        </label>
        <Field
          typeRadio
          options={yesNoOptions}
          name="debitCardApplied"
          path={"prospect.accountInfo.debitCardApplied"}
          component={InlineRadioGroup}
          onChange={radioChangeHandler}
          customIcon={false}
          classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
          radioColor="primary"
        />
        {values.debitCardApplied && (
          <>
            <Field
              name="nameOnDebitCard"
              label={"Name on card"}
              path={"prospect.signatoryInfo[0].debitCardInfo.authSignatoryDetails.nameOnDebitCard"}
              placeholder={"Name on card"}
              InputProps={{
                inputProps: { tabIndex: 1, maxLength: 19, showInLineError: true }
              }}
              component={Input}
              classes={{ formControlRoot: classes.customLabel }}
            />
            <div className={classes.priceGuideInfo}>
              <p>
                Note: For details, please refer to the&nbsp;
                <a
                  className={classes.priceGuideLink}
                  onClick={e => {
                    e.stopPropagation();
                    openDebitCardPriceGuideDialogOnClick(true);
                  }}
                  data-testid="debitCardPriceGuideLink"
                >
                  Debit Card Service & Price guide
                </a>
                .
              </p>
            </div>
          </>
        )}
        {values.debitCardApplied === false && (
          <div className={classes.debitCardWrapper}>
            <DisclaimerNote
              className={classes.noteWrapper}
              text={
                "Note: In order to access our digital banking services, you are required to have a debit card associated with your account."
              }
            />
          </div>
        )}
      </div>
      <div className={classes.questionareWrapper} data-testid="statementsViaContainer">
        <label className={classes.sectionLabel}>
          Would you like to receive your account statements online? It’s a small step towards a
          greener planet.
        </label>
        <Field
          typeRadio
          options={YesNoListForRecieveStatementMode}
          name="statementsVia"
          component={InlineRadioGroup}
          customIcon={false}
          classes={{
            root: classes.radioButtonRoot,
            label: classes.radioLabelRoot,
            parent: classes.radioConatiner
          }}
          /* istanbul ignore next */
          radioColor={statementsViaRadioColor}
          onChange={accountServiceChangeHandler}
          InputProps={{
            inputProps: { "data-testid": "statementsViaRadioBtn" }
          }}
          dataTestId={"statementsViaRadioBtn"}
        />
      </div>
    </div>
  );
};
