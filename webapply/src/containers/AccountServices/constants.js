import checkIcon from "../../assets/icons/loadingGreen.svg";
import crossIcon from "../../assets/icons/loadingRed.svg";
export const bankingBenefits = [
  {
    info: "Preferential USD Buy/Sell rates",
    rakValue_plus: "3.660/3.675*",
    rakValue_max: "3.660/3.675*"
  },
  {
    info: "5 free domestic non RAKBANK\nATM cash withdrawal monthly\n(switch charges)",
    rakValue_plus: { ic: crossIcon },
    rakValue_max: { ic: checkIcon }
  },
  {
    info: "4 Free domestic remittances per month",
    rakValue_plus: { ic: crossIcon },
    rakValue_max: { ic: checkIcon }
  },
  {
    info: "4 Free international remittances per month*",
    rakValue_plus: { ic: checkIcon },
    rakValue_max: { ic: checkIcon }
  }
];

export const lifestyleBenefits = [
  {
    info: "12 RAKvalue offers",
    rakValue_plus: { ic: checkIcon },
    rakValue_max: { ic: checkIcon }
  }
];

export const insuranceBenefits = [
  {
    info: "Business insurance from RAK INSURANCE",
    rakValue_plus: "Basic",
    rakValue_max: "Advanced"
  }
];

export const otherBenefits = [
  {
    info: "One stop solution to leverage business operations",
    rakValue_plus: "Basic",
    rakValue_max: "Advanced"
  }
];
