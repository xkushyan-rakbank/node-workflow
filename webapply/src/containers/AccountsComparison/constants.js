import checkIcon from "../../assets/icons/loadingGreen.svg";
import crossIcon from "../../assets/icons/loadingRed.svg";
import { accountNames, accountTitles } from "../../constants";
export const INITIAL_SECTION_POSITION = 0;

export const RAK_STARTER_CONFIRM_MESSAGE =
  "Please note that RAKstarter account is only available for business with a length of business less than a year. Would you like to learn more about RAKstarter account?";

export const RAK_SAVE_CLOSE_CONFIRM_MESSAGE =
  "Are you sure you want to save the changes and exit the application?";
export const accountsDataRows = [
  {
    info: ["Monthly Average ", "Credit Balance"],
    starter: { text: "Zero" },
    currentAccount: { text: "AED 25,000", info: "or equivalent at entity level" },
    elite: { text: "AED 500,000", info: "or equivalent at entity level" }
  },
  {
    info: ["Monthly charges for not ", "maintaining average balance"],
    starter: { text: "Zero" },
    currentAccount: { text: "AED 50" },
    elite: { text: "AED 250" }
  },
  {
    info: ["Monthly Maintenance fees ", ""],
    starter: { text: "AED 99" },
    currentAccount: { text: "AED 50" },
    elite: { text: "Zero" }
  },
  {
    info: ["Monthly Digital ", "Banking fees"],
    starter: { text: "Zero" },
    currentAccount: { text: "AED 50" },
    elite: { text: "AED 50" }
  },
  {
    info: ["Free Teller Transactions"]
    //starter: { text: { ic: crossIcon } },
    //currentAccount: { text: { ic: crossIcon } },
    //elite: { ic: checkIc }
  },
  {
    //info: ["Lifestyle benefits"],
    //starter: { ic: checkIc },
    //currentAccount: { text: { ic: crossIcon } },
    //elite: { ic: checkIc }
  },
  {
    info: ["RAKvalue package ", "(PLUS & MAX)"],
    starter: { text: "Mandatory", info: "(PLUS - AED 49)" },
    currentAccount: { text: "Optional" },
    elite: { text: "Optional" }
  }
];

export const featuresDataList = [
  {
    info: "Lifestyle benefits",
    starter: { ic: checkIcon },
    currentAccount: { ic: crossIcon },
    elite: { ic: checkIcon }
  },
  {
    info: "Account currency",
    starter: "AED",
    currentAccount: "AED",
    elite: "AED"
  },
  {
    info: "Foreign currency",
    starter: { ic: checkIcon },
    currentAccount: { ic: checkIcon },
    elite: { ic: checkIcon }
  }
];

export const feesChargesDataRows = [
  {
    info: "Monthly average credit balance",
    starter: "Zero",
    currentAccount: "AED 25,000\n or equivalent at entity level",
    elite: "AED 500,000\n  or equivalent at entity level"
  },
  {
    info: "Fall back fee (if monthly average credit balance is not maintained)",
    starter: "Zero",
    currentAccount: "AED 50",
    elite: "AED 262.5"
  },
  {
    info: "Monthly maintenance fees*",
    starter: "AED 99",
    currentAccount: "AED 50",
    elite: "Zero"
  },
  {
    info: "Monthly digital banking fees*",
    starter: "Zero",
    currentAccount: "AED 50",
    elite: "AED 50"
  }
];
export const perksDataRows = [
  {
    info: "Zero balance account",
    starter: { ic: checkIcon },
    currentAccount: { ic: crossIcon },
    elite: { ic: crossIcon }
  },
  {
    info: "Free remittances",
    starter: { ic: checkIcon },
    currentAccount: { ic: crossIcon },
    elite: { ic: checkIcon }
  },
  {
    info: "Preferential FX rates",
    starter: { ic: checkIcon },
    currentAccount: { ic: crossIcon },
    elite: { ic: checkIcon }
  },
  {
    info: "Free accounting packages and business insurance",
    starter: { ic: checkIcon },
    currentAccount: { ic: crossIcon },
    elite: { ic: crossIcon }
  },
  {
    info: "Dedicated Relationship manager",
    starter: { ic: crossIcon },
    currentAccount: { ic: checkIcon },
    elite: { ic: checkIcon }
  },
  {
    info: "Priority services across branches",
    starter: { ic: crossIcon },
    currentAccount: { ic: crossIcon },
    elite: { ic: checkIcon }
  }
];

export const accountTypes = {
  starter: {
    id: "starter",
    accountName: accountNames.starter,
    name: accountTitles.starter,
    position: 2
  },
  currentAccount: {
    id: "currentAccount",
    accountName: accountNames.currentAccount,
    name: accountNames.currentAccount,
    position: 3
  },
  elite: {
    id: "elite",
    accountName: accountNames.elite,
    name: accountTitles.elite,
    position: 4
  }
};

export const sizes = {
  INITIAL_OFFSET: 395,
  SELECTED_ELEM_WIDTH: "190px",
  OFFSET: 5
};
