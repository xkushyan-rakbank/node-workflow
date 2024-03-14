import React from "react";
import { useStyles } from "../styled";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import { InformationSection } from "./InformationSection";
import { ReactComponent as LetsGoGreen } from "../../../assets/icons/letsGoGreenIcon.svg";
import routes from "../../../routes";
import { PreferredLanguageOptions, SinglyOptionList } from "../../../constants/options";

export const ProductInformationReview = ({ fieldValues, isIslamic }) => {
  const classes = useStyles();
  const bankStatementType = () => {
    return fieldValues.mailStatements ? (
      "Physical"
    ) : fieldValues.eStatements ? (
      <>
        Online <LetsGoGreen style={{ marginLeft: 4 }} />
      </>
    ) : (
      ""
    );
  };
  const preferredLanguageText = PreferredLanguageOptions.find(
    option => option.value === fieldValues.preferredLanguage
  );

  const signingRightsText = SinglyOptionList.find(
    option => option.value === fieldValues.signingRights
  );

  const mobileInstructionsText = value => {
    const labelMap = {
      true: "SMS & email",
      false: "SMS only"
    };

    return labelMap[value] || "";
  };

  const marketingChannelOptionsLabel = {
    Email: "Email",
    SMS: "SMS",
    Call: "Phone call",
    no: "No"
  };

  const getmarketingChannelOptions = options =>
    options.map(option => marketingChannelOptionsLabel[option]).join(", ");

  const getAccountTitles = value => {
    const labelMap = {
      RAKelite: "Business Elite",
      RAKStarter: "RAKstarter",
      "Current Account": "Current Account"
    };

    return labelMap[value] || "";
  };

  const getAccountCurrencies = currency => {
    return currency.join(", ");
  };

  return (
    <div className={classes.packageSelectionWrapper}>
      <Accordion
        title={"Product information"}
        id={"productInformation"}
        classes={{
          accordionRoot: classes.accountServiceAccordionRoot,
          accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails,
          accordionSummaryRoot: classes.accountServiceAccordionSummaryRoot
        }}
      >
        <InformationSection
          title={"Account details"}
          showEditIcon={true}
          routeTo={routes.accountServices}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Product variant:</label>
              <p style={{ textTransform: "capitalize" }}>{fieldValues.productVariant}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Account type:</label> <p>{getAccountTitles(fieldValues.accountType)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Signing rights:</label> <p>{signingRightsText?.label}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>{fieldValues.accountCurrency?.length > 1 ? "Currencies" : "Currency"}:</label>
              <p>
                {fieldValues.accountCurrency && getAccountCurrencies(fieldValues.accountCurrency)}
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Branch:</label>
              <p>{fieldValues.branch && `${fieldValues.branch}, ${fieldValues.branchEmirate}`}</p>
            </div>
            {!isIslamic && (
              <div className={classes.infoLabelValue}>
                <label>Earn interest on account:</label>
                <p>{fieldValues.receiveInterest}</p>
              </div>
            )}
            <div className={classes.infoLabelValue}>
              <label>Business debit card:</label>
              <p>{fieldValues.debitCardApplied}</p>
            </div>
            {fieldValues.debitCardApplied === "Yes" && (
              <div className={classes.infoLabelValue}>
                <label>Name on card:</label>
                <p>{fieldValues.nameOnDebitCard}</p>
              </div>
            )}
            <div className={classes.infoLabelValue}>
              <label>Company cheque book:</label>
              <p>{fieldValues.chequeBookApplied}</p>
            </div>
            {fieldValues.chequeBookApplied === "Yes" && (
              <div className={classes.infoLabelValue}>
                <label>Name on cheque book:</label>
                <p>{fieldValues.nameOnChequeBook}</p>
              </div>
            )}
            <div className={classes.infoLabelValue}>
              <label>Bank statement delivery:</label>
              <p style={{ display: "flex", alignItems: "center" }}>{bankStatementType()} </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Preferred language:</label>
              <p>{preferredLanguageText?.label}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mobile notifications:</label>
              <p>{mobileInstructionsText(fieldValues.mobileInstructions)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Get promos and offers:</label>
              <p>
                {fieldValues.marketingChannel &&
                  getmarketingChannelOptions(fieldValues.marketingChannel)}
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>
                Get early access to our latest offers (and from authorised RAKBANK partners):
              </label>
              <p>{fieldValues.marketing}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Contact for surveys and feedback:</label>
              <p>{fieldValues.surveys}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Selected package:</label> <p>{fieldValues.rakValuePackage}</p>
            </div>
          </div>
        </InformationSection>
      </Accordion>
    </div>
  );
};
