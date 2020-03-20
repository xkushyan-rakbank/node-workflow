import { accountTitles } from "../../../../constants";
import { accountTypes } from "../TableCompare/constants";

import { ReactComponent as Startups } from "../../../../assets/icons/startups_ic.svg";
import { ReactComponent as Businesses } from "../../../../assets/icons/growing_businesses_ic.svg";
import { ReactComponent as EstablishedBusinesses } from "../../../../assets/icons/established_businesses_ic.svg";

export const accountTypesDescription = [
  {
    name: accountTitles.starter,
    Icon: Startups,
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
    Icon: Businesses,
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
    Icon: EstablishedBusinesses,
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
