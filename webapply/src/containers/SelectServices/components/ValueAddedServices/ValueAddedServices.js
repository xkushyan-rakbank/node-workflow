import React from "react";
import cx from "classnames";

import { getUrlReadMore } from "../../../../components/ExpandedOptionsCards/ExpandedOptionsCards";
import { ExpandedDetailedOptionsCard } from "./ExpandedOptionsCards/ExpandedDetailedOptionsCard";
import { mockData } from "../../../../components/ExpandedOptionsCards/constants";
import { getSelectedTypeCurrency } from "../../../../utils/SelectServices";
import { accountsNames } from "../../../../constants/index";
import { getButtonText } from "./utils";
import { useStyles } from "./styled";

export const ValueAddedServicesComponent = props => {
  const { accountType, readMoreUrls, rakValuePackage, accountCurrencies, updateProspect } = props;
  const { isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(accountCurrencies);
  const classes = useStyles();

  const handleSelectValue = selectedService => {
    const {
      accountType,
      rakValuePackage: { name, value }
    } = props;

    let serviceName = selectedService;
    if (value === selectedService && accountType !== accountsNames.starter) {
      serviceName = "";
    }

    updateProspect({ [name]: serviceName });
  };

  return (
    <>
      <div className={cx(classes.formWrapper, { [classes.disabled]: isSelectOnlyForeignCurrency })}>
        {mockData.map(
          (
            {
              optionList,
              isIncluded,
              cost,
              value,
              href,
              buttonLabel,
              disabledLabelForForeignCurrency,
              _id
            },
            index
          ) => (
            <ExpandedDetailedOptionsCard
              key={value}
              value={value}
              id={_id}
              isSelected={value === rakValuePackage.value && !isSelectOnlyForeignCurrency}
              buttonLabel={getButtonText({ _id, options: mockData[index], props })}
              handleClick={handleSelectValue}
              disabled={isSelectOnlyForeignCurrency}
              optionList={optionList}
              isIncluded={isIncluded}
              cost={cost}
              href={getUrlReadMore(readMoreUrls, accountType, value)}
              accountType={accountType}
              className={classes.cardsWrapper}
              selectService={true}
            />
          )
        )}
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
