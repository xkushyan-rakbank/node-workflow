import { getSelectedTypeCurrency } from "../../../../utils/SelectServices";
import { accountsNames } from "../../../../constants";

export const getButtonText = ({ _id, options, props }) => {
  const { accountCurrencies, rakValuePackage, accountType } = props;
  const { isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(accountCurrencies);
  if (isSelectOnlyForeignCurrency) {
    return options.disabledLabelForForeignCurrency;
  }

  if (rakValuePackage.value) {
    if (rakValuePackage.value === options._id) {
      return options.buttonLabel;
    }
    return options.notSelectedLabel;
  }

  if (accountType === accountsNames.starter) {
    if (_id === "RAKvalue PLUS") {
      return options.buttonLabel;
    }
    return options.notSelectedLabel;
  } else {
    return options.notSelectedLabel;
  }
};
