import React, { useCallback } from "react";
import cx from "classnames";

import {
  ExpandedDetailedOptionsCard,
  rakValuePackagePlusName
} from "./ExpandedOptionsCards/ExpandedDetailedOptionsCard";
import { RakValuesList } from "./ExpandedOptionsCards/constants";
import { accountsNames } from "../../../../constants/index";

import { useStyles } from "./styled";

const getButtonText = ({ _id, options, accountCurrencies, rakValuePackage, accountType }) => {
  const { isSelectOnlyForeignCurrency } = accountCurrencies;
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
    if (_id === rakValuePackagePlusName) {
      return options.buttonLabel;
    }
    return options.notSelectedLabel;
  } else {
    return options.notSelectedLabel;
  }
};

export const ValueAddedServicesComponent = ({
  accountType,
  readMoreUrls,
  updateProspect,
  rakValuePackage,
  rakValuePackage: { name, value },
  accountCurrencies
}) => {
  const { isSelectOnlyForeignCurrency } = accountCurrencies;
  const classes = useStyles();

  const handleSelectValue = useCallback(
    selectedService => {
      let serviceName = selectedService;
      if (value === selectedService && accountType !== accountsNames.starter) {
        serviceName = "";
      }

      updateProspect({ [name]: serviceName });
    },
    [value, accountType, name, updateProspect]
  );

  return (
    <>
      <div className={cx(classes.formWrapper, { [classes.disabled]: isSelectOnlyForeignCurrency })}>
        {RakValuesList.map(({ optionList, isIncluded, cost, value, _id }, index) => (
          <ExpandedDetailedOptionsCard
            key={value}
            value={value}
            id={_id}
            isSelected={value === rakValuePackage.value && !isSelectOnlyForeignCurrency}
            buttonLabel={getButtonText({
              _id,
              options: RakValuesList[index],
              accountCurrencies,
              rakValuePackage,
              accountType
            })}
            handleClick={handleSelectValue}
            disabled={isSelectOnlyForeignCurrency}
            optionList={optionList}
            isIncluded={isIncluded}
            cost={cost}
            readMoreUrls={readMoreUrls}
            accountType={accountType}
            className={classes.cardsWrapper}
            selectService
          />
        ))}
      </div>

      {isSelectOnlyForeignCurrency && (
        <p className={classes.disabledReasonInfo}>
          You have selected foreign currencies for your accounts. RAKvalue packages are only
          eligible for AED accounts
        </p>
      )}
    </>
  );
};
