import React from "react";
import { connect } from "react-redux";

import { getSelectedAccountInfo } from "../../../../../store/selectors/selectedAccountInfo";
import { ExpandedDetailedOptionsCard } from "./ExpandedDetailedOptionsCard";
import { getUrlsReadMore } from "../../../../../store/selectors/appConfig";
import { rakValuesList } from "./constants";

import { useStyles } from "./styled";

const ExpandedOptionsCardsComponent = ({ accountType, readMoreUrls }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardsRoot}>
      {rakValuesList.map(({ optionList, isIncluded, cost, value }) => (
        <ExpandedDetailedOptionsCard
          key={value}
          optionList={optionList}
          isIncludeFd={isIncluded}
          cost={cost}
          value={value}
          readMoreUrls={readMoreUrls}
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
