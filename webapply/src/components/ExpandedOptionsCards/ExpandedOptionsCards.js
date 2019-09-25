import React from "react";
import { withStyles } from "@material-ui/core";
import ExpandedDetailedOptionsCard from "./ExpandedDetailedOptionsCard";

const mockData = [
  {
    optionList: [
      {
        text: "One stop business solution",
        items: [
          "Automated accounting",
          "Smart invoicing",
          "Integrated VAT solution"
        ]
      },
      { text: "Business insurance" },
      { text: "Host of other banking benefits" }
    ],
    isIncluded: true,
    cost: 49,
    value: "RAKvalue PLUS",
    href: "#"
  },
  {
    optionList: [
      {
        text: "One stop business solution",
        items: [
          "Automated accounting",
          "Smart invoicing",
          "Integrated VAT solution"
        ]
      },
      { text: "Business insurance" },
      { text: "Host of other banking benefits" }
    ],
    isIncluded: false,
    cost: 149,
    value: "RAKvalue MAX",
    href: "#"
  }
];

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
