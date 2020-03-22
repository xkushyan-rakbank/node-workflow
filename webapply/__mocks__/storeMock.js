export const UNMATCHED_ACTION = {
  type: "WRONG_ACTION_TYPE",
  payload: {
    message: "message"
  }
};

export const MOCK_SCREENING_RESULTS = [
  {
    screeningType: "Virtual Currency Check",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "Proceed",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  {
    screeningType: "Country Of Incorporation Check",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "Proceed",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  {
    screeningType: "Dedupe Check",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "No Match",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  {
    screeningType: "Blacklist Check",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "No Match",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  {
    screeningType: "Signatory BL/NL Checks",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "No Match",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  {
    screeningType: "Company is a Stakeholder Check",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "Proceed",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  {
    screeningType: "Too many Stakeholders Check",
    screeningStatus: "Completed",
    screeningFlag: null,
    screeningNotes: null,
    screeningReason: "Proceed",
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  }
];

export const MOCK_PROSPECT_OBJECT = {
  prospectOverview: {
    applicantInfo: {
      fullName: "voss",
      email: "voss@gmail.com",
      countryCode: "971",
      mobileNo: "717171717",
      applyOnbehalf: null
    },
    generalInfo: {
      prospectId: "16607",
      _links: null,
      cifId: "2768569",
      customerType: "",
      dsaId: "",
      groupId: "",
      groupName: "",
      rmCode: "",
      accountManagerId: "",
      isPoliticallyExposed: ""
    },
    applicationInfo: {
      segment: null,
      viewId: "/SubmitApplication",
      islamicBanking: false,
      accountType: "Current Account",
      rakValuePackage: "",
      leadNumber: "062c68",
      riskScore: "4.05",
      srNumber: "SR4459070",
      channelId: "",
      channelType: "",
      createdDate: "",
      lastModifiedDate: "",
      createdBy: "",
      lastModifiedBy: "",
      actionType: "submit",
      saveType: "next",
      tncAgreed: false,
      declaration: false
    },
    accountInfo: [
      {
        branchId: "014",
        accountType: "",
        accountSubType: "",
        accountNo: "",
        accountCurrencies: ["AED", "USD"],
        accountCurrency: "AED",
        accountPurpose: "",
        debitCardApplied: true,
        chequeBookApplied: true,
        eStatements: true,
        mailStatements: false,
        receiveInterest: false,
        deliverByCourier: false
      }
    ],
    organizationInfo: {
      screeningInfo: {
        statusOverAll: "proceed",
        screeningResults: MOCK_SCREENING_RESULTS,
      },
      branchCity: "3",
      branchID: "014",
      countryOfIncorporation: "AE",
      companyName: "voss",
      shortName: "",
      dateOfIncorporation: "2020-03-12",
      numberOfEmployees: 0,
      licenseType: "",
      licenseTypeOther: "",
      licenseIssuingAuthority: "DED",
      licenseNumber: "bcbfgbh5643",
      licenseIssueDate: "2020-03-12",
      licenseExpiryDate: "",
      vatRegistrationNumber: "",
      addressInfo: [
        {
          typeOfAddress: "",
          officeAddressDifferent: "",
          addressDetails: [
            {
              addressFieldDesc: "",
              preferredAddress: "Y",
              addressLine1: "sdfdsfdf",
              addressLine2: "zdfhbvfcdsx",
              addressLine3: "",
              addressLine4: "",
              poBox: "12343",
              emirateCity: "DXB",
              country: "AE",
              typeOfSpaceOccupied: {
                spaceType: "1",
                others: ""
              }
            }
          ]
        }
      ],
      contactDetails: {
        primaryMobileNo: "000006664",
        primaryMobCountryCode: "971",
        primaryEmail: "rrterre@ereer.com",
        primaryPhoneNo: "",
        primaryPhoneCountryCode: "971",
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
          TxnReconfirmingfullname: "dfghfd",
          primaryMobileNo: "345234512",
          primaryMobCountryCode: "971",
          primaryPhoneNo: "",
          primaryPhoneCountryCode: "971"
        }
      ]
    },
    orgKYCDetails: {
      businessUnit: "",
      constitutionType: "",
      companyCategory: "FCPL",
      annualFinTurnoverAmtInAED: "12000",
      yearsInBusiness: 0,
      topCustomers: [
        {
          name: "rakbank",
          country: "AS"
        }
      ],
      isDontHaveSuppliersYet: true,
      topSuppliers: [
        {
          name: "",
          country: ""
        }
      ],
      isDontTradeGoodsYet: true,
      topOriginGoodsCountries: [""],
      industryMultiSelect: [
        {
          industry: ["G"],
          subCategory: ["23"]
        }
      ],
      anticipatedTransactionsDetails: {
        totalMonthlyCashCreditsAED: {
          amountInFigures: "500",
          inPercent: 50
        },
        totalMonthlyNonCashCreditsAED: {
          amountInFigures: "500",
          inPercent: 50
        },
        totalMonthlyCreditsAED: "1000",
        maxAmtSingleTxnCashAED: "500",
        maxAmtSingleTxnNonCashAED: "500"
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
      isShareholderACompany: false
    },
    signatoryInfo: [
      {
        screeningInfo: {
          statusOverAll: "proceed",
          screeningResults: [
            {
              screeningType: "Blacklist Check",
              screeningStatus: "Completed",
              screeningFlag: null,
              screeningNotes: null,
              screeningReason: "No Match",
              reasonNotes: null,
              reasonCode: null,
              reasonStatus: null
            },
            {
              screeningType: "Negative List Check",
              screeningStatus: "Completed",
              screeningFlag: null,
              screeningNotes: null,
              screeningReason: "No Match",
              reasonNotes: null,
              reasonCode: null,
              reasonStatus: null
            }
          ]
        },
        salutation: "MR.",
        signatoryId: "",
        firstName: "rakbank",
        middleName: "",
        lastName: "rakbank",
        shortName: "",
        fullName: "rakbank rakbank",
        gender: "MR.",
        maritalStatus: "M",
        maritalStatusOthers: "",
        occupation: "",
        mothersMaidenName: "tyui",
        numberOfDependants: 0,
        highestEducationAttained: "",
        employmentStatus: "",
        kycVerified: false,
        kycDetails: {
          salutation: "",
          shareholderPOASignatoryName: "",
          isShareholderACompany: false,
          isSignatory: true,
          isShareholder: true,
          shareHoldingPercentage: "100",
          dateOfBirth: "2020-03-12",
          nationality: "AX",
          dualCitizenship: false,
          dualCitizenshipCountry: [],
          residenceCountry: "AE",
          isUAEResident: true,
          passportDetails: [
            {
              passportNumber: "vcx76543",
              country: "AX",
              passportExpiryDate: "",
              diplomatPassport: false,
              hasAnotherCitizenship: false
            }
          ],
          emirateIdDetails: {
            eidNumber: "784123456543212",
            eidExpiryDt: ""
          },
          selfGovtPosition: null,
          relativeGovtPosition: null,
          isPEP: false,
          qualification: "2",
          experienceInYrs: "",
          sourceOfWealth: [
            {
              wealthType: "3",
              others: ""
            }
          ]
        },
        contactDetails: {
          primaryMobileNo: "000877654",
          primaryMobCountryCode: "971",
          primaryEmail: "dddddfgh@wert.oc",
          primaryPhoneNo: "",
          primaryPhoneCountryCode: "971",
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
          employmentType: "Housewife",
          otherEmploymentType: "",
          designation: "tests",
          empNo: "",
          department: "",
          isPersonWorkAtCompany: true,
          employerName: "voss",
          occupation: "",
          totalExperienceYrs: "ewdfv",
          employmentStartDate: ""
        },
        sameAsCompanyAddress: true,
        addressInfo: [
          {
            typeOfAddress: "",
            addressDetails: [
              {
                addressFieldDesc: "",
                preferredAddress: "",
                addressLine1: "sdfdsfdf",
                addressLine2: "zdfhbvfcdsx",
                addressLine3: "",
                addressLine4: "",
                poBox: "12343",
                emirateCity: "DXB",
                country: "United Arab Emirates"
              }
            ]
          }
        ],
        accountSigningInfo: {
          accountSigningType: "100",
          accountSigningInstn: "",
          authorityType: "7"
        },
        debitCardInfo: {
          issueDebitCard: false,
          authSignatoryDetails: {
            fullNameOnPassport: "",
            nameOnDebitCard: "asdf"
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
      companyDocuments: [
        {
          documentType: "Constitutional_Documents",
          signatoryId: null,
          signatoryName: null,
          documentTitle: "Upload Trade License Number",
          documentKey: "Constitutional_Documents-0",
          fileName: "16607_Constitutional_Documents_1583997606791.png",
          filePath: null,
          url: null,
          fileData: null,
          fileFormat: "image/png",
          fileSize: 1213690,
          fileDescription: "Screen Shot 2020-03-12 at 11.07.52 AM.png",
          submittedBy: null,
          submittedDt: "2020-03-12T07:07:54.382Z",
          updatedBy: null,
          updatedDt: null,
          avsCheckDt: null,
          avsCheck: false,
          verified: false,
          verifiedBy: null,
          isEncrypted: false,
          required: true,
          encryptionDetails: null,
          uploadStatus: "Uploaded"
        },
        {
          documentType: "Constitutional_Documents",
          signatoryId: null,
          signatoryName: null,
          documentTitle:
            "Upload Memorandum of Association/ Articles of Association/ Partners agreement/ Service Agreement/ Share Certificate",
          documentKey: "Constitutional_Documents-1",
          fileName: "16607_Constitutional_Documents_1583997610084.png",
          filePath: null,
          url: null,
          fileData: null,
          fileFormat: "image/png",
          fileSize: 1183382,
          fileDescription: "Screen Shot 2020-03-12 at 11.10.26 AM.png",
          submittedBy: null,
          submittedDt: "2020-03-12T07:10:28.194Z",
          updatedBy: null,
          updatedDt: null,
          avsCheckDt: null,
          avsCheck: false,
          verified: false,
          verifiedBy: null,
          isEncrypted: false,
          required: true,
          encryptionDetails: null,
          uploadStatus: "Uploaded"
        }
      ],
      stakeholdersDocuments: {
        "0_rakbank rakbank": {
          documents: [
            {
              documentType: "Passport_Copies",
              signatoryId: null,
              signatoryName: null,
              documentTitle: "Upload ALAND ISLANDS Passport",
              documentKey: "Passport_Copies-0",
              fileName: "16607_Passport_Copies_1583997613661.png",
              filePath: null,
              url: null,
              fileData: null,
              fileFormat: "image/png",
              fileSize: 1183382,
              fileDescription: "Screen Shot 2020-03-12 at 11.10.26 AM.png",
              submittedBy: null,
              submittedDt: "2020-03-12T07:10:28.194Z",
              updatedBy: null,
              updatedDt: null,
              avsCheckDt: null,
              avsCheck: false,
              verified: false,
              verifiedBy: null,
              isEncrypted: false,
              required: true,
              encryptionDetails: null,
              uploadStatus: "Uploaded"
            },
            {
              documentType: "Passport_Copies",
              signatoryId: null,
              signatoryName: null,
              documentTitle: "Upload Emirates Id",
              documentKey: "Passport_Copies-1",
              fileName: "16607_Passport_Copies_1583997616791.png",
              filePath: null,
              url: null,
              fileData: null,
              fileFormat: "image/png",
              fileSize: 1183382,
              fileDescription: "Screen Shot 2020-03-12 at 11.10.26 AM.png",
              submittedBy: null,
              submittedDt: "2020-03-12T07:10:28.194Z",
              updatedBy: null,
              updatedDt: null,
              avsCheckDt: null,
              avsCheck: false,
              verified: false,
              verifiedBy: null,
              isEncrypted: false,
              required: true,
              encryptionDetails: null,
              uploadStatus: "Uploaded"
            },
            {
              documentType: "Passport_Copies",
              signatoryId: null,
              signatoryName: null,
              documentTitle: "Upload Visa",
              documentKey: "Passport_Copies-2",
              fileName: "16607_Passport_Copies_1583997620787.png",
              filePath: null,
              url: null,
              fileData: null,
              fileFormat: "image/png",
              fileSize: 1183382,
              fileDescription: "Screen Shot 2020-03-12 at 11.10.26 AM.png",
              submittedBy: null,
              submittedDt: "2020-03-12T07:10:28.194Z",
              updatedBy: null,
              updatedDt: null,
              avsCheckDt: null,
              avsCheck: false,
              verified: false,
              verifiedBy: null,
              isEncrypted: false,
              required: true,
              encryptionDetails: null,
              uploadStatus: "Uploaded"
            }
          ]
        }
      },
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
    AuditTrailInfo: [
      {
        modifiedBy: "voss",
        modifiedDateTime: "12-03-2020 11:21:14"
      }
    ],
    freeFieldsInfo: {
      freeField1: "Y",
      freeField2: "",
      freeField3: "",
      freeField4: "",
      freeField5:
        '{"completedSteps":[{"flowId":"companyInfo","step":1,"status":"COMPLETED"},{"flowId":"companyInfo","step":2,"status":"COMPLETED"},{"flowId":"companyInfo","step":3,"status":"COMPLETED"},{"flowId":"companyStakeholder_1","step":1,"status":"COMPLETED"},{"flowId":"companyStakeholder_1","step":2,"status":"COMPLETED"},{"flowId":"companyStakeholder_1","step":3,"status":"COMPLETED"},{"flowId":"companyStakeholder_1","step":4,"status":"COMPLETED"},{"flowId":"companyStakeholder_1","step":5,"status":"COMPLETED"},{"flowId":"companyStakeholder_1","step":6,"status":"COMPLETED"},{"flowId":"finalQuestionsCompany","step":1,"status":"COMPLETED"},{"flowId":"finalQuestionsCompany","step":2,"status":"COMPLETED"},{"flowId":"finalQuestionsCompany","step":3,"status":"COMPLETED"},{"flowId":"finalQuestionsCompany","step":4,"status":"COMPLETED"},{"flowId":"finalQuestionsCompany","step":5,"status":"COMPLETED"},{"flowId":"companySignatory_1","step":1,"status":"COMPLETED"},{"flowId":"companySignatory_1","step":2,"status":"COMPLETED"},{"flowId":"companySignatory_1","step":3,"status":"COMPLETED"},{"flowId":"companySignatory_1","step":4,"status":"COMPLETED"},{"flowId":"selectServices","step":1,"status":"COMPLETED"},{"flowId":"selectServices","step":2,"status":"COMPLETED"},{"flowId":"selectServices","step":3,"status":"COMPLETED"},{"flowId":"selectServices","step":4,"status":"COMPLETED"}]}'
    }
  }
};

export const MOCK_SEARCH_RESULT = {
  prospectId: "14381",
  _links: null,
  status: {
    statusType: "RO_EDIT",
    statusCode: "D1",
    statusFlag: null,
    statusNotes: "Sales Agent Update",
    statusReason: null,
    statusOverAll: null,
    reasonNotes: null,
    reasonCode: null,
    reasonStatus: null
  },
  applicationInfo: {
    createdDate: "02-03-2020 11:28:13",
    lastModifiedDate: null,
    createdBy: "RAK.VTUSER",
    lastModifiedBy: null,
    segment: null,
    accountType: "RAKStarter",
    viewId: "/CompanyInfo",
    actionType: "save"
  },
  signatoryInfo: [
    {
      signatoryId: "",
      fullName: "Test test",
      screeningInfo: {
        statusOverAll: "proceed",
        screeningResults: [
          {
            screeningType: "Blacklist Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          },
          {
            screeningType: "Negative List Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          }
        ]
      }
    },
    {
      signatoryId: "",
      fullName: "fwqfw fwqf",
      screeningInfo: {
        statusOverAll: "proceed",
        screeningResults: [
          {
            screeningType: "Blacklist Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          },
          {
            screeningType: "Negative List Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          }
        ]
      }
    },
    {
      signatoryId: "",
      fullName: "",
      screeningInfo: {
        statusOverAll: "proceed",
        screeningResults: [
          {
            screeningType: "Blacklist Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          },
          {
            screeningType: "Negative List Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          }
        ]
      }
    },
    {
      signatoryId: "",
      fullName: "",
      screeningInfo: {
        statusOverAll: "proceed",
        screeningResults: [
          {
            screeningType: "Blacklist Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          },
          {
            screeningType: "Negative List Check",
            screeningStatus: "Completed",
            screeningFlag: null,
            screeningNotes: null,
            screeningReason: "No Match",
            reasonNotes: null,
            reasonCode: null,
            reasonStatus: null
          }
        ]
      }
    }
  ],
  organizationInfo: {
    licenseNumber: "321331",
    leadNumber: "058403",
    companyName: "tewst",
    screeningInfo: null
  },
  applicantInfo: {
    fullName: "test test",
    email: "test@test.com",
    countryCode: "971",
    mobileNo: "555222122"
  }
};
