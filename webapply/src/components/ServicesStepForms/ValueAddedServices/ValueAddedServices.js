import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import cx from "classnames";

import { mockData } from "../../ExpandedOptionsCards/constants";
import { getSelectedTypeCurrency } from "../../../utils/SelectServices";
import { getSelectedAccountInfo } from "../../../store/selectors/selectedAccountInfo";
import { getUrlsReadMore } from "../../../store/selectors/appConfig";
import { updateProspect } from "../../../store/actions/appConfig";
import { getGeneralInputProps, getInputValueById } from "../../../store/selectors/input";
import { accountsNames } from "../../../constants/index";
import ExpandedDetailedOptionsCard from "../../ExpandedOptionsCards/ExpandedDetailedOptionsCard";
import { getUrlReadMore } from "../../ExpandedOptionsCards/ExpandedOptionsCards";

import { styled } from "./styled";

class ValueAddedServices extends React.Component {
  handleSelectValue = selectedService => {
    const {
      accountType,
      rakValuePackage: { name, value }
    } = this.props;

    let serviceName = selectedService;
    if (value === selectedService && accountType !== accountsNames.starter) {
      serviceName = "";
    }

    this.props.updateProspect({ [name]: serviceName });
  };

  render() {
    const { classes, accountType, readMoreUrls, rakValuePackage, accountCurrencies } = this.props;

    const { isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(accountCurrencies);

    const getButtonText = (id, options) => {
      if (isSelectOnlyForeignCurrency) {
        return options.disabledLabelForForeignCurrency;
      }

      if (rakValuePackage.value) {
        if (rakValuePackage.value === options._id) {
          return options.buttonLabel;
        }
        return options.notSelectedLabel;
      }

      const { accountType } = this.props;
      if (accountType === accountsNames.starter) {
        if (id === "RAKvalue PLUS") {
          return options.buttonLabel;
        }
        return options.notSelectedLabel;
      } else {
        return options.notSelectedLabel;
      }
    };

    const classList = cx(classes.formWrapper, { [classes.disabled]: isSelectOnlyForeignCurrency });

    return (
      <>
        <div className={classList}>
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
                id={_id}
                isSelected={value === rakValuePackage.value && !isSelectOnlyForeignCurrency}
                buttonLabel={getButtonText(_id, mockData[index])}
                handleClick={this.handleSelectValue}
                disabled={isSelectOnlyForeignCurrency}
                optionList={optionList}
                isIncluded={isIncluded}
                cost={cost}
                value={value}
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
  }
}

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  rakValuePackage: getGeneralInputProps(state, "Appl.rakValuePackage"),
  accountCurrencies: getInputValueById(state, "Acnt.accountCurrencies", [0]),
  accountType: getSelectedAccountInfo(state).accountType
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  withStyles(styled),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ValueAddedServices);
