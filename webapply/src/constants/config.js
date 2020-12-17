import { UAE_CODE } from ".";

export const endpoints = {
  baseUrl: "http://conv.rakbankonline.ae/quickapply",
  appConfigUri: "/webapply/api/v1/config",
  createProspectUri: "/webapply/api/v1/usertypes/:userType/prospects",
  getProspectUri: "/webapply/api/v1/usertypes/:userType/prospects/:prospectId",
  updateProspectUri: "/webapply/api/v1/usertypes/sme/prospects/:prospectId",
  getProspectDocumentsUri: "/webapply/api/v1/prospects/:prospectId/documents",
  uploadDocumentUri: "/webapply/api/v1/prospects/:prospectId/documents",
  reuploadDocumentUri: "/webapply/api/v1/prospects/:prospectId/documents",
  searchProspectUri: "/webapply/api/v1/usertypes/:userType/prospects/search",
  getDocumentByIdUri: "/docUploader/api/v1/banks/RAK/prospects/:prospectId/documents/:documentKey",
  screenProspectUri: "/webapply/api/v1//prospects/:prospectId/screening",
  otpUri: "/webapply/api/v1/otp",
  authenticateUserUri: "/webapply/api/v1/users/authenticate",
  docUploaderUri: "/docUploader/api/v1/banks/RAK/prospects/:prospectId/documents"
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
            officeAddrsCountry : "United Arab Emirates",
            preferredMailingAddrs:"",
            isDontSameAsRegisteredAddress:false
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
