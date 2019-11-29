import React from "react";
import { connect } from "react-redux";

import { getSelectedAccountInfo } from "../../../../../store/selectors/selectedAccountInfo";
import { ExpandedDetailedOptionsCard } from "./ExpandedDetailedOptionsCard";
import { getUrlsReadMore } from "../../../../../store/selectors/appConfig";
import { mockData } from "./constants";
import { useStyles } from "./styled";

export const getUrlReadMore = (urls, selectedAccountInfo, value) => {
  const {
    rakValuePlusIslamicReadMoreUrl,
    rakValueMaxIslamicReadMoreUrl,
    rakValuePlusReadMoreUrl,
    rakValueMaxReadMoreUrl
  } = urls;
  const { islamicBanking } = selectedAccountInfo;
  const valueType = value.includes("PLUS");

  if (islamicBanking) {
    return valueType ? rakValuePlusIslamicReadMoreUrl : rakValueMaxIslamicReadMoreUrl;
  }
  return valueType ? rakValuePlusReadMoreUrl : rakValueMaxReadMoreUrl;
};

const ExpandedOptionsCardsComponent = ({ accountType, ...props }) => {
  const { readMoreUrls, selectedAccountInfo } = props;
  const classes = useStyles();
  return (
    <div className={classes.cardsRoot}>
      {mockData.map(({ optionList, isIncluded, cost, value }) => (
        <ExpandedDetailedOptionsCard
          key={value}
          optionList={optionList}
          isIncluded={isIncluded}
          cost={cost}
          value={value}
          href={getUrlReadMore(readMoreUrls, selectedAccountInfo, value)}
          accountType={accountType}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  selectedAccountInfo: getSelectedAccountInfo(state)
});

export const ExpandedOptionsCards = connect(mapStateToProps)(ExpandedOptionsCardsComponent);
