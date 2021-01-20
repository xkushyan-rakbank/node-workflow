import { ICONS } from "../../../../../../components/Icons";
import { ActivePassiveOptions, enumYesNoOptions } from "../../../../../../constants/options";

export const INITIAL_ARRAY_INDEX = 0;

export const MAX_BANK_NAME_LENGTH = 50;
export const MAX_COMPANY_NAME_LENGTH = 30;
export const MAX_TRADE_LICENSE_LENGTH = 20;
export const GLOBAL_INTERMEDIARY_ID = 19;

export const limits = {
  CUSTOMER_COUNT: 5,
  SUPPLIER_COUNT: 5,
  COUNTRY_OF_ORIGIN_COUNT: 5,
  ANOTHER_BANK_COUNT: 5
};

export const initialOtherBankDetails = [{ bankName: "" }];
export const initialTopOriginGoodsCountries = [""];
export const initialTopSuppliers = [{ name: "", country: "" }];
export const initialTopCustomers = [{ name: "", country: "" }];

export const NONE_VISITED = 0;
export const IS_DNFBP_INFO_VISITED = 1;
export const dnfbpInfoContent = {
  message:
    "It is important to click and read  the need more information of Is your company dealing with Designated Business Categories before you proceed.",
  title: "",
  icon: ICONS.info
};
//ro-assist-brd3-15
export const usEntity = {
  options: enumYesNoOptions,
  helperText:
    "You are US entity if - company is incorporated in US, or holding mailing address of US",
  body: "Is your company a US entity ?",
  title: "US Entity",
  infoText: null,
  path: "prospect.orgKYCDetails.isCompanyUSEntity",
  fieldName: "isCompanyUSEntity"
};
export const financialInstitution = {
  options: enumYesNoOptions,
  helperText:
    "Includes all banks, Entities with Custody of financial assets, certain types of insurance companies, asset management companies and certain investment funds or investment vehicles link banks, security dealing companies, investment management services, insurance companies, fund managers, trusts & trustees.\nThe examples listed above are indicative in nature and have been provided for illustrative purposes only and should not be constructed as an exhaustive list of Financial Institutions / Non-Financial Entity",
  body: "Is your company a financial institution ?",
  title: "Financial Institution",
  infoText: null,
  path: "prospect.orgKYCDetails.isFinancialInstitution",
  fieldName: "isFinancialInstitution"
};
export const nonFinancialInstitution = {
  options: ActivePassiveOptions,
  helperText:
    "Active NFE - Generally an entity with trading activities, manufacturers, wholesalers, retailers, restaurants and bars, hotels, construction companies, health and social work.\n\nPassive NFE - Generally entities with no trading activities and receive income or dividend generated from its assets including properties and shares etc.",
  body: "Is your company an active or passive Non-financial Entity ?",
  title: null,
  infoText: null,
  path: "prospect.orgKYCDetails.isNonFinancialInstitution",
  fieldName: "isNonFinancialInstitution"
};
