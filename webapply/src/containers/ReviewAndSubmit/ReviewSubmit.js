import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { format } from "date-fns";

import routes from "../../routes";
import { SUBMIT, formStepper } from "../../constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { BackLink } from "../../components/Buttons/BackLink";
import { Accordion } from "../../components/Accordion/CustomAccordion";
import { useTrackingHistory } from "../../utils/useTrackingHistory";
import { InformationSection } from "./components/InformationSection";
import {
  getDatalist,
  getDocuments,
  getProspect,
  getSignatories
} from "../../store/selectors/appConfig";
import { useStyles } from "./styled";
import { CompanyAdditionalReview } from "./components/CompanyAdditionalReview";
import { StakeholderAdditionalReview } from "./components/StakeholderAdditionalReview";
import { ProductInformationReview } from "./components/ProductInformationReview";
import { OverlayLoader } from "../../components/Loader";
import { useViewId } from "../../utils/useViewId";
import { useFindDocument } from "../../utils/useFindDocument";

export const ReviewSubmit = ({ sendProspectToAPI }) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const pushHistory = useTrackingHistory();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const {
    country: countryList,
    emirate: emirateList,
    companyCategory: companyCategoryList,
    licenseIssuingAuthority: licenseIssuingAuthorityList,
    industry: industryList,
    sourceOfIncome: sourceOfIncomeList,
    branchCity: branchCityList,
    emirateCity: emirateCityList,
    internationalBankAccountNumber: internationalBankAccountNumberList,
    qualification: qualificationList
  } = useSelector(getDatalist);

  const prospect = useSelector(getProspect);
  const [displayFields, setDisplayFields] = useState({});
  const signatoryName = useSelector(getSignatories)[0]?.fullName;

  const cvDocument =
    useSelector(getDocuments)?.stakeholdersDocuments?.[signatoryName]?.personalBackground
      ?.documents ?? null;

  const proofOfIncomeDocuments =
    useSelector(getDocuments)?.stakeholdersDocuments?.[signatoryName]?.personalBankStatements
      ?.documents ?? null;

  const tradeLicenceSourceIncomeDocuments =
    useSelector(getDocuments)?.stakeholdersDocuments?.[signatoryName]?.documents ?? null;

  const companyAddressProofDoc = useSelector(getDocuments)?.companyAddressProof?.documents ?? null;

  const addressProofKeyToCheck =
    "prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof";

  const proofOfAddressProvided = useFindDocument(companyAddressProofDoc, addressProofKeyToCheck);
  const cvProvided = useFindDocument(
    cvDocument,
    "prospect.prospectDocuments.additionalStakeholderDocument.cv"
  );
  const proofOfIncomeProvided = useFindDocument(
    proofOfIncomeDocuments,
    "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.proofOfIncome"
  );

  const tradeLicenceSourceIncomeProvided = useFindDocument(
    tradeLicenceSourceIncomeDocuments,
    "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.tradeLicense"
  );

  const getCountryLabel = useCallback(
    code => countryList?.find(country => country.code === code)?.displayText,
    [displayFields, countryList]
  );

  const getEmirateLabel = useCallback(
    code => emirateList?.find(emirate => emirate.code === code)?.displayText,
    [displayFields, emirateList]
  );

  const getIBANTypeLabel = useCallback(
    code =>
      internationalBankAccountNumberList?.find(ibanType => ibanType.code === code)?.displayText,
    [displayFields, internationalBankAccountNumberList]
  );

  const formatDate = useCallback(date => (date ? format(new Date(date), "dd/MM/yyyy") : ""), [
    displayFields
  ]);

  const formatFinancialValues = useCallback(
    value => {
      if (value) {
        const fixedValue = parseInt(value).toFixed(2);
        let numberX = fixedValue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        return `${numberX} AED`;
      }
    },
    [displayFields]
  );

  const formatAddress = useCallback(
    ({ addressLine1, addressLine2, country, emirateCity, poBox }) => {
      let address = "";
      address += addressLine1 ? `${addressLine1},` : "";
      address += poBox ? ` P.O Box ${poBox},` : "";
      address += addressLine2 ? `${addressLine2},` : "";
      address += emirateCity ? ` ${getEmirateLabel(emirateCity)},` : "";
      address += country ? ` ${getCountryLabel(country)}` : "";
      return address;
    },
    [displayFields]
  );

  const getCompanyCategoryDesc = useCallback(
    code => companyCategoryList?.find(category => category.code === code)?.displayText,
    [companyCategoryList, displayFields]
  );

  const getLicenseIssuingAuthorityText = useCallback(
    code => licenseIssuingAuthorityList?.find(category => category.code === code)?.displayText,
    [displayFields, licenseIssuingAuthorityList]
  );

  const getIndustrySubIndustryText = useCallback(
    (industryCode, subIndustryCode) => {
      if (industryCode && subIndustryCode) {
        const industry = industryList?.find(industry => industry.code === industryCode);
        const subCategory = industry?.subGroup.find(subCat => subCat.code === subIndustryCode);
        return `${industry?.displayText}, ${subCategory?.displayText}`;
      }
    },
    [displayFields, industryList]
  );

  const getSourceOfIncome = useCallback(
    incomeList =>
      incomeList
        .map(income => sourceOfIncomeList.find(value => value.code === income)?.displayText)
        .join(", "),
    [displayFields, sourceOfIncomeList]
  );

  const getBranchEmirate = useCallback(
    branchEmirateCode =>
      emirateCityList?.find(city => city.code === branchEmirateCode)?.displayText,
    [emirateCityList, displayFields]
  );

  const getBranchName = useCallback(
    branchCode => {
      if (displayFields.branchEmirate) {
        return branchCityList
          .find(branch => displayFields.branchEmirate === branch.displayText)
          .subGroup?.find(val => val.code === branchCode).displayText;
      }
    },
    [displayFields, branchCityList]
  );

  const getCountriesOfBusinessDealing = useCallback(
    (topCustomers, topSuppliers) => {
      if (topCustomers && topSuppliers) {
        const topCustomersCountries = topCustomers?.map(customer => customer.country);
        const topSuppliersCountries = topSuppliers?.map(customer => customer.country);
        let countries = [...topCustomersCountries, ...topSuppliersCountries];
        const uniqueCountryList = countries.filter(
          (country, index) => countries.indexOf(country) === index
        );
        return uniqueCountryList.map(code => getCountryLabel(code)).join(", ");
      }
    },
    [countryList, displayFields]
  );

  const truncateString = useCallback(
    (desc, truncateBy) =>
      desc && desc.length > truncateBy ? desc.substring(0, truncateBy) + "..." : desc,
    [displayFields]
  );

  const getqualificationLabel = useCallback(
    education => qualificationList?.find(city => city.code === education)?.displayText,
    [displayFields, qualificationList]
  );
  const initialValues = {};

  useEffect(() => {
    if (prospect) {
      const {
        applicantInfo,
        applicationInfo,
        companyAdditionalInfo,
        organizationInfo,
        signatoryInfo,
        accountInfo,
        channelServicesInfo
      } = prospect;
      const fields = {
        applicantName: applicantInfo?.fullName,
        email: applicantInfo?.email,
        mobileNo: applicantInfo?.mobileNo,
        countryCode: applicantInfo?.countryCode,
        agentCode: applicantInfo?.roCode,
        partnerCode: applicantInfo?.allianceCode,
        rakValuePackage: applicationInfo?.rakValuePackage,
        companyName: organizationInfo?.companyName,
        companyCategory: getCompanyCategoryDesc(organizationInfo?.companyCategory),
        lineOfBusiness:
          organizationInfo &&
          getIndustrySubIndustryText(
            organizationInfo?.industryMultiSelect[0]?.industry[0],
            organizationInfo?.industryMultiSelect[0]?.subCategory[0]
          ),
        licenseOrCOINumber: organizationInfo?.licenseOrCOINumber,
        licenseIssuingAuthority: getLicenseIssuingAuthorityText(
          organizationInfo?.licenseIssuingAuthority
        ),
        dateOfIncorporation: formatDate(organizationInfo?.dateOfIncorporation),
        licenseOrCOIExpiryDate: formatDate(organizationInfo?.licenseOrCOIExpiryDate),
        countriesOfBusinessDealing:
          companyAdditionalInfo &&
          getCountriesOfBusinessDealing(
            companyAdditionalInfo?.topCustomers,
            companyAdditionalInfo?.topSuppliers
          ),
        annualFinTurnoverAmtInAED: formatFinancialValues(
          companyAdditionalInfo?.annualFinTurnoverAmtInAED
        ),
        anualCashDepositAED: formatFinancialValues(companyAdditionalInfo?.anualCashDepositAED),
        mailingAddress:
          companyAdditionalInfo?.addressInfo[0] &&
          companyAdditionalInfo?.addressInfo[0].addressDetails[0],
        isCompanyUSEntity: companyAdditionalInfo?.isCompanyUSEntity ? "Yes" : "No",
        isNonFinancialInstitution:
          companyAdditionalInfo?.isNonFinancialInstitution === "active" ? "Active" : "Passive",
        globalintermediaryId: companyAdditionalInfo?.globalintermediaryId,
        isFinancialInstitution:
          companyAdditionalInfo?.isFinancialInstitution === "yes" ? "Yes" : "No",
        dnfbpField: companyAdditionalInfo?.dnfbpField === "yes" ? "Yes" : "No",
        signatoryFullName: signatoryInfo && signatoryInfo && signatoryInfo[0]?.editedFullName,
        signatoryNationality:
          signatoryInfo && getCountryLabel(signatoryInfo[0]?.kycDetails.nationality),
        dateOfBirth: formatDate(signatoryInfo && signatoryInfo[0]?.kycDetails.dateOfBirth),
        mothersMaidenName: signatoryInfo && signatoryInfo[0]?.mothersMaidenName,
        eidNumber: signatoryInfo && signatoryInfo[0]?.kycDetails.emirateIdDetails.eidNumber,
        eidExpiryDt: formatDate(
          signatoryInfo && signatoryInfo[0]?.kycDetails.emirateIdDetails.eidExpiryDt
        ),
        passportNumber:
          signatoryInfo && signatoryInfo[0]?.kycDetails.passportDetails[0].passportNumber,
        passportExpiryDate: formatDate(
          signatoryInfo && signatoryInfo[0]?.kycDetails.passportDetails[0].passportExpiryDate
        ),
        education:
          signatoryInfo &&
            signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.highestEducationAttained
            ? getqualificationLabel(
              signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails
                ?.highestEducationAttained
            )
            : "N/A",
        employmentType:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.employmentStatus,
        sourceOfIncome:
          getSourceOfIncome(
            (signatoryInfo &&
              signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.sourceOfIncome) ||
            []
          ) || "N/A",
        uaeIBAN:
          signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.IBAN,
        IBANType:
          signatoryInfo &&
            signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.IBANType
            ? signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.IBANType
            : "N/A",
        companyNameforSOF:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.companyNameforSOF,
        residentialAddress:
          signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.residentialAddress,
        countryOfTaxResidency:
          (signatoryInfo &&
            signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.taxesInAnotherCountry ===
            "no") ||
            ""
            ? getCountryLabel("AE")
            : getCountryLabel(
              signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.country
            ),
        TIN:
          signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.TIN
            ? signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.TIN
            : "N/A",
        reasonForTINNotAvailable:
          signatoryInfo &&
            signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.reasonForTINNotAvailable
            ? signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.reasonForTINNotAvailable
            : "N/A",
        remarks:
          signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.remarks
            ? signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails?.remarks
            : "N/A",

        nameOnDebitCard:
          signatoryInfo && signatoryInfo[0]?.debitCardInfo?.authSignatoryDetails?.nameOnDebitCard,
        linkedInURL:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.linkedInURL,
        backgroundInfo:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.backgroundInfo,
        accountCurrency: accountInfo?.accountCurrency,
        branch: getBranchName(accountInfo?.branchId) || "",
        branchEmirate: getBranchEmirate(accountInfo?.accountEmirateCity) || "",
        receiveInterest: accountInfo?.receiveInterest ? "Yes" : "No",
        debitCardApplied: accountInfo?.debitCardApplied ? "Yes" : "No",
        chequeBookApplied: accountInfo?.chequeBookApplied ? "Yes" : "No",
        mailStatements: accountInfo?.mailStatements,
        eStatements: accountInfo?.eStatements ? "Physical" : "",
        mobileInstructions: channelServicesInfo?.mobileInstructions ? "Yes" : "No",
        marketing: channelServicesInfo?.marketing ? "Yes" : "No",
        marketingChannel: channelServicesInfo?.marketingChannel,
        surveys: channelServicesInfo?.surveys ? "Yes" : "No",
        proofOfIncome: proofOfIncomeProvided ? "Provided" : "N/A",
        proofOfAddress: proofOfAddressProvided ? "Provided" : "N/A",
        cv: cvProvided ? "Provided" : "N/A",
        sourceOfIncomeTradeLicense: tradeLicenceSourceIncomeProvided ? "Provided" : "N/A"
      };
      setDisplayFields(fields);
    }
  }, [prospect]);

  const handleReviewSubmit = useCallback(() => {
    setIsLoading(true);
    return sendProspectToAPI(SUBMIT).then(
      isScreeningError => {
        if (!isScreeningError) pushHistory(routes.reviewAndSubmit, true);
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.section}>
          <SectionTitleWithInfo
            title={"Have one last look over your info"}
            info="If it's good to go, just hit Submit!"
            smallInfo
          />
          <Formik initialValues={initialValues} onSubmit={() => { }} validateOnChange={true}>
            {({ values, setFieldValue, ...props }) => {
              return (
                <Form>
                  <CompanyAdditionalReview
                    fieldValues={displayFields}
                    addressFormat={formatAddress}
                  />

                  <StakeholderAdditionalReview
                    fieldValues={displayFields}
                    addressFormat={formatAddress}
                    truncateString={truncateString}
                    ibanTypeLabel={getIBANTypeLabel(displayFields.IBANType)}
                  />
                  <ProductInformationReview fieldValues={displayFields} />

                  <div className={classes.packageSelectionWrapper}>
                    <Accordion
                      title={"Codes-Bank use"}
                      id={"codesBankUse"}
                      classes={{
                        accordionRoot: classes.accountServiceAccordionRoot,
                        accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                        accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                        accordionDetails: classes.accordionDetails
                      }}
                    >
                      <InformationSection title={""}>
                        <div className={classes.infoListWrapper}>
                          <div className={classes.infoLabelValue}>
                            <label>Agent code:</label> <p>{displayFields.partnerCode}</p>
                          </div>
                        </div>
                        <div className={classes.infoListWrapper}>
                          <div className={classes.infoLabelValue}>
                            <label>Partner code:</label>
                            <p>{displayFields.agentCode}</p>
                          </div>
                        </div>
                      </InformationSection>
                    </Accordion>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="linkContainer">
          <BackLink path={routes.accountServices} />
          <NextStepButton
            label="Submit"
            justifyContent="flex-end"
            disabled={false}
            onClick={() => handleReviewSubmit()}
          />
        </div>
      </div>
      <OverlayLoader open={isLoading} text={"Loading..."} />
    </>
  );
};
