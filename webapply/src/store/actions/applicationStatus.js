export const APPLICATION_STATUS_PROCEED = "APPLICATION_STATUS_PROCEED";
export const APPLICATION_STATUS_STOP = "APPLICATION_STATUS_STOP";

export const applicationStatusProceed = () => {
  return { type: APPLICATION_STATUS_PROCEED };
};

export const applicationStatusStop = screeningResults => {
  return { type: APPLICATION_STATUS_STOP, screeningResults };
};
