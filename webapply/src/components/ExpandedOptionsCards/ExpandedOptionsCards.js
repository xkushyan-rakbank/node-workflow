import React from "react";
import { withStyles } from "@material-ui/core";
import ExpandedDetailedOptionsCard from "./ExpandedDetailedOptionsCard";
import { mockData } from "./constants";

const style = {
  root: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    overflow: "auto",
    justifyContent: "center",
    "@media only screen and (max-width: 850px)": {
      justifyContent: "flex-start"
    }
  }
};

const ExpandedOptionsCards = ({ classes, accountType }) => {
  return (
    <div className={classes.root}>
      {mockData.map(({ optionList, isIncluded, cost, value, href }) => (
        <ExpandedDetailedOptionsCard
          key={value}
          optionList={optionList}
          isIncluded={isIncluded}
          cost={cost}
          value={value}
          href={href}
          accountType={accountType}
        />
      ))}
    </div>
  );
};

export default withStyles(style)(ExpandedOptionsCards);
