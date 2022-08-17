export const checkLoginStatus = state => state.login.loginStatus;

export const getLoginResponse = state => state.login.loginResponse || {};

export const getAgentName = state => getLoginResponse(state).agentName;

export const getRoCode = state => getLoginResponse(state).roCode || "";
export const getAgentId = state => getLoginResponse(state).agentId || "";
