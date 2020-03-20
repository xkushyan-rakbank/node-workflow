/**
 * @param {Store} state
 * @return {login}
 */

export const checkLoginStatus = state => state.login.loginStatus;

export const getAgentName = state => state.login.loginResponse.agentName;
