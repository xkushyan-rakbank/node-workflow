import { accountTitles, accountNames } from "../../../../constants";
import { accountTypes } from "../../constants";

import { ReactComponent as Startups } from "../../../../assets/icons/startups_ic.svg";
import { ReactComponent as Businesses } from "../../../../assets/icons/growing_businesses_ic.svg";
import { ReactComponent as EstablishedBusinesses } from "../../../../assets/icons/established_businesses_ic.svg";

export const accountTypesDescription = {
  info: {
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
  starter: {
    name: accountTitles.starter,
    accountName: accountNames.starter,
    Icon: Startups,
    title: "For start-ups and entrepreneurs",
    description: [
      "Zero balance account",
      "Free remittances & preferential forex rates",
      "Free accounting \npackage & business insurance"
    ],
    buttonText: accountTypes.starter.name,
    applyNowButton: "Apply now"
  },
  currentAccount: {
    name: accountTitles.currentAccount,
    accountName: accountNames.currentAccount,
    Icon: Businesses,
    title: "For growing businesses",
    description: [
      "Low balance account",
      "Preferential transaction fees",
      "Dedicated relationship Manager "
    ],
    buttonText: accountTypes.currentAccount.name,
    applyNowButton: "Apply now"
  },
  elite: {
    name: accountTitles.elite,
    accountName: accountNames.elite,
    Icon: EstablishedBusinesses,
    title: "For established businesses",
    description: [
      "Select free services",
      "Host of lifestyle benefits",
      "Priority servicing & Dedicated Relationship Manager"
    ],
    buttonText: accountTypes.elite.name,
    applyNowButton: "Apply now"
  }
};
export const SECTION_INDEX = 2;