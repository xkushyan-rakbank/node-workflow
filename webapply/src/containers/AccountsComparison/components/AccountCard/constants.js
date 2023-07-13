import { accountTitles, accountNames } from "../../../../constants";
import { accountTypes } from "../../constants";

import { ReactComponent as Startups } from "../../../../assets/icons/startups_ic.svg";
import { ReactComponent as Businesses } from "../../../../assets/icons/growing_businesses_ic.svg";
import { ReactComponent as EstablishedBusinesses } from "../../../../assets/icons/established_businesses_ic.svg";

export const accountTypesDescription = [
  {
    name: "",
    Icon: "",
    title: "",
    description: [
      "Zero balance account",
      "Free remittances & preferential forex rates",
      "Free accounting \npackage & business insurance"
    ],
    buttonText: "",
    applyNowButton: ""
  },
  {
    name: accountTitles.starter,
    accountName: accountNames.starter,
    Icon: Startups,
    title: "For Startups \nand Entrepreneurs",
    description: [
      "Zero balance account",
      "Free remittances & preferential forex rates",
      "Free accounting \npackage & business insurance"
    ],
    buttonText: accountTypes.starter.name,
    applyNowButton: "Apply now"
  },
  {
    name: accountTitles.currentAccount,
    accountName: accountNames.currentAccount,
    Icon: Businesses,
    title: "For Growing Businesses",
    description: [
      "Low balance account",
      "Preferential transaction fees",
      "Dedicated Relationship Manager "
    ],
    buttonText: accountTypes.currentAccount.name,
    applyNowButton: "Apply now"
  },
  {
    name: accountTitles.elite,
    accountName: accountNames.elite,
    Icon: EstablishedBusinesses,
    title: "For Established Businesses",
    description: [
      "Select free services",
      "Host of lifestyle benefits",
      "Priority servicing & Dedicated Relationship Manager"
    ],
    buttonText: accountTypes.elite.name,
    applyNowButton: "Apply now"
  }
];
export const SECTION_INDEX = 2;
