/**
 * @param {Store} state
 * @return {login}
 */
export const getLoginSelector = state => state.login;

export const checkLoginStatus = state => state.login.loginStatus;

export const getAgentName = state => state.appConfig.login.userName;
