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
    code: "AE",
    key: "Emirate",
    value: "AE",
    label: "Emirate"
  },
  {
    code: "USA",
    key: "United States",
    value: "USA",
    label: "United States"
  },
  {
    code: "GB",
    key: "Great Britain",
    value: "GB",
    label: "Great Britain"
  }
];
