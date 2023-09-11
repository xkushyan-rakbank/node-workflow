import React from "react";
import { useStyles } from "../styled";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import { InformationSection } from "./InformationSection";
import routes from "../../../routes";
import StakeholdersDetail from "../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";

export const CompanyAdditionalReview = ({ fieldValues, addressFormat, formatDate }) => {
  const classes = useStyles();
  return (
    <div className={classes.packageSelectionWrapper}>
      <Accordion
        title={
          <StakeholdersDetail
            name={fieldValues.companyName}
            isStakeholder={false}
            className={classes.stakeholdersDetailWrapper}
          />
        }
        id={"companyInformation"}
        classes={{
          accordionRoot: classes.accountServiceAccordionRoot,
          accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
          accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
          accordionDetails: classes.accordionDetails,
          accordionSummaryRoot: classes.accountServiceAccordionSummaryRoot
        }}
      >
        <InformationSection title={"Essential information"}>
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Applicant name:</label> <p>{fieldValues.applicantName}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Company name:</label>
              <p>{fieldValues.companyName}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Company category:</label>
              <p>{fieldValues.companyCategory}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Line of business:</label>
              <p>{fieldValues.lineOfBusiness}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Licence number:</label>
              <p>{fieldValues.licenseOrCOINumber}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Licence issuing authority:</label>
              <p>{fieldValues.licenseIssuingAuthority}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Date of incorporation:</label>
              <p>{formatDate(fieldValues.dateOfIncorporation)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Licence expiry date:</label>
              <p>{formatDate(fieldValues.licenseOrCOIExpiryDate)}</p>
            </div>
          </div>
        </InformationSection>
        <InformationSection
          title={"Your business information"}
          showEditIcon={true}
          routeTo={routes.additionalCompanyInformation}
        >
          <div className={classes.infoListWrapper}>
            <div className={classes.infoLabelValue}>
              <label>Annual financial turnover (AED):</label>
              <p>{fieldValues.annualFinTurnoverAmtInAED}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Estimated cash deposit (AED):</label>
              <p>{fieldValues.anualCashDepositAED}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Countries of business dealing:</label>
              <p>{fieldValues?.countriesOfBusinessDealing}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mailing address:</label>
              <p>{fieldValues.mailingAddress && addressFormat(fieldValues.mailingAddress)}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Proof of address:</label> <p>{fieldValues.proofOfAddress}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Registered email:</label>
              <p className={classes.noWrapText}>{fieldValues.email}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Mobile number:</label>
              <p className={classes.noWrapText}>
                {fieldValues.mobileNo && `+${fieldValues.countryCode} ${fieldValues.mobileNo}`}
              </p>
            </div>
          </div>
        </InformationSection>
        <InformationSection
          title={"Tax declarations"}
          showEditIcon={true}
          routeTo={routes.additionalCompanyInformation}
        >
          <div className={classes.infoListWrapper}>
            {fieldValues.dnfbpField === "yes" && (
              <div className={classes.infoLabelValue}>
                <label>Designated business dealings:</label>
                <p>{fieldValues.dnfbpField}</p>
              </div>
            )}
            <div className={classes.infoLabelValue}>
              <label>US entity:</label>
              <p>{fieldValues.isCompanyUSEntity}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>NFE status:</label>
              <p>{fieldValues.isNonFinancialInstitution}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Is your company a financial institution?</label>
              <p>{fieldValues.isFinancialInstitution}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>GIIN number:</label>
              <p>{fieldValues.globalintermediaryId}</p>
            </div>
          </div>
        </InformationSection>
      </Accordion>
    </div>
  );
};
