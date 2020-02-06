import { accountNames } from "../../../../constants";
import startups_ic from "../../../../assets/icons/startups_ic.svg";
import businesses_ic from "../../../../assets/icons/growing_businesses_ic.svg";
import established_businesses_ic from "../../../../assets/icons/established_businesses_ic.svg";

export const accountTypesDescription = [
  {
    name: accountNames.starter,
    icon: startups_ic,
    title: "For Startups \nand Entrepreneurs",
    description: [
      "Zero balance account",
      "Free remittances & preferential forex rates",
      "Free accounting \npackage & business insurance"
    ],
    buttonText: accountNames.starter
  },
  {
    name: accountNames.currentAccount,
    icon: businesses_ic,
    title: "For Growing Businesses",
    description: [
      "Low balance account",
      "Preferential transaction fees",
      "Dedicated Relationship Manager "
    ],
    buttonText: accountNames.currentAccount
  },
  {
    name: accountNames.elite,
    icon: established_businesses_ic,
    title: "For Established Businesses",
    description: [
      "Select free services",
      "Host of lifestyle benefits",
      "Priority servicing & Dedicated Relationship Manager"
    ],
    buttonText: accountNames.elite
  }
];
export const SECTION_INDEX = 2;
