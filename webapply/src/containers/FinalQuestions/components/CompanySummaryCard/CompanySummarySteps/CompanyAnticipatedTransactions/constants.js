export const COMPANY_CURRENCY = "AED";
export const YEAR_MONTH_COUNT = 12;
export const ANNUAL_TURNOVER_MAX_LENGTH = 16;
export const PLACEHOLDER = "9999999999";

export const linkedFields = {
  annualFinTurnoverAmtInAED: {
    name: "annualFinTurnoverAmtInAED",
    path: "prospect.orgKYCDetails.annualFinTurnoverAmtInAED",
    isFillByUser: true
  },
  totalMonthlyCashAmountInFigures: {
    name: "totalMonthlyCashAmountInFigures",
    path:
      "prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyCashCreditsAED.amountInFigures",
    isFillByUser: true
  },
  totalMonthlyNonCashAmountInFigures: {
    name: "totalMonthlyNonCashAmountInFigures",
    path:
      "prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures",
    isFillByUser: true
  },
  totalMonthlyCashAmountInPercent: {
    name: "totalMonthlyCashAmountInPercent",
    path:
      "prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyCashCreditsAED.inPercent",
    isFillByUser: false
  },
  totalMonthlyNonCashAmountInPercent: {
    name: "totalMonthlyNonCashAmountInPercent",
    path:
      "prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.inPercent",
    isFillByUser: false
  }
};
