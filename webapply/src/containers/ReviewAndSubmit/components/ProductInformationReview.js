import React from "react";
import { useStyles } from "../styled";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import { InformationSection } from "./InformationSection";
import { ReactComponent as LetsGoGreen } from "../../../assets/icons/letsGoGreenIcon.svg";
import routes from "../../../routes";

export const ProductInformationReview = ({ fieldValues }) => {
  const classes = useStyles();
  const bankStatementType = () => {
    return fieldValues.mailStatements ? (
      <>
        Online <LetsGoGreen style={{ marginLeft: 4 }} />
      </>
    ) : fieldValues.eStatements ? (
      "Physical"
    ) : (
      ""
    );
  };
  return (
    <div className={classes.packageSelectionWrapper}>
      <Accordion
        title={"Product Information"}
        id={"productInformation"}
        classes={{
          accordionRoot: classes.accountServiceAccordionRoot,
          accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails
        }}
      >
        <InformationSection
          title={"Account details"}
          showEditIcon={true}
          routeTo={routes.accountServices}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Currency:</label> <p>{fieldValues.accountCurrency}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Branch:</label>
              <p>{fieldValues.branch && `${fieldValues.branch}, ${fieldValues.branchEmirate}`}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Do you want to earn interest on this account?</label>
              <p>{fieldValues.receiveInterest}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Would you like to apply for a business debit card?</label>
              <p>{fieldValues.debitCardApplied}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Name on card:</label>
              <p>{fieldValues.nameOnDebitCard}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Do you want a chequebook for the company?</label>
              <p>{fieldValues.chequeBookApplied}</p>
            </div>
          </div>
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>How would you like to get your bank statements?</label>
              <p style={{ display: "flex", alignItems: "center" }}>{bankStatementType()} </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Would you like to get transaction notifications on your mobile?</label>
              <p>{fieldValues.mobileInstructions}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Would you like to be the first to hear about the latest offers?</label>
              <p>
                {fieldValues.marketing}&nbsp;
                {fieldValues.marketing === "Yes" && fieldValues.marketingChannel
                  ? `(${fieldValues.marketingChannel.join(", ")})`
                  : ""}
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>
                Can we contact you for surveys or feedback, either directly or through a third
                party?
              </label>
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
