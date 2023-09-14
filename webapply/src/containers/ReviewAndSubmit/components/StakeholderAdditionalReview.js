import React from "react";
import { useStyles } from "../styled";
import { InformationSection } from "./InformationSection";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import routes from "../../../routes";
import StakeholdersDetail from "../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";
import { operatorLoginScheme } from "../../../constants";
export const StakeholderAdditionalReview = ({
  fieldValues,
  addressFormat,
  formatDate,
  truncateString,
  ibanTypeLabel,
  scheme
}) => {
  const classes = useStyles();

  const formatEidNumber = number => {
    const cleanNumber = String(number).replace(/\D/g, "");

    const formattedNumber = cleanNumber.replace(/(\d{3})(\d{4})(\d{7})(\d{1})/, "$1-$2-$3-$4");

    return formattedNumber;
  };

  return (
    <div className={classes.packageSelectionWrapper}>
      <Accordion
        title={
          <StakeholdersDetail
            name={fieldValues.signatoryFullName}
            isStakeholder={true}
            className={classes.stakeholdersDetailWrapper}
          />
        }
        id={"stakeholderInformation"}
        classes={{
          accordionRoot: classes.accountServiceAccordionRoot,
          accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails,
          accordionSummaryRoot: classes.accountServiceAccordionSummaryRoot
        }}
      >
        <InformationSection
          title={"Essential information"}
          showEditIcon={scheme === operatorLoginScheme}
          routeTo={routes.stakeholdersPreview}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Full name:</label> <p>{fieldValues.signatoryFullName}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Nationality:</label>
              <p>{fieldValues.signatoryNationality}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Date of Birth:</label>
              <p>{formatDate(fieldValues.dateOfBirth)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mother’s maiden name:</label>
              <p>{fieldValues.mothersMaidenName}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Personal email:</label>
              <p className={classes.noWrapText}>{fieldValues.email}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mobile number:</label>
              <p className={classes.noWrapText}>
                {fieldValues.mobileNo && `+${fieldValues.countryCode} ${fieldValues.mobileNo}`}
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>EID number:</label>
              <p className={classes.eidField}>{formatEidNumber(fieldValues.eidNumber)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>EID expiry date:</label>
              <p>{formatDate(fieldValues.eidExpiryDt)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Passport number:</label>
              <p>{fieldValues.passportNumber}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Passport expiry:</label> <p>{formatDate(fieldValues.passportExpiryDate)}</p>
            </div>
          </div>
        </InformationSection>
        <InformationSection
          title={"Your personal Information"}
          showEditIcon={true}
          routeTo={routes.additionalStakeholderInformation}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Education:</label>
              <p>{fieldValues.education}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Employment type:</label>
              <p>{fieldValues.employmentType}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Source of income:</label>
              <p>{fieldValues.sourceOfIncome}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Linkedin:</label>
              <p>{truncateString(fieldValues.linkedInURL, 40) || "N/A"}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Work summary:</label>
              <p>{truncateString(fieldValues.backgroundInfo, 100) || "N/A"}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>CV:</label>
              <p>{fieldValues.cv}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>IBAN type:</label>
              <p>{truncateString(ibanTypeLabel, 100) || "N/A"}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>UAE IBAN: </label>
              <p>{fieldValues.uaeIBAN}</p>
            </div>
            {fieldValues.IBANType === "BARO" && (
              <>
                <div className={classes.infoLabelValue}>
                  <label>Company Name: </label>
                  <p>{fieldValues.companyNameforSOF}</p>
                </div>
                <div className={classes.infoLabelValue}>
                  <label>Trade licence: </label>
                  <p>{fieldValues.sourceOfIncomeTradeLicense}</p>
                </div>
              </>
            )}
            <div className={classes.infoLabelValue}>
              <label>Proof of income:</label> <p>{fieldValues.proofOfIncome}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Residential address:</label>
              <p>
                {fieldValues.residentialAddress && addressFormat(fieldValues.residentialAddress)}
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Proof of address:</label> <p>{fieldValues.residenceProofOfAddress}</p>
            </div>
          </div>
        </InformationSection>
        <InformationSection
          title={"Tax declarations"}
          showEditIcon={true}
          routeTo={routes.additionalStakeholderInformation}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>US tax resident:</label>
              <p>No</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Tax residence:</label>
              <p>{fieldValues.countryOfTaxResidency}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>TIN or equivalent:</label>
              <p>{fieldValues.TIN}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Reason for unavailable TIN:</label>
              <p>{truncateString(fieldValues.reasonForTINNotAvailable, 100)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Remarks:</label>
              <p>{truncateString(fieldValues.remarks, 100)}</p>
            </div>
          </div>
        </InformationSection>
      </Accordion>
    </div>
  );
};
