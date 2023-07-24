import React from "react";
import PatternFormat from "react-number-format";
import { useStyles } from "../styled";
import { InformationSection } from "./InformationSection";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import routes from "../../../routes";
export const StakeholderAdditionalReview = ({
  fieldValues,
  addressFormat,
  truncateString,
  ibanTypeLabel
}) => {
  const classes = useStyles();

  return (
    <div className={classes.packageSelectionWrapper}>
      <Accordion
        title={"Stakeholder information"}
        id={"stakeholderInformation"}
        classes={{
          accordionRoot: classes.accountServiceAccordionRoot,
          accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails
        }}
      >
        <InformationSection title={"Primary information"} showEditIcon={true}>
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
              <p>{fieldValues.dateOfBirth}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mother’s maiden name:</label>
              <p>{fieldValues.mothersMaidenName}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Personal email:</label>
              <p className={classes.noWrapText}>{fieldValues.email}</p>
            </div>
          </div>
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Mobile number:</label>
              <p className={classes.noWrapText}>
                {fieldValues.mobileNo && `+${fieldValues.countryCode} ${fieldValues.mobileNo}`}
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>EID number:</label>
              <p>
                <PatternFormat
                  value={fieldValues.eidNumber}
                  format="###-####-#######-#"
                  disabled
                  className={classes.eidField}
                />
              </p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>EID expiry date:</label>
              <p>{fieldValues.eidExpiryDt}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Passport number:</label>
              <p>{fieldValues.passportNumber}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Passport expiry:</label> <p>{fieldValues.passportExpiryDate}</p>
            </div>
          </div>
        </InformationSection>
        <InformationSection
          title={"Addtional information"}
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
              <label>CV:</label>
              <p>{fieldValues.employmentType}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Linkedin:</label>
              <p>{truncateString(fieldValues.linkedInURL, 40)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Background info:</label>
              <p>{truncateString(fieldValues.backgroundInfo, 100)}</p>
            </div>
          </div>
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>IBAN type:</label>
              <p>{truncateString(ibanTypeLabel, 100)}</p>
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
              <label>Proof of income:</label> <p>{fieldValues.proofOfAddress}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Residential address:</label>
              <p>
                {fieldValues.residentialAddress && addressFormat(fieldValues.residentialAddress)}
              </p>
            </div>
          </div>
        </InformationSection>
        <InformationSection
          title={"Tax Information"}
          showEditIcon={true}
          routeTo={routes.additionalStakeholderInformation}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>{fieldValues.signatoryFullName} is a tax resident of the United States?</label>
              <p>No</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Country of Tax Residency:</label>
              <p>{fieldValues.countryOfTaxResidency}</p>
            </div>
          </div>
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>TIN number:</label>
              <p>{fieldValues.TIN}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Reason for TIN not available:</label>
              <p>{truncateString(fieldValues.reasonForTINNotAvailable, 100)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Remarks:</label>
              <p>{fieldValues.remarks}</p>
            </div>
          </div>
        </InformationSection>
      </Accordion>
    </div>
  );
};
