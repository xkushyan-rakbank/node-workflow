import configureMockStore from "redux-mock-store";

export const mockStore = configureMockStore()({
  serverValidation: {
    inputs: {}
  },
  inputFieldBehaviours: {
    "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": {
      visible: true,
      enabled: true
    },
    "prospect.organizationInfo.countryOfIncorporation": {
      visible: true,
      enabled: false
    },
    "prospect.organizationInfo.licenseOrCOIExpiryDate": {
      visible: true,
      enabled: true
    },
    "prospect.prospectDocuments.companyDocument.moa": {
      visible: false,
      enabled: true
    },
    "prospect.companyAdditionalInfo.topCustomers[0].name": {
      visible: true,
      enabled: true,
      label: ""
    },
    "prospect.companyAdditionalInfo.topCustomers[0].country": {
      visible: true,
      enabled: true,
      label: ""
    },
    "prospect.companyAdditionalInfo.topSuppliers.title": {
      visible: true,
      enabled: true,
      label: ""
    },
    "prospect.companyAdditionalInfo.topCustomers.title": {
      visible: true,
      enabled: true,
      label: ""
    },
    "prospect.companyAdditionalInfo.dnfbpField": {
      visible: false,
      enabled: true
    },
    "prospect.companyAdditionalInfo.topSuppliers[0].name": {
      visible: true
    },
    "prospect.companyAdditionalInfo.topSuppliers[0].country": {
      visible: true
    },
    "prospect.companyAdditionalInfo.isFinancialInstitution": {
      visible: false
    },
    "prospect.companyAdditionalInfo.globalintermediaryId": {
      visible: false
    },
    "prospect.companyAdditionalInfo.isNonFinancialInstitution": {
      visible: true
    }
  },
  decisions: {
    decisionLoading: {}
  },
  sendProspectToAPI: {
    loading: true
  }
});
