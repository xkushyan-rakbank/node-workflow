import { UAE_CODE } from ".";

export const endpoints = {
  baseUrl: "http://conv.rakbankonline.ae/quickapply",
  appConfigUri: "/onboarding/config/accounts",
  createProspectUri: "/onboarding/products/accounts/prospects",
  getProspectUri: "/onboarding/products/accounts/prospects/:prospectId",
  updateProspectUri: "/onboarding/products/accounts/prospects/:prospectId",
  getProspectDocumentsUri: "/onboarding/products/accounts/prospects/:prospectId/documents",
  /**TODO: To be pointing 2.0 api */
  uploadDocumentUri: "/rest/v1/banks/RAK/prospectId/:prospectId/documents",
  /**TODO: To be pointing 2.0 api */
  reuploadDocumentUri: "/rest/v1/banks/RAK/prospectId/:prospectId/documents",
  searchProspectUri: "/onboarding/products/accounts/prospects/search",
  /**TODO: To be pointing 2.0 exp-api */
  getDocumentByIdUri: "/api/v1/banks/RAK/prospects/:prospectId/documents/:documentKey",
  screenProspectUri: "/onboarding/products/accounts/prospects/:prospectId/screening",
  otpUri: "/onboarding/accounts/otp",
  /**TODO: To be pointing 2.0 exp-api */
  authenticateUserUri: "/onboarding/api/v1/users/authenticate",
  /**TODO: To be pointing 2.0 exp-api */
  docUploaderUri: "/api/v1/banks/RAK/prospects/:prospectId/documents",
  /**TODO: To be pointing 2.0 exp-api */
  createInviteUri: "/webapply/api/v1/agent/createInvite",
  prospectDecisions: "/onboarding/products/accounts/prospects/:prospectId/decisions",
  createKYCTransactionUri: "/onboarding/products/sme-accounts/kyc-transactions",
  //document upload DEH
  documentUploaderToken: "/onboarding/oauth/token",
  generateWebToMobileQRCode: "/onboarding/products/accounts/prospects/:prospectId/webToMobile",
  refreshWebToMobileQRCode:
    "/onboarding/products/accounts/prospects/:prospectId/webToMobile/:webToMobileRefId/refresh",
  wtmSyncSession: "/onboarding/products/accounts/webToMobile/auth/token",
  wtmStatusUpdate:
    "/onboarding/products/accounts/prospects/:prospectId/webToMobile/:webToMobileRefId",
  cpfSendEmailUrl: "/onboarding/cpf/product-config/subproducts/kfs-acknowledgement"
};

export const prospect = {
  applicantInfo: {
    fullName: "",
    email: "",
    countryCode: UAE_CODE,
    mobileNo: ""
  },
  generalInfo: {
    prospectId: "",
    cifId: "",
    customerType: "",
    dsaId: "",
    groupId: "",
    groupName: "",
    rmCode: "",
    accountManagerId: "",
    isPoliticallyExposed: ""
  },
  applicationInfo: {
    viewId: "",
    islamicBanking: false,
    accountType: "",
    rakValuePackage: "",
    leadNumber: "",
    riskScore: "0.0",
    srNumber: "",
    channelId: "",
    channelType: "",
    createdDate: "",
    lastModifiedDate: "",
    createdBy: "",
    lastModifiedBy: "",
    actionType: "",
    saveType: "",
    tncAgreed: false,
    declaration: false
  },
  accountInfo: [
    {
      branchId: "",
      accountType: "",
      accountSubType: "",
      accountNo: "",
      accountCurrencies: [],
      accountCurrency: "",
      accountPurpose: "",
      debitCardApplied: false,
      chequeBookApplied: false,
      eStatements: false,
      mailStatements: false,
      receiveInterest: false,
      deliverByCourier: false
    }
  ],
  organizationInfo: {
    screeningInfo: {
      statusOverAll: "",
      screeningResults: []
    },
    branchCity: "",
    branchID: "",
    countryOfIncorporation: "",
    companyName: "",
    shortName: "",
    dateOfIncorporation: null,
    numberOfEmployees: 0,
    licenseType: "",
    licenseTypeOther: "",
    licenseIssuingAuthority: "",
    licenseNumber: "",
    licenseIssueDate: null,
    licenseExpiryDate: "",
    vatRegistrationNumber: "",
    addressInfo: [
      {
        typeOfAddress: "",
        officeAddressDifferent: "",
        addressDetails: [
          {
            addressFieldDesc: "",
            preferredAddress: "",
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            addressLine4: "",
            poBox: "",
            emirateCity: "",
            country: "United Arab Emirates",
            typeOfSpaceOccupied: {
              spaceType: "",
              others: ""
            },
            officeAddrsLine1: "",
            officeAddrsPoBox: "",
            officeAddrsEmirateCity: "",
            officeAddrsCountry: "United Arab Emirates",
            preferredMailingAddrs: "",
            isDontSameAsRegisteredAddress: false
          }
        ]
      }
    ],
    contactDetails: {
      primaryMobileNo: "",
      primaryMobCountryCode: UAE_CODE,
      primaryEmail: "",
      primaryPhoneNo: "",
      primaryPhoneCountryCode: UAE_CODE,
      fax: "",
      faxCountryCode: "",
      secondaryPhoneNo: "",
      secondaryPhoneCountryCode: "",
      secondaryMobileNo: "",
      secondaryMobileCountryCode: "",
      secondaryEmail: "",
      website: ""
    },
    contactDetailsForTxnReconfirming: [
      {
        TxnReconfirmingfullname: "",
        primaryMobileNo: "",
        primaryMobCountryCode: "",
        primaryPhoneNo: "",
        primaryPhoneCountryCode: ""
      }
    ]
  },
  orgKYCDetails: {
    businessUnit: "",
    constitutionType: "",
    companyCategory: "",
    annualFinTurnoverAmtInAED: "",
    yearsInBusiness: 0,
    topCustomers: [
      {
        name: "",
        country: ""
      }
    ],
    topSuppliers: [
      {
        name: "",
        country: ""
      }
    ],
    topOriginGoodsCountries: [""],
    industryMultiSelect: [
      {
        industry: [""],
        subCategory: [""]
      }
    ],
    anticipatedTransactionsDetails: {
      totalMonthlyCashCreditsAED: {
        amountInFigures: "",
        inPercent: 0
      },
      totalMonthlyNonCashCreditsAED: {
        amountInFigures: "",
        inPercent: 0
      },
      totalMonthlyCreditsAED: "",
      maxAmtSingleTxnCashAED: "",
      maxAmtSingleTxnNonCashAED: ""
    },
    otherBankingRelationshipsInfo: {
      otherBankingRelationshipsExist: false,
      otherBankDetails: [
        {
          bankName: ""
        }
      ]
    },
    otherEntitiesInUAE: false,
    entitiesInUAE: [
      {
        companyName: "",
        emirate: "",
        tradeLicenseNo: ""
      }
    ],
    otherEntitiesOutsideUAE: false,
    entitiesOutsideUAE: [
      {
        companyName: "",
        country: ""
      }
    ],
    isDontHaveSuppliersYet: false,
    isDontTradeGoodsYet: false
  },
  signatoryInfo: [
    {
      screeningInfo: {
        statusOverAll: "",
        screeningResults: [
          {
            screeningType: "",
            screeningStatus: "",
            screeningFlag: "",
            screeningNotes: "",
            screeningReason: "",
            reasonNotes: "",
            reasonCode: "",
            reasonStatus: ""
          }
        ]
      },
      salutation: "",
      signatoryId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      shortName: "",
      fullName: "",
      gender: "",
      maritalStatus: "",
      maritalStatusOthers: "",
      occupation: "",
      mothersMaidenName: "",
      numberOfDependants: 0,
      highestEducationAttained: "",
      employmentStatus: "",
      kycVerified: false,
      kycDetails: {
        isShareholderACompany: false,
        salutation: "",
        shareholderPOASignatoryName: "",
        isSignatory: false,
        isShareholder: false,
        shareHoldingPercentage: 0,
        dateOfBirth: "",
        dualCitizenship: false,
        dualCitizenshipCountry: [""],
        residenceCountry: "",
        isUAEResident: false,
        passportDetails: [
          {
            passportNumber: "",
            passportExpiryDate: "",
            country: "",
            diplomatPassport: false,
            hasAnotherCitizenship: false
          }
        ],
        emirateIdDetails: {
          eidNumber: "",
          eidExpiryDt: ""
        },
        selfGovtPosition: "",
        relativeGovtPosition: "",
        isPEP: false,
        qualification: "",
        experienceInYrs: "",
        sourceOfWealth: [
          {
            wealthType: "",
            others: ""
          }
        ]
      },
      contactDetails: {
        primaryMobileNo: "",
        primaryMobCountryCode: UAE_CODE,
        primaryHomeCountryNo: "",
        primaryHomeCountryCode: UAE_CODE,
        primaryEmail: "",
        primaryPhoneNo: "",
        primaryPhoneCountryCode: UAE_CODE,
        fax: "",
        faxCountryCode: "",
        secondaryPhoneNo: "",
        secondaryPhoneCountryCode: "",
        secondaryMobileNo: "",
        secondaryMobileCountryCode: "",
        secondaryEmail: "",
        website: ""
      },
      employmentDetails: {
        employmentType: "",
        otherEmploymentType: "",
        designation: "",
        empNo: "",
        department: "",
        employerName: "",
        occupation: "",
        totalExperienceYrs: "",
        employmentStartDate: "",
        isPersonWorkAtCompany: false
      },
      sameAsCompanyAddress: false,
      addressInfo: [
        {
          typeOfAddress: "",
          addressDetails: [
            {
              addressFieldDesc: "",
              preferredAddress: "",
              addressLine1: "",
              addressLine2: "",
              addressLine3: "",
              addressLine4: "",
              poBox: "",
              emirateCity: "",
              country: "United Arab Emirates"
            }
          ]
        }
      ],
      accountSigningInfo: {
        accountSigningType: "",
        accountSigningInstn: "",
        authorityType: ""
      },
      debitCardInfo: {
        issueDebitCard: false,
        authSignatoryDetails: {
          fullNameOnPassport: "",
          nameOnDebitCard: ""
        }
      }
    }
  ],
  channelServicesInfo: {
    mobileInstructions: false,
    marketingSMS: false,
    doNotDisturbHours: "",
    weeklyBalanceNotification: "",
    monthlyBalanceNotification: 0
  },
  documents: {
    companyDocuments: [],
    stakeholdersDocuments: null,
    otherDocuments: []
  },
  prospectStatusInfo: {
    statusType: "",
    statusCode: "",
    statusFlag: "",
    statusNotes: "",
    statusReason: "",
    statusOverAll: "",
    reasonNotes: "",
    reasonCode: "",
    reasonStatus: ""
  },
  freeFieldsInfo: {
    freeField1: "",
    freeField2: "",
    freeField3: "",
    freeField4: "",
    freeField5: ""
  }
};

// each page based payload has to be added based no the viewId
export const pageProspectPaylodMap = {
  "/CompanyInfo": ["applicantInfo", "organizationInfo", "applicationInfo", "documents"],
  "/StakeholdersInfoPreview": ["signatoryInfo"],
  "/ConsentInfo": ["signatoryInfo"],
  "/CompanyAdditionalInfo": ["companyAdditionalInfo", "documents"],
  "/StakeholdersAdditionalInfo": ["signatoryInfo", "documents"],
  "/AccountInfo": ["accountInfo", "signatoryInfo", "channelServicesInfo", "applicationInfo"],
  "/AdditionalData": ["documents", "additionalDataForBPM"]
};
