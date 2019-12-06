export const APPLICATION_STATUS_SERVER_ERROR = "APPLICATION_STATUS_SERVER_ERROR";
export const APPLICATION_STATUS_OVERALL_STOP = "APPLICATION_STATUS_OVERALL_STOP";
export const APPLICATION_STATUS_RESET = "APPLICATION_STATUS_RESET";

export const applicationStatusServerError = () => {
  return { type: APPLICATION_STATUS_SERVER_ERROR };
};

export const applicationStatusReset = () => {
  return { type: APPLICATION_STATUS_RESET };
};

export const applicationStatusOverallStop = () => {
  return { type: APPLICATION_STATUS_OVERALL_STOP };
};
