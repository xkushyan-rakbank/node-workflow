import { accountTitles } from "../../../../constants";
import startups_ic from "../../../../assets/icons/startups_ic.svg";
import businesses_ic from "../../../../assets/icons/growing_businesses_ic.svg";
import established_businesses_ic from "../../../../assets/icons/established_businesses_ic.svg";
import { accountTypes } from "../TableCompare/constants";

export const accountTypesDescription = [
  {
    name: accountTitles.starter,
    icon: startups_ic,
    title: "For Startups \nand Entrepreneurs",
    description: [
      "Zero balance account",
      "Free remittances & preferential forex rates",
      "Free accounting \npackage & business insurance"
    ],
    buttonText: accountTypes.starter.name
  },
  {
    name: accountTitles.currentAccount,
    icon: businesses_ic,
    title: "For Growing Businesses",
    description: [
      "Low balance account",
      "Preferential transaction fees",
      "Dedicated Relationship Manager "
    ],
    buttonText: accountTypes.currentAccount.name
  },
  {
    name: accountTitles.elite,
    icon: established_businesses_ic,
    title: "For Established Businesses",
    description: [
      "Select free services",
      "Host of lifestyle benefits",
      "Priority servicing & Dedicated Relationship Manager"
    ],
    buttonText: accountTypes.elite.name
  }
];
export const SECTION_INDEX = 2;
