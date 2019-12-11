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
      {rakValuesList.map(({ isIncluded: isIncludeFd, ...cardProps }) => (
        <ExpandedDetailedOptionsCard
          key={cardProps.value}
          readMoreUrls={readMoreUrls}
          accountType={accountType}
          {...cardProps}
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
