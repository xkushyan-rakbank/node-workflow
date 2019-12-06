export const APPLICATION_STATUS_SERVER_ERROR = "APPLICATION_STATUS_SERVER_ERROR";
export const APPLICATION_STATUS_SCREENING_RESULTS = "APPLICATION_STATUS_SCREENING_RESULTS";
export const APPLICATION_STATUS_RESET = "APPLICATION_STATUS_RESET";

export const applicationStatusServerError = () => {
  return { type: APPLICATION_STATUS_SERVER_ERROR };
};

export const applicationStatusReset = () => {
  return { type: APPLICATION_STATUS_RESET };
};

export const applicationStatusSetScreeningResults = payload => {
  return { type: APPLICATION_STATUS_SCREENING_RESULTS, payload };
};
