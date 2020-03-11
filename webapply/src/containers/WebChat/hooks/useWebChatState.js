import { useReducer } from "react";

const initialState = {
  isOpened: false,
  isClosed: true,
  isMinimized: false,
  isExpanded: false,
  newMessagesCount: 0
};

const webChatReducer = (state, { type }) => {
  switch (type) {
    case "open":
      return {
        ...state,
        isOpened: true,
        isClosed: false,
        isMinimized: false,
        newMessagesCount: 0
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
        isExpanded: false,
        newMessagesCount: 0
      };
    case "expand":
      return { ...state, isExpanded: true, isMinimized: false };
    case "addNewMessage":
      return { ...state, newMessagesCount: state.newMessagesCount + 1 };
    default:
      return state;
  }
};

export const useWebChatState = () => useReducer(webChatReducer, initialState);
