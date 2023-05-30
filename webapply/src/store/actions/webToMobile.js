export const SYNC_SESSION = "SYNC_SESSION";
export const CLEAR_SESSION = "CLEAR_SESSION";
export const SYNC_SESSION_DATA = "SYNC_SESSION_DATA";

//scheduler action types
export const START_SCHEDULER = "START_SCHEDULER";
export const STOP_SCHEDULER = "STOP_SCHEDULER";

export const createSyncSession = payload => {
  return { type: SYNC_SESSION, payload };
};

export const setSessionData = payload => {
  return { type: SYNC_SESSION_DATA, payload };
};

export const startScheduler = payload => ({ type: START_SCHEDULER, payload });
export const stopScheduler = payload => ({ type: STOP_SCHEDULER, payload });
