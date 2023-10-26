import React, { useMemo, useState } from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "../styled";
import { InformationSection } from "./InformationSection";
import { Accordion } from "../../../components/Accordion/CustomAccordion";
import routes from "../../../routes";
import StakeholdersDetail from "../../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";
import { operatorLoginScheme } from "../../../constants";
import { ICONS, Icon } from "../../../components/Icons";
import { TaxInfoSection } from "./TaxInfoSection";
export const StakeholderAdditionalReview = ({
  fieldValues,
  addressFormat,
  formatDate,
  truncateString,
  ibanTypeLabel,
  countryLabel,
  scheme,
  getTINReasonLabel
}) => {
  const [showMoreBackgroundDetail, setShowMoreBackgroundDetail] = useState(false);
  const classes = useStyles({ showMoreBackgroundDetail });

  const formatEidNumber = number => {
    const cleanNumber = String(number).replace(/\D/g, "");

    const formattedNumber = cleanNumber.replace(/(\d{3})(\d{4})(\d{7})(\d{1})/, "$1-$2-$3-$4");

    return formattedNumber;
  };

  const defaultTaxCountry = {
    country: "AE",
    TIN: "",
    isTINAvailable: "",
    reasonForTINNotAvailable: "A-NOT ISSUED",
    remarks: ""
  };

  const stakeholderTaxDetails = useMemo(() => {
    if (fieldValues.stakeholderTaxDetails) {
      const taxDetails = [...fieldValues.stakeholderTaxDetails];
      const found = taxDetails.find(details => details.country === "AE");
      if (found && fieldValues.stakeholderTaxDetails.length === 1) {
        return [];
      }
      if (found) {
        taxDetails.unshift(taxDetails.pop());
      } else {
        taxDetails.unshift(defaultTaxCountry);
      }
      return taxDetails;
    } else {
      return [];
    }
  }, [fieldValues.stakeholderTaxDetails]);

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
          subTitle="These fields have already been verified and cannot be updated."
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
              <label>Date of birth:</label>
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
              <label>Source of funds:</label>
              <p>{fieldValues.sourceOfIncome}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Linkedin:</label>
              <p>{truncateString(fieldValues.linkedInURL, 40) || "N/A"}</p>
            </div>
            <div className={classes.infoLabelValue}>
              <label>Professional experience:</label>
              <p>
                {fieldValues.backgroundInfo
                  ? showMoreBackgroundDetail
                    ? fieldValues.backgroundInfo
                    : fieldValues.backgroundInfo.substring(0, 120)
                  : "N/A"}
                {fieldValues.backgroundInfo ? (
                  <Button
                    disableRipple={true}
                    className={classes.showMoreBtn}
                    onClick={() => setShowMoreBackgroundDetail(!showMoreBackgroundDetail)}
                  >
                    {showMoreBackgroundDetail ? "Show less" : "Show more"}
                    <Icon
                      name={ICONS.arrowDown}
                      alt="arrow-down"
                      className={classes.showMoreBtnIcon}
                    />
                  </Button>
                ) : (
                  ""
                )}
              </p>
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
                  <label>Trade License: </label>
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
            {Array.isArray(stakeholderTaxDetails) && stakeholderTaxDetails.length > 0 ? (
              stakeholderTaxDetails.map((taxDetail, index) => {
                return (
                  <TaxInfoSection
                    key={index}
                    index={index}
                    country={
                      taxDetail && taxDetail.country
                        ? countryLabel(taxDetail.country)
                        : countryLabel("AE")
                    }
                    tin={taxDetail && taxDetail.TIN ? taxDetail.TIN : "-"}
                    reasonForTINNotAvailable={
                      taxDetail && taxDetail.reasonForTINNotAvailable
                        ? getTINReasonLabel(taxDetail.reasonForTINNotAvailable)
                        : ""
                    }
                    remarks={taxDetail && taxDetail.remarks ? taxDetail && taxDetail.remarks : ""}
                    truncateString={truncateString}
                  />
                );
              })
            ) : (
              <TaxInfoSection
                hideLabel={true}
                index={0}
                country={countryLabel("AE")}
                tin={"-"}
                reasonForTINNotAvailable={getTINReasonLabel("A-NOT ISSUED")}
                remarks={""}
                truncateString={truncateString}
              />
            )}
          </div>
        </InformationSection>
      </Accordion>
    </div>
  );
};
