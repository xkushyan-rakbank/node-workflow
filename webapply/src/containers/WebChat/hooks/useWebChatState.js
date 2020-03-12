import { useReducer } from "react";

const initialState = {
  isOpened: false,
  isClosed: true,
  isMinimized: false,
  isExpanded: false
};

const webChatReducer = (state, { type }) => {
  switch (type) {
    case "open":
      return {
        ...state,
        isOpened: true,
        isClosed: false,
        isMinimized: false
      };
    case "close":
      return {
        ...state,
        isOpened: false,
        isClosed: true
      };
    case "minimize":
      return {
        ...state,
        isOpened: true,
        isMinimized: true,
        isClosed: false,
        isExpanded: false
      };
    case "expand":
      return { ...state, isExpanded: true, isMinimized: false };
    default:
      return state;
  }
};

export const useWebChatState = () => useReducer(webChatReducer, initialState);
