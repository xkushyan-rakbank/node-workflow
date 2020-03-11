import React, { useReducer, createContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const WebChatContext = createContext({});

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

const WebChatProvider = ({ children }) => {
  const [{ isOpened, isClosed, isMinimized, newMessagesCount }, dispatch] = useReducer(
    webChatReducer,
    initialState
  );

  const openChat = useCallback(() => {
    dispatch({ type: isClosed ? "open" : "expand" });
  }, [isClosed, dispatch]);
  const closeWebChat = useCallback(() => dispatch({ type: "close" }), [dispatch]);
  const minimizeChat = useCallback(() => dispatch({ type: "minimize" }), [dispatch]);
  const handleReceiveNewMessage = useCallback(() => dispatch({ type: "addNewMessage" }), [
    dispatch
  ]);

  const contextValue = useMemo(
    () => ({
      openChat,
      closeWebChat,
      minimizeChat,
      handleReceiveNewMessage,
      isOpened,
      isClosed,
      isMinimized,
      newMessagesCount
    }),
    [
      openChat,
      closeWebChat,
      minimizeChat,
      handleReceiveNewMessage,
      isOpened,
      isClosed,
      isMinimized,
      newMessagesCount
    ]
  );

  return <WebChatContext.Provider value={contextValue}>{children}</WebChatContext.Provider>;
};

WebChatProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useWebChatState = () => useReducer(webChatReducer, initialState);

export { WebChatContext, WebChatProvider };
