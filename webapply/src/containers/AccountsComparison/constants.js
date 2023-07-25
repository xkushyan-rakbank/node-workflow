import checkIc from "../../assets/icons/check.svg";
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
    //starter: { text: "-" },
    //currentAccount: { text: "-" },
    //elite: { ic: checkIc }
  },
  {
    //info: ["Lifestyle benefits"],
    //starter: { ic: checkIc },
    //currentAccount: { text: "-" },
    //elite: { ic: checkIc }
  },
  {
    info: ["RAKvalue package ", "(PLUS & MAX)"],
    starter: { text: "Mandatory", info: "(PLUS - AED 49)" },
    currentAccount: { text: "Optional" },
    elite: { text: "Optional" }
  }
];

export const featuresDataRows = [
  {
    name: "Free teller transactions",
    cellOne: "-",
    cellTwo: "-",
    cellThree: { ic: checkIc }
  },
  {
    name: "Lifestyle benefits",
    cellOne: { ic: checkIc },
    cellTwo: "-",
    cellThree: { ic: checkIc }
  },
  {
    name: "Account currency",
    cellOne: "AED only",
    cellTwo: "AED only",
    cellThree: "AED only"
  }
];

export const feesChargesDataRows = [
  {
    name: "Free teller transactions",
    cellOne: "zero",
    cellTwo: "AED 25,000 or equivalent at entity level",
    cellThree: "AED 500,000  or equivalent at entity level"
  },
  {
    name: "Monthly fee (if average zero balance is not maintained)",
    cellOne: "zero",
    cellTwo: "AED 50",
    cellThree: "AED 50"
  },
  {
    name: "Monthly maintenance fees",
    cellOne: "AED 99",
    cellTwo: "AED 50",
    cellThree: "zero"
  },
  {
    name: "Monthly digital banking fees",
    cellOne: "zero",
    cellTwo: "AED 50",
    cellThree: "AED 50"
  }
];
export const perksDataRows = [
  {
    name: "Monthly average credit balance",
    cellOne: "zero",
    cellTwo: "AED 25,000 or equivalent at entity level",
    cellThree: "3"
  },
  {
    name: "Monthly fee (if average zero balance is not maintained)",
    cellOne: { ic: checkIc },
    cellTwo: "-",
    cellThree: "-"
  },
  {
    name: "Monthly maintenance fees",
    cellOne: { ic: checkIc },
    cellTwo: "-",
    cellThree: "-"
  },
  {
    name: "Dedicated Relationship Manager",
    cellOne: { ic: checkIc },
    cellTwo: "-",
    cellThree: "-"
  },
  {
    name: "Variety of free services",
    cellOne: "-",
    cellTwo: "-",
    cellThree: { ic: checkIc }
  },
  {
    name: "Dedicated Relationship Manager",
    cellOne: "-",
    cellTwo: { ic: checkIc },
    cellThree: { ic: checkIc }
  },
  {
    name: "Priority service (VIP)",
    cellOne: "-",
    cellTwo: "-",
    cellThree: { ic: checkIc }
  },
  {
    name: "Low balance account",
    cellOne: { ic: checkIc },
    cellTwo: { ic: checkIc },
    cellThree: { ic: checkIc }
  },
  {
    name: "Lifestyle perks",
    cellOne: "-",
    cellTwo: "-",
    cellThree: { ic: checkIc }
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
