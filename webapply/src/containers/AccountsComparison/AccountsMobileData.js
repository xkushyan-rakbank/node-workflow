import React from "react";
import { ReactComponent as CheckIc } from "../../assets/icons/check.svg";

const CHARGE_FEE_AED25K = "AED 25,000 or equivalent at entity level";
const CHARGE_FEE_AED500K = "AED 500,000  or equivalent at entity level";
const AED50 = "AED 50";
const AED99 = "AED 99";
const AED0 = "AED 0";
const DASH = "-";

const ACCOUNT_TYPE = {
  CURRENT_ACCOUNT: "currentAccount",
  STARTER: "starter",
  ELITE: "elite"
};

function defaultFeatureType(type) {
  const defaultType = ["starter", "currentAccount"];
  return type === "" ? defaultType : type;
}

export const feesChargesDataMobile = type => {
  const selectedType = defaultFeatureType(type);

  const feeValues = {
    [ACCOUNT_TYPE.STARTER]: {
      freeTellerTransactions: AED0,
      monthlyFees: AED0,
      maintainenceFee: AED99,
      digitalBankingFees: AED0
    },
    [ACCOUNT_TYPE.CURRENT_ACCOUNT]: {
      freeTellerTransactions: CHARGE_FEE_AED25K,
      monthlyFees: AED50,
      maintainenceFee: AED50,
      digitalBankingFees: AED50
    },
    [ACCOUNT_TYPE.ELITE]: {
      freeTellerTransactions: CHARGE_FEE_AED500K,
      monthlyFees: AED50,
      maintainenceFee: AED0,
      digitalBankingFees: AED50
    }
  };

  const getFeeValue = (type, feeType) => feeValues[type]?.[feeType] || "";

  const freeTellerTransactions = type => getFeeValue(type, "freeTellerTransactions");
  const monthlyFees = type => getFeeValue(type, "monthlyFees");
  const maintainenceFee = type => getFeeValue(type, "maintainenceFee");
  const digitalBankingFees = type => getFeeValue(type, "digitalBankingFees");

  const chargesRows = [
    {
      name: "Free teller transactions",
      cellOne: freeTellerTransactions(selectedType[0]),
      cellTwo: freeTellerTransactions(selectedType[1])
    },
    {
      name: "Monthly fee (if average zero balance is not maintained)",
      cellOne: monthlyFees(selectedType[0]),
      cellTwo: monthlyFees(selectedType[1])
    },
    {
      name: "Monthly maintenance fees",
      cellOne: maintainenceFee(selectedType[0]),
      cellTwo: maintainenceFee(selectedType[1])
    },
    {
      name: "Monthly digital banking fees",
      cellOne: digitalBankingFees(selectedType[0]),
      cellTwo: digitalBankingFees(selectedType[1])
    }
  ];

  return chargesRows;
};

export const featuresDataMobile = type => {
  const selectedType = defaultFeatureType(type);

  const featureValues = {
    [ACCOUNT_TYPE.STARTER]: {
      freeTellerTransaction: DASH,
      lifeStyleBenefits: <CheckIc />
    },
    [ACCOUNT_TYPE.CURRENT_ACCOUNT]: {
      freeTellerTransaction: DASH,
      lifeStyleBenefits: DASH
    },
    [ACCOUNT_TYPE.ELITE]: {
      freeTellerTransaction: <CheckIc />,
      lifeStyleBenefits: <CheckIc />
    }
  };

  const getFeatureValue = (type, featureType) => featureValues[type]?.[featureType] || "";

  const freeTellerTransaction = type => getFeatureValue(type, "freeTellerTransaction");
  const lifeStyleBenefits = type => getFeatureValue(type, "lifeStyleBenefits");

  const featuresRows = [
    {
      name: "Free teller transactions",
      cellOne: freeTellerTransaction(selectedType[0]),
      cellTwo: freeTellerTransaction(selectedType[1])
    },
    {
      name: "Lifestyle benefits",
      cellOne: lifeStyleBenefits(selectedType[0]),
      cellTwo: lifeStyleBenefits(selectedType[1])
    },
    {
      name: "Account currency",
      cellOne: "AED only",
      cellTwo: "AED only"
    }
  ];

  return featuresRows;
};

export const perksDataMobile = type => {
  const selectedType = defaultFeatureType(type);

  const feeValues = {
    [ACCOUNT_TYPE.STARTER]: {
      monthlyCreditBalance: AED0,
      monthlyFees: <CheckIc />,
      maintainenceFees: <CheckIc />,
      dedicatedManager: <CheckIc />,
      freeServices: DASH,
      vipService: DASH,
      lifeStylePerks: DASH,
      lowBalanceAccount: <CheckIc />
    },
    [ACCOUNT_TYPE.CURRENT_ACCOUNT]: {
      monthlyCreditBalance: CHARGE_FEE_AED25K,
      monthlyFees: DASH,
      maintainenceFees: DASH,
      dedicatedManager: DASH,
      freeServices: DASH,
      vipService: DASH,
      lifeStylePerks: DASH,
      lowBalanceAccount: <CheckIc />
    },
    [ACCOUNT_TYPE.ELITE]: {
      monthlyCreditBalance: "3",
      monthlyFees: DASH,
      maintainenceFees: DASH,
      dedicatedManager: DASH,
      freeServices: <CheckIc />,
      vipService: <CheckIc />,
      lifeStylePerks: <CheckIc />,
      lowBalanceAccount: <CheckIc />
    }
  };

  const getPerkValue = (type, perkType) => feeValues[type]?.[perkType] || "";

  const monthlyCreditBalance = type => getPerkValue(type, "monthlyCreditBalance");
  const monthlyFees = type => getPerkValue(type, "monthlyFees");
  const maintainenceFees = type => getPerkValue(type, "maintainenceFees");
  const dedicatedManager = type => getPerkValue(type, "dedicatedManager");
  const freeServices = type => getPerkValue(type, "freeServices");
  const vipService = type => getPerkValue(type, "vipService");
  const lifeStylePerks = type => getPerkValue(type, "lifeStylePerks");
  const lowBalanceAccount = type => getPerkValue(type, "lowBalanceAccount");

  const perksRows = [
    {
      name: "Monthly average credit balance",
      cellOne: monthlyCreditBalance(selectedType[0]),
      cellTwo: monthlyCreditBalance(selectedType[1])
    },
    {
      name: "Monthly fee (if average zero balance is not maintained)",
      cellOne: monthlyFees(selectedType[0]),
      cellTwo: monthlyFees(selectedType[1])
    },
    {
      name: "Monthly maintenance fees",
      cellOne: maintainenceFees(selectedType[0]),
      cellTwo: maintainenceFees(selectedType[1])
    },
    {
      name: "Dedicated Relationship Manager",
      cellOne: dedicatedManager(selectedType[0]),
      cellTwo: dedicatedManager(selectedType[1])
    },
    {
      name: "Variety of free services",
      cellOne: freeServices(selectedType[0]),
      cellTwo: freeServices(selectedType[1])
    },
    {
      name: "Dedicated Relationship Manager",
      cellOne: dedicatedManager(selectedType[0]),
      cellTwo: dedicatedManager(selectedType[1])
    },
    {
      name: "Priority service (VIP)",
      cellOne: vipService(selectedType[0]),
      cellTwo: vipService(selectedType[1])
    },
    {
      name: "Low balance account",
      cellOne: lowBalanceAccount(selectedType[0]),
      cellTwo: lowBalanceAccount(selectedType[1])
    },
    {
      name: "Lifestyle perks",
      cellOne: lifeStylePerks(selectedType[0]),
      cellTwo: lifeStylePerks(selectedType[1])
    }
  ];

  return perksRows;
};
