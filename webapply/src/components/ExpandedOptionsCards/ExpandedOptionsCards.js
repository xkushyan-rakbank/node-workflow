import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";

import ExpandedDetailedOptionsCard from "./ExpandedDetailedOptionsCard";
import { mockData } from "./constants";
import { getUrlsReadMore } from "../../store/selectors/appConfig";
import { getSelectedAccountInfo } from "../../store/selectors/selectedAccountInfo";
import { portraitOrientationQueryIPads } from "../../constants/styles";
import { mobileResolution } from "../../constants";

const style = {
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "auto",
    margin: "-20px -26px 0",
    padding: "20px 16px 25px",
    [portraitOrientationQueryIPads]: {
      flexDirection: "column"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      margin: "0 -16px",
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  cardsContainerItem: {
    padding: "0 10px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      "&:first-child": {
        paddingLeft: 16
      },
      "&:last-child": {
        paddingRight: 16
      }
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
    <div className={classes.cardsContainer}>
      {mockData.map(({ optionList, isIncluded, cost, value }) => (
        <div key={value} className={classes.cardsContainerItem}>
          <ExpandedDetailedOptionsCard
            key={value}
            optionList={optionList}
            isIncluded={isIncluded}
            cost={cost}
            value={value}
            href={getUrlReadMore(readMoreUrls, selectedAccountInfo, value)}
            accountType={accountType}
          />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  readMoreUrls: getUrlsReadMore(state),
  selectedAccountInfo: getSelectedAccountInfo(state)
});

export default compose(
  withStyles(style),
  connect(mapStateToProps)
)(ExpandedOptionsCards);
