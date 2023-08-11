import React from "react";
import { useStyles } from "../styled";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import { InformationSection } from "./InformationSection";
import { ReactComponent as LetsGoGreen } from "../../../assets/icons/letsGoGreenIcon.svg";
import routes from "../../../routes";

export const ProductInformationReview = ({ fieldValues }) => {
  console.log("fieldValues", fieldValues);
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
              <label>Currency:</label> <p>{fieldValues.accountCurrency}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Branch:</label>
              <p>{fieldValues.branch && `${fieldValues.branch}, ${fieldValues.branchEmirate}`}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Earn interest on account:</label>
              <p>{fieldValues.receiveInterest}</p>
            </div>
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
              <label>Company chequebook:</label>
              <p>{fieldValues.chequeBookApplied}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Bank statement delivery:</label>
              <p style={{ display: "flex", alignItems: "center" }}>{bankStatementType()} </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mobile notifications:</label>
              <p>{fieldValues.mobileInstructions}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Get promos and offers:</label>
              <p>
                {fieldValues.marketing}&nbsp;
                {fieldValues.marketing === "Yes" && fieldValues.marketingChannel
                  ? `(${fieldValues.marketingChannel.join(", ")})`
                  : ""}
              </p>
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
