import { accountsNames } from "../../../../constants";
import startups_ic from "../../../../assets/icons/startups_ic.svg";
import businesses_ic from "../../../../assets/icons/growing_businesses_ic.svg";
import established_businesses_ic from "../../../../assets/icons/established_businesses_ic.svg";

export const accountTypesDescription = [
  {
    name: accountsNames.starter,
    icon: startups_ic,
    title: "For Startups and Entrepreneurs",
    description: [
      "Zero balance account",
      "Preferential transaction fees",
      "Dedicated Relationship Manager"
    ],
    buttonText: "RAKstarter"
  },
  {
    name: accountsNames.currentAccount,
    icon: businesses_ic,
    title: "For Growing Businesses",
    description: [
      "Low balance account",
      "Preferential transaction fees",
      "Dedicated Relationship Manager "
    ],
    buttonText: "Current Account"
  },
  {
    name: accountsNames.elite,
    icon: established_businesses_ic,
    title: "For Established Businesses",
    description: [
      "Free unlimited remittances",
      "Host of lifestyle benefits",
      "Dedicated Relationship Manager"
    ],
    buttonText: "RAKelite"
  }
];
export const SECTION_INDEX = 2;
