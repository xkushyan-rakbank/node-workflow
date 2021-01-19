import { ICONS } from "../../../../../../components/Icons";

export const INITIAL_ARRAY_INDEX = 0;

export const MAX_BANK_NAME_LENGTH = 50;
export const MAX_COMPANY_NAME_LENGTH = 30;
export const MAX_TRADE_LICENSE_LENGTH = 20;

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
