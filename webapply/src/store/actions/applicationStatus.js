export const APPLICATION_STATUS_PROCEED = "APPLICATION_STATUS_PROCEED";
export const APPLICATION_STATUS_STOP = "APPLICATION_STATUS_STOP";
export const APPLICATION_STATUS_SERVER_ERROR = "APPLICATION_STATUS_SERVER_ERROR";

export const applicationStatusProceed = () => {
  return { type: APPLICATION_STATUS_PROCEED };
};

export const applicationStatusStop = screeningResults => {
  return { type: APPLICATION_STATUS_STOP, screeningResults };
};

export const applicationStatusServerError = () => {
  return { type: APPLICATION_STATUS_SERVER_ERROR };
};
