import { prospect } from "../../../../../../constants/config";

export const limits = {
  CUSTOMER_COUNT: 5,
  SUPPLIER_COUNT: 5,
  COUNTRY_OF_ORIGIN_COUNT: 5,
  ANOTHER_BANK_COUNT: 5
};

const {
  orgKYCDetails: {
    topCustomers,
    topSuppliers,
    topOriginGoodsCountries,
    otherBankingRelationshipsInfo: { otherBankingRelationshipsExist, otherBankDetails },
    isDontHaveSuppliersYet,
    isDontTradeGoodsYet
  }
} = prospect;

export const initialValues = {
  topCustomers,
  topSuppliers,
  topOriginGoodsCountries,
  otherBankingRelationshipsExist,
  isDontHaveSuppliersYet,
  isDontTradeGoodsYet,
  otherBankDetails,
  "otherBankingRelationshipsInfo.otherBankDetails": otherBankDetails
};

export const countryOptions = [
  {
    code: "Emirate",
    key: "Emirate",
    value: "Emirate",
    label: "Emirate"
  },
  {
    code: "United States",
    key: "United States",
    value: "United States",
    label: "United States"
  },
  {
    code: "Great Britain",
    key: "Great Britain",
    value: "Great Britain",
    label: "Great Britain"
  }
];
