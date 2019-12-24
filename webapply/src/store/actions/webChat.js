export const OPEN_WEB_CHAT = "OPEN_WEB_CHAT";
export const CLOSE_WEB_CHAT = "CLOSE_WEB_CHAT";
export const MINIMIZE_WEB_CHAT = "MINIMIZE_WEB_CHAT";
export const EXPAND_WEB_CHAT = "EXPAND_WEB_CHAT";

export const openWebChat = () => {
  return { type: OPEN_WEB_CHAT };
};

export const closeWebChat = () => {
  return { type: CLOSE_WEB_CHAT };
};

export const minimizeWebChat = () => {
  return { type: MINIMIZE_WEB_CHAT };
};

export const expandWebChat = () => {
  return { type: EXPAND_WEB_CHAT };
};
