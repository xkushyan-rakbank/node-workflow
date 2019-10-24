import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";

import ExpandedDetailedOptionsCard from "./ExpandedDetailedOptionsCard";
import { mockData } from "./constants";
import { getUrlsReadMore } from "../../store/selectors/appConfig";
import { getSelectedAccountInfo } from "../../store/selectors/selectedAccountInfo";

const style = {
  root: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    "@media only screen and (max-width: 850px)": {
      justifyContent: "flex-start"
    }
  }
};

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

const ExpandedOptionsCards = ({ classes, accountType, ...props }) => {
  const { readMoreUrls, selectedAccountInfo } = props;

  return (
    <div className={classes.root}>
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

export default compose(
  connect(mapStateToProps),
  withStyles(style)
)(ExpandedOptionsCards);
