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
  otherBankDetails
};

export const countryOptions = [
  {
    code: "AE",
    key: "AE",
    value: "AE",
    label: "Emirate"
  },
  {
    code: "USA",
    key: "USA",
    value: "USA",
    label: "United States"
  },
  {
    code: "GB",
    key: "GB",
    value: "GB",
    label: "Great Britain"
  }
];
