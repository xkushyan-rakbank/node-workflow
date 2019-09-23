import React from "react";
import { withStyles } from "@material-ui/core";
import ExpandedOptionsCard from "./ExpandedOptionsCard";
import ExpandedDetailedOptionsCard from "./ExpandedDetailedOptionsCard";

const mockData = [
  {
    optionList: [
      { text: "Accountable Basic" },
      { text: "RAK Insurance" },
      { text: "International remittances" }
    ],
    isIncluded: true,
    cost: 49,
    value: "plus",
    href: "#"
  },
  {
    optionList: [
      { text: "Accountable Advanced" },
      { text: "RAK Insurance" },
      { text: "Extended banking benefits" }
    ],
    isIncluded: false,
    cost: 149,
    value: "max",
    href: "#"
  }
];

const detailedMockData = [
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
    flexWrap: "wrap"
  }
};

const ExpandedOptionsCards = ({ classes, isDetailed }) => {
  const data = isDetailed ? detailedMockData : mockData;
  return (
    <div className={classes.root}>
      {data.map(({ optionList, isIncluded, cost, value, href }) =>
        isDetailed ? (
          <ExpandedDetailedOptionsCard
            key={value}
            optionList={optionList}
            isIncluded={isIncluded}
            cost={cost}
            value={value}
            href={href}
          />
        ) : (
          <ExpandedOptionsCard
            key={value}
            optionList={optionList}
            isIncluded={isIncluded}
            cost={cost}
            value={value}
            href={href}
          />
        )
      )}
    </div>
  );
};

export default withStyles(style)(ExpandedOptionsCards);
