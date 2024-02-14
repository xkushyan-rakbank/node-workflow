/* eslint-disable no-extra-boolean-cast */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { format } from "date-fns";

import routes from "../../routes";
import { CONVENTIONAL, ISLAMIC, NEXT, SUBMIT, formStepper } from "../../constants";
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
  getIsIslamicBanking,
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
import { rakValuePackages } from "../../constants";
import { Footer } from "../../components/Footer";
import { checkLoginStatus, getLoginResponse } from "../../store/selectors/loginSelector";
import ApplicationChecks from "./components/ApplicationChecks";
import { getIsSendingProspect } from "../../store/selectors/sendProspectToAPI";
import { scrollToDOMNode } from "../../components/VerticalPagination";

export const ReviewSubmit = ({ sendProspectToAPI }) => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  useViewId(true);
  const pushHistory = useTrackingHistory();
  const { scheme } = useSelector(getLoginResponse);
  const classes = useStyles();
  const isAgent = useSelector(checkLoginStatus);
  const loading = useSelector(getIsSendingProspect);

  const [isLoading, setIsLoading] = useState(false);
  const reviewSubmitRef = useRef(null);

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
    qualification: qualificationList,
    TINReason: TINReasonList,
    islamicIndustry: islamicIndustryList
  } = useSelector(getDatalist);

  const prospect = useSelector(getProspect);
  const [displayFields, setDisplayFields] = useState({});
  const signatoryName = useSelector(getSignatories)[0]?.fullName;
  const isIslamicBanking = useSelector(getIsIslamicBanking);

  const cvDocument =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.personalBackground
      ?.documents ?? null;

  const proofOfIncomeDocuments =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.personalBankStatements
      ?.documents ?? null;

  const tradeLicenceSourceIncomeDocuments =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.additionalDocuments ??
    null;

  const companyAddressProofDoc = useSelector(getDocuments)?.companyAddressProof?.documents ?? null;

  const addressProofKeyToCheck =
    "prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof";

  const proofOfAddressProvided = useFindDocument(companyAddressProofDoc, addressProofKeyToCheck);
  const cvProvided = useFindDocument(
    cvDocument,
    "prospect.prospectDocuments.stakeholderAdditionalInfo.backgroundDetails.cv"
  );
  const proofOfIncomeProvided = useFindDocument(
    proofOfIncomeDocuments,
    "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.proofOfIncome"
  );

  const tradeLicenceSourceIncomeProvided = useFindDocument(
    tradeLicenceSourceIncomeDocuments,
    "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.tradeLicense"
  );

  const residentialAddressProofDocProvided = useFindDocument(
    tradeLicenceSourceIncomeDocuments,
    "prospect.prospectDocuments.stakeholderAdditionalInfo.addressProof"
  );
  const getCountryLabel = useCallback(
    code => countryList?.find(country => country.code === code)?.displayText,
    [displayFields, countryList]
  );

  const getEmirateLabel = useCallback(
    code => emirateList?.find(emirate => emirate.code === code)?.displayText,
    [displayFields, emirateList]
  );

  const getEmirateCityLabel = useCallback(
    code => emirateCityList?.find(emirate => emirate.code === code)?.displayText,
    [displayFields, emirateCityList]
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
        const fixedValue = parseFloat(value).toFixed(2);
        let numberX = parseFloat(fixedValue).toLocaleString();
        return numberX;
      }
    },
    [displayFields]
  );

  const formatAddress = useCallback(
    ({ addressLine1, addressLine2, country, emirateCity, poBox }) => {
      let address = "";
      address += addressLine1 ? `${addressLine1},` : "";
      address += poBox ? ` P.O box ${poBox},` : "";
      address += addressLine2 ? `${addressLine2},` : "";
      address += emirateCity ? ` ${getEmirateCityLabel(emirateCity)},` : "";
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
        const industryType = isIslamicBanking ? islamicIndustryList : industryList;
        const industry = industryType?.find(industry => industry.code === industryCode);
        const subCategory = industry?.subGroup.find(subCat => subCat.code === subIndustryCode);
        return industry ? `${industry?.displayText}, ${subCategory?.displayText}` : "";
      }
    },
    [displayFields, industryList, islamicIndustryList, isIslamicBanking]
  );

  const getSourceOfIncome = useCallback(
    incomeList =>
      incomeList
        .map(income => sourceOfIncomeList.find(value => value.code === income)?.displayText)
        .join(", "),
    [displayFields, sourceOfIncomeList]
  );

  const getBranchEmirate = useCallback(
    branchEmirateCode => branchCityList?.find(city => city.code === branchEmirateCode)?.displayText,
    [branchCityList, displayFields]
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

  const getTINReasonLabel = useCallback(
    tinCode => TINReasonList?.find(tin => tin.code === tinCode)?.displayText,
    [displayFields, TINReasonList]
  );

  const initialValues = {};

  const findMarketingLabel = value => {
    const labelMap = {
      yes: "Yes",
      no: "No",
      other: "Ask me later"
    };

    return labelMap[value] || "";
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToDOMNode(reviewSubmitRef);
    }, 0);
  }, []);

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
        agentCode: applicantInfo?.roCode || "N/A",
        partnerCode: applicantInfo?.allianceCode || "N/A",
        sourcingID: applicantInfo?.sourcingId || "N/A",
        rakValuePackage: applicationInfo?.rakValuePackage
          ? rakValuePackages[(applicationInfo?.rakValuePackage)]
          : "N/A",
        accountType: applicationInfo?.accountType,
        productVariant: isIslamicBanking ? ISLAMIC : CONVENTIONAL,
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
        countryOfIncorporation:
          organizationInfo && getCountryLabel(organizationInfo?.countryOfIncorporation),
        dateOfIncorporation: organizationInfo?.dateOfIncorporation,
        licenseOrCOIExpiryDate: organizationInfo?.licenseOrCOIExpiryDate,
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
        isFinancialInstitution:
          companyAdditionalInfo?.isFinancialInstitution === "yes" ? "Yes" : "No",
        dnfbpField: companyAdditionalInfo?.dnfbpField ? companyAdditionalInfo?.dnfbpField : "-",
        signatoryFullName: signatoryInfo && signatoryInfo[0]?.editedFullName,
        signatoryNationality:
          signatoryInfo && getCountryLabel(signatoryInfo[0]?.kycDetails.nationality),
        dateOfBirth: signatoryInfo && signatoryInfo[0]?.kycDetails.dateOfBirth,
        countryofBirth: signatoryInfo && signatoryInfo[0]?.countryofBirth,
        mothersMaidenName: (signatoryInfo && signatoryInfo[0]?.mothersMaidenName) || "N/A",
        eidNumber: signatoryInfo && signatoryInfo[0]?.kycDetails.emirateIdDetails.eidNumber,
        eidExpiryDt: signatoryInfo && signatoryInfo[0]?.kycDetails.emirateIdDetails.eidExpiryDt,
        passportNumber:
          signatoryInfo && signatoryInfo[0]?.kycDetails.passportDetails[0].passportNumber,
        passportExpiryDate:
          signatoryInfo && signatoryInfo[0]?.kycDetails.passportDetails[0].passportExpiryDate,
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
          (signatoryInfo &&
            signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.IBAN) ||
          "N/A",
        IBANType:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.IBANType
            ? signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails?.IBANType
            : "N/A",
        companyNameforSOF:
          (signatoryInfo &&
            signatoryInfo[0]?.stakeholderAdditionalInfo?.sourceOfIncomeDetails
              ?.companyNameforSOF) ||
          "N/A",
        residentialAddress:
          signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.residentialAddress,
        taxesInAnotherCountry:
          signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.taxesInAnotherCountry,
        stakeholderTaxDetails:
          (signatoryInfo && signatoryInfo[0]?.stakeholderAdditionalInfo?.taxDetails) || [],

        nameOnDebitCard:
          signatoryInfo && signatoryInfo[0]?.debitCardInfo?.authSignatoryDetails?.nameOnDebitCard,
        linkedInURL:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.linkedInURL,
        backgroundInfo:
          signatoryInfo &&
          signatoryInfo[0]?.stakeholderAdditionalInfo?.backgroundDetails?.backgroundInfo,
        accountCurrency: accountInfo?.accountCurrency,
        branchEmirate: getBranchEmirate(accountInfo?.accountEmirateCity) || "",
        branch: getBranchName(accountInfo?.branchId) || "",
        receiveInterest: accountInfo?.receiveInterest ? "Yes" : "No",
        debitCardApplied: accountInfo?.debitCardApplied ? "Yes" : "No",
        chequeBookApplied: accountInfo?.chequeBookApplied ? "Yes" : "No",
        nameOnChequeBook: accountInfo?.nameOnChequeBook,
        mailStatements: accountInfo?.mailStatements,
        eStatements: accountInfo?.eStatements ? "Physical" : "",
        signingRights: accountInfo?.signingPreferences,
        preferredLanguage: accountInfo?.preferredLanguage,
        mobileInstructions: channelServicesInfo?.mobileInstructions || "",
        marketing: findMarketingLabel(channelServicesInfo?.marketing),
        marketingChannel: channelServicesInfo?.marketingChannel,
        surveys: channelServicesInfo?.surveys ? "Yes" : "No",
        proofOfIncome: !!proofOfIncomeProvided[0] ? "Provided" : "N/A",
        proofOfAddress: !!proofOfAddressProvided[0] ? "Provided" : "N/A",
        cv: !!cvProvided[0] ? "Provided" : "N/A",
        sourceOfIncomeTradeLicense: !!tradeLicenceSourceIncomeProvided[0] ? "Provided" : "N/A",
        residenceProofOfAddress: !!residentialAddressProofDocProvided[0] ? "Provided" : "N/A"
      };
      setDisplayFields(fields);
    }
  }, [prospect]);

  const handleReviewSubmit = useCallback(() => {
    setIsLoading(true);
    return sendProspectToAPI(NEXT, null, SUBMIT).then(
      isScreeningError => {
        if (!isScreeningError) {
          pushHistory(routes.congratulations, true);
        }
      },
      () => setIsLoading(false)
    );
  }, [pushHistory, sendProspectToAPI]);

  return (
    <>
      <div className={classes.container} ref={reviewSubmitRef}>
        <div className={classes.section}>
          <SectionTitleWithInfo
            title={"Have one last look over your info"}
            info="Please check through your application to ensure that the information you’ve provided is accurate. If you need to make any changes, just tap ‘Edit’. Once you’re ready, hit ‘Submit’!"
            smallInfo
          />
          {loading && <OverlayLoader open={loading} text={"Loading"} />}
          <Formik initialValues={initialValues} onSubmit={() => {}} validateOnChange={true}>
            {({ values, setFieldValue, ...props }) => {
              return (
                <Form>
                  <CompanyAdditionalReview
                    fieldValues={displayFields}
                    addressFormat={formatAddress}
                    formatDate={formatDate}
                    scheme={scheme}
                  />

                  <StakeholderAdditionalReview
                    fieldValues={displayFields}
                    addressFormat={formatAddress}
                    formatDate={formatDate}
                    truncateString={truncateString}
                    ibanTypeLabel={getIBANTypeLabel(displayFields.IBANType)}
                    countryLabel={getCountryLabel}
                    scheme={scheme}
                    getTINReasonLabel={getTINReasonLabel}
                  />
                  <ProductInformationReview
                    fieldValues={displayFields}
                    isIslamic={isIslamicBanking}
                  />

                  <div className={classes.packageSelectionWrapper}>
                    <Accordion
                      title={
                        <>
                          Codes <span className={classes.smallTitle}>(for bank use)</span>
                        </>
                      }
                      id={"codesBankUseReview"}
                      classes={{
                        accordionRoot: classes.accountServiceAccordionRoot,
                        accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                        accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                        accordionDetails: classes.accordionDetails,
                        accordionSummaryRoot: classes.accountServiceAccordionSummaryRoot
                      }}
                    >
                      <InformationSection title={""}>
                        <div className={classes.infoListWrapper}>
                          <div className={classes.infoLabelValue}>
                            <label>Agent code:</label> <p>{displayFields.agentCode}</p>
                          </div>
                          <div className={classes.infoLabelValue}>
                            <label>Sourcing ID:</label>
                            <p>{displayFields.sourcingID}</p>
                          </div>
                        </div>
                        <div className={classes.infoListWrapper}>
                          <div className={classes.infoLabelValue}>
                            <label>Partner code:</label>
                            <p>{displayFields.partnerCode}</p>
                          </div>
                        </div>
                      </InformationSection>
                    </Accordion>
                  </div>

                  {isAgent ? <ApplicationChecks /> : <></>}
                </Form>
              );
            }}
          </Formik>
        </div>
        <Footer>
          <BackLink path={routes.accountServices} isTypeButton={true} />
          <NextStepButton
            label="Submit"
            justifycontent="flex-end"
            type="button"
            onClick={() => handleReviewSubmit()}
          />
        </Footer>
      </div>
      <OverlayLoader open={isLoading} text={"Loading..."} />
    </>
  );
};
