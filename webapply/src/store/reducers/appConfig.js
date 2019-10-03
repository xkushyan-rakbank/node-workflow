import {
  RECEIVE_APPCONFIG,
  RECEIVE_APPCONFIG_SUCCESS,
  RECEIVE_APPCONFIG_FAIL,
  UPDATE_PROSPECT_ID,
  SET_PROSPECT
} from "../actions/appConfig";

/**
 * @typedef {Object} AppConfig
 * @property {Boolean} loading
 * @property {Object} uiConfig
 * @property {Object} endpoints
 * @property {Prospect} prospect
 * @property {String} error
 * @type {AppConfig}
 */
const initialState = {
  loading: false,
  uiConfig: {},
  endpoints: {},
  prospect: {},
  error: ""
};

const appConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_APPCONFIG:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case RECEIVE_APPCONFIG_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false
      };
    case RECEIVE_APPCONFIG_FAIL:
      return {
        ...state,
        loading: false,
        error: "error"
      };
    case SET_PROSPECT:
      return {
        ...state,
        prospect: action.prospect
      };
    case UPDATE_PROSPECT_ID:
      return {
        ...state,
        prospect: {
          ...state.prospect,
          generalInfo: {
            ...(state.prospect.generalInfo || {}),
            prospectId: action.prospectId
          }
        }
      };
    default:
      return state;
  }
};

export default appConfigReducer;

/**
 * @typedef {Object} Prospect
 * @property {Object} Login
 * @property {Array} accountInfo
 * @property {ApplicantInfo} applicantInfo
 * @property {ApplicationInfo} applicationInfo
 * @property {Object} channelServicesInfo
 * @property {Object} documents
 * @property {Object} freeFieldsInfo
 * @property {Object} generalInfo
 * @property {OrgKYCDetails} orgKYCDetails
 * @property {Object} organizationInfo
 * @property {Object} prospectStatusInfo
 * @property {Object} searchInfo
 * @property {Signatory[]} signatoryInfo
 */

/** @typedef {Object} ApplicantInfo
 * @property {Boolean} applyOnbehalf
 * @property {String} countryCode
 * @property {String} email
 * @property {String} fullName
 * @property {String} mobileNo
 */

/** @typedef {Object} ApplicationInfo
 * @property {String} actionType
 * @property {String} channelId
 * @property {String} channelType
 * @property {String} createdBy
 * @property {String} createdDate
 * @property {Boolean} declaration
 * @property {String} lastModifiedBy
 * @property {String} lastModifiedDate
 * @property {String} leadNumber
 * @property {String} riskScore
 * @property {String} saveType
 * @property {String} srNumber
 * @property {Boolean} tncAgreed
 * @property {String} viewId
 */

/** @typedef {Object} OrgKYCDetails
 * @property {String} annualFinTurnoverAmtInAED
 * @property {Object} anticipatedTransactionsDetails
 * @property {String} businessUnit
 * @property {String} companyCategory
 * @property {String} constitutionType
 * @property {Array} entitiesInUAE
 * @property {Array} entitiesOutsideUAE
 * @property {Array} industryMultiSelect
 * @property {Boolean} isShareholderACompany
 * @property {Object} otherBankingRelationshipsInfo
 * @property {Boolean} otherEntitiesInUAE
 * @property {Boolean} otherEntitiesOutsideUAE
 * @property {Array} topCustomers
 * @property {Array} topOriginGoodsCountries
 * @property {Array} topSuppliers
 * @property {Number} yearsInBusiness
 */

/** @typedef {Object} Signatory
 * @property {Object} accountSigningInfo
 * @property {Array} addressInfo
 * @property {Object} contactDetails
 * @property {Object} debitCardInfo
 * @property {Object} employmentDetails
 * @property {String} employmentStatus
 * @property {String} firstName
 * @property {String} fullName
 * @property {String} gender
 * @property {String} highestEducationAttained
 * @property {Object} kycDetails
 * @property {Boolean} kycVerified
 * @property {String} lastName
 * @property {String} maritalStatus
 * @property {String} maritalStatusOthers
 * @property {String} middleName
 * @property {String} mothersMaidenName
 * @property {Number} numberOfDependants
 * @property {String} occupation
 * @property {String} salutation
 * @property {Boolean} sameAsCompanyAddress
 * @property {Object} screeningInfo
 * @property {String} shortName
 * @property {String} signatoryId
 */
