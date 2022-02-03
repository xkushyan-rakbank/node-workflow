import { accountNames, accountTitles } from "../../../../constants";
import checkIc from "../../../../assets/icons/check.svg";

export const RAK_STARTER_CONFIRM_MESSAGE =
  "Please note that RAKstarter account is only available for business with a length of business less than a year. Would you like to learn more about RAKstarter account?";

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
    info: ["Free Teller Transactions"],
    starter: { text: "-" },
    currentAccount: { text: "-" },
    elite: { ic: checkIc }
  },
  {
    info: ["Lifestyle benefits"],
    starter: { ic: checkIc },
    currentAccount: { text: "-" },
    elite: { ic: checkIc }
  },
  {
    info: ["RAKvalue package ", "(PLUS & MAX)"],
    starter: { text: "Mandatory", info: "(PLUS - AED 49)" },
    currentAccount: { text: "Optional" },
    elite: { text: "Optional" }
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
