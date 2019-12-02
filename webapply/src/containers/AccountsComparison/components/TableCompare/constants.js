import { accountsNames } from "../../../../constants";
import checkIc from "../../../../assets/icons/check.svg";

export const accountsDataRows = [
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

export const accountTypes = {
  starter: {
    name: accountsNames.starter,
    position: 2
  },
  currentAccount: {
    name: accountsNames.currentAccount,
    position: 3
  },
  elite: {
    name: accountsNames.elite,
    position: 4
  }
};

export const sizes = {
  INITIAL_OFFSET: 395,
  SELECTED_ELEM_WIDTH: "190px",
  OFFSET: 5
};
