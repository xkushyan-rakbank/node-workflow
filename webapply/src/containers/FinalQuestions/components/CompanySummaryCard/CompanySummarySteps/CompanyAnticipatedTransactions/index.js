import { connect } from "react-redux";
import { CompanyAnticipatedTransactionsComponent } from "./CompanyAnticipatedTransactions";
import { getOrgKYCDetails } from "../../../../../../store/selectors/appConfig";
import get from "lodash/get";
import { prospect } from "../../../../../../constants/config";

const mapStateToProps = state => ({
  annualFinTurnoverAmtInAED: get(
    getOrgKYCDetails(state),
    "annualFinTurnoverAmtInAED",
    prospect.orgKYCDetails.annualFinTurnoverAmtInAED
  ),
  totalMonthlyCashAmountInFigures: get(
    getOrgKYCDetails(state),
    "anticipatedTransactionsDetails.totalMonthlyCashCreditsAED.amountInFigures",
    prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyCashCreditsAED.amountInFigures
  ),
  totalMonthlyNonCashAmountInFigures: get(
    getOrgKYCDetails(state),
    "anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED.amountInFigures",
    prospect.orgKYCDetails.anticipatedTransactionsDetails.totalMonthlyNonCashCreditsAED
      .amountInFigures
  ),
  maxAmtSingleTxnCashAED: get(
    getOrgKYCDetails(state),
    "anticipatedTransactionsDetails.maxAmtSingleTxnCashAED",
    prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnCashAED
  ),
  maxAmtSingleTxnNonCashAED: get(
    getOrgKYCDetails(state),
    "anticipatedTransactionsDetails.maxAmtSingleTxnNonCashAED",
    prospect.orgKYCDetails.anticipatedTransactionsDetails.maxAmtSingleTxnNonCashAED
  )
});

export const CompanyAnticipatedTransactions = connect(mapStateToProps)(
  CompanyAnticipatedTransactionsComponent
);
