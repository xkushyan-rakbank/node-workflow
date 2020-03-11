import { accountNames } from "../../../constants";

export const accountTypesInfo = {
  [accountNames.starter]: [
    { key: 1, text: "No minimum balance required", iconName: "balance" },
    { key: 2, text: "Available in AED, USD, EUR & GBP", iconName: "availability" },
    {
      key: 3,
      text: "Preferential transaction fees through Digital Banking",
      iconName: "transaction"
    },
    { key: 4, text: "Dedicated Relationship Manager", iconName: "manager" }
  ],
  [accountNames.currentAccount]: [
    { key: 1, text: "Low minimum balance required", iconName: "balance" },
    { key: 2, text: "Available in AED, USD, EUR & GBP", iconName: "availability" },
    {
      key: 3,
      text: "Preferential transaction fees through Digital Banking",
      iconName: "transaction"
    },
    { key: 4, text: "Dedicated Relationship Manager", iconName: "manager" }
  ],
  [accountNames.elite]: [
    {
      key: 1,
      text: "Fast track processing of all your banking requests",
      iconName: "processing"
    },
    {
      key: 2,
      text: "Enhanced daily withdrawal limits",
      iconName: "withdrawal"
    },
    {
      key: 3,
      text: "Exclusive Business Elite service centers",
      iconName: "serviceCenter"
    },
    { key: 4, text: "Preferential exchange rates", iconName: "exchange" },
    {
      key: 5,
      text: "Free lounges, golf courses and valet services worldwide",
      iconName: "lounge"
    },
    { key: 6, text: "Dedicated Relationship Manager", iconName: "manager" }
  ]
};

export const accountText = {
  [accountNames.starter]: "Unmatched benefits to make banking stress-free",
  [accountNames.currentAccount]: "Unmatched benefits for an unmatched price",
  [accountNames.elite]: "Unmatched privileges to take your business to the next level"
};
