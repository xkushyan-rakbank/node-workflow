import { prospect } from "../../../../../../constants/config";

export const INITIAL_ARRAY_INDEX = 0;

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
