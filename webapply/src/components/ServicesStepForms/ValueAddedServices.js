import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import ExpandedDetailedOptionsCard from "../ExpandedOptionsCards/ExpandedDetailedOptionsCard";
import { mockData } from "../ExpandedOptionsCards/constants";
import * as appConfigSelectors from "../../store/selectors/appConfig";

const style = {
  formWrapper: {
    display: "flex"
  },
  cardsWrapper: {
    border: "none",
    boxShadow: "none",
    margin: 0,
    "&:first-of-type": {
      borderRight: "solid 1px #e9e9ed"
    }
  }
};

class ValueAddedServices extends React.Component {
  render() {
    const { classes, accountType } = this.props;
    return (
      <div className={classes.formWrapper}>
        {mockData.map(({ optionList, isIncluded, cost, value, href, buttonLabel }) => (
          <ExpandedDetailedOptionsCard
            key={value}
            optionList={optionList}
            isIncluded={isIncluded}
            cost={cost}
            value={value}
            href={href}
            accountType={accountType}
            className={classes.cardsWrapper}
            buttonLabel={buttonLabel}
            selectService={true}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    {}
  )
)(ValueAddedServices);
