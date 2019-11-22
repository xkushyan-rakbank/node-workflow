import { connect } from "react-redux";
import { getInputValueById } from "../../../../../../store/selectors/input";
import { CompanyAnticipatedTransactionsComponent } from "./CompanyAnticipatedTransactions";

const mapStateToProps = state => ({
  annualFinancialTurnover: getInputValueById(state, "Okyc.annualFinTurnoverAmtInAED"),
  cashAmountInFigures: getInputValueById(state, "OkycAntTxnTotCashCr.amountInFigures"),
  notCashAmountInFigures: getInputValueById(state, "OkycAntTxnTotNonCashCr.amountInFigures"),
  maximumSingleCashAmount: getInputValueById(state, "OkycAntTxn.maxAmtSingleTxnCashAED"),
  maximumSingleNotCashAmount: getInputValueById(state, "OkycAntTxn.maxAmtSingleTxnNonCashAED")
});

export const CompanyAnticipatedTransactions = connect(mapStateToProps)(
  CompanyAnticipatedTransactionsComponent
);
