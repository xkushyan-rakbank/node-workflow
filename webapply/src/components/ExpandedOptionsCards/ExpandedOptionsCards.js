import React from "react";
import { withStyles } from "@material-ui/core";
import ExpandedOptionsCard from "./ExpandedOptionsCard";

const mockData = [
  {
    optionList: [
      "Accountable Basic",
      "RAK Insurance",
      "International remittances"
    ],
    isIncluded: true,
    cost: 49,
    value: "plus",
    href: "#"
  },
  {
    optionList: [
      "Accountable Advanced",
      "RAK Insurance",
      "Extended banking benefits"
    ],
    isIncluded: false,
    cost: 149,
    value: "max",
    href: "#"
  }
];

const style = {
  root: {
    display: "flex",
    flex: "1 1 380px",
    flexWrap: "wrap"
  }
};

const ExpandedOptionsCards = ({ classes }) => (
  <div className={classes.root}>
    {mockData.map(({ optionList, isIncluded, cost, value, href }) => (
      <ExpandedOptionsCard
        key={value}
        optionList={optionList}
        isIncluded={isIncluded}
        cost={cost}
        value={value}
        href={href}
      />
    ))}
  </div>
);

export default withStyles(style)(ExpandedOptionsCards);
