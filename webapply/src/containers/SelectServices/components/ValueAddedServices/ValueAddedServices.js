import React, { useCallback, useEffect } from "react";
import cx from "classnames";
import {
  ExpandedDetailedOptionsCard,
  rakValuePackagePlusName
} from "./ExpandedOptionsCards/ExpandedDetailedOptionsCard";
import { rakValuesList } from "./ExpandedOptionsCards/constants";
import { accountNames } from "../../../../constants";
import { RAK_VALUE_PACKAGE_PATH } from "./constants";

import { useStyles } from "./styled";
import { GA_EVENTS } from "../../../../utils/ga";

const getButtonText = ({ _id, options, accountCurrencies, rakValuePackage, accountType }) => {
  const { isSelectOnlyForeignCurrency } = accountCurrencies;
  if (isSelectOnlyForeignCurrency) {
    return options.disabledLabelForForeignCurrency;
  }

  if (rakValuePackage) {
    if (rakValuePackage === options._id) {
      return options.buttonLabel;
    }
    return options.notSelectedLabel;
  }

  if (accountType === accountNames.starter) {
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
  accountCurrencies
}) => {
  const { isSelectOnlyForeignCurrency } = accountCurrencies;
  const classes = useStyles();

  const handleSelectValue = useCallback(
    selectedService => {
      const serviceName =
        rakValuePackage === selectedService && accountType !== accountNames.starter
          ? ""
          : selectedService;
      updateProspect(
        {
          [RAK_VALUE_PACKAGE_PATH]: serviceName
        },
        GA_EVENTS.SELECT_SERVICE_KEEP_PLUS_UPGRADE_CONTINUE
      );
    },
    [rakValuePackage, accountType, updateProspect]
  );

  useEffect(() => {
    updateProspect({
      [RAK_VALUE_PACKAGE_PATH]: accountType === accountNames.starter ? "RAKvalue PLUS" : ""
    });
  }, [accountType, updateProspect]);
  return (
    <>
      <div className={cx(classes.formWrapper, { [classes.disabled]: isSelectOnlyForeignCurrency })}>
        {rakValuesList.map(({ optionList, isIncluded, cost, value, _id }, index) => (
          <ExpandedDetailedOptionsCard
            key={value}
            value={value}
            id={_id}
            isSelected={value === rakValuePackage && !isSelectOnlyForeignCurrency}
            buttonLabel={getButtonText({
              _id,
              options: rakValuesList[index],
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
