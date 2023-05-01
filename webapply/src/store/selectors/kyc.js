export const getKyc = state => state.kyc;
export const getTransactionId = state => getKyc(state).KycTransactionResponse.kycTransactionId;
