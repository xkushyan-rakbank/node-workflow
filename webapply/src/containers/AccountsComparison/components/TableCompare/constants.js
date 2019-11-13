import { accountsNames } from "../../../../constants/index";
import checkIc from "../../../../assets/icons/check.svg";

export const shortNames = {
  starter: {
    name: accountsNames.starter,
    ref: "RAKstarter"
  },
  currentAccount: {
    name: accountsNames.currentAccount,
    ref: "CurrentAccount"
  },
  elite: {
    name: accountsNames.elite,
    ref: "RAKElite"
  }
};

export const mockDataRows = [
  {
    info: "Monthly Average Credit Balance",
    starter: { text: "Zero" },
    currentAccount: { text: "AED 25,000", info: "or equivalent at entity level" },
    elite: { text: "AED 500,000", info: "or equivalent at entity level" }
  },
  {
    info: "Monthly charges for not maintaining average balance",
    starter: { text: "Zero" },
    currentAccount: { text: "AED 50" },
    elite: { text: "AED 250" }
  },
  {
    info: "Monthly Maintenance fees",
    starter: { text: "AED 99" },
    currentAccount: { text: "AED 50" },
    elite: { text: "Zero" }
  },
  {
    info: "Free Teller Transactions",
    starter: { text: "-" },
    currentAccount: { text: "-" },
    elite: { ic: checkIc }
  },
  {
    info: "Lifestyle benefits",
    starter: { text: "-" },
    currentAccount: { text: "-" },
    elite: { ic: checkIc }
  },
  {
    info: "RAKvalue Package (PLUS and MAX)",
    starter: { text: "Mandatory", info: "(PLUS - AED 49)" },
    currentAccount: { text: "Optional" },
    elite: { text: "Optional" }
  }
];

export const initialValue = {
  offset: 395,
  selectedAccountContainerWidth: "190px"
};
