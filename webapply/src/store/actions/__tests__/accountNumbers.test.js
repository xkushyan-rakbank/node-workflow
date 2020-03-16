import { UPDATE_ACCOUNT_NUMBERS, updateAccountNumbers } from "../accountNumbers";

const accountInfoPayload = [
  {
    branchId: "",
    accountType: "",
    accountSubType: "",
    accountNo: "",
    accountCurrencies: [],
    accountCurrency: "AED",
    accountPurpose: "",
    debitCardApplied: false,
    chequeBookApplied: false,
    eStatements: true,
    mailStatements: false,
    receiveInterest: false,
    deliverByCourier: false
  }
];

const expectedAction = {
  type: UPDATE_ACCOUNT_NUMBERS,
  payload: accountInfoPayload
};

describe("update account numbers action", () => {
  it("should update account numbers", () => {
    expect(updateAccountNumbers(accountInfoPayload)).toEqual(expectedAction);
  });
});
