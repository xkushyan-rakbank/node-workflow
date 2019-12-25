import React, { Suspense, lazy, useCallback, useReducer } from "react";
import cx from "classnames";
import chatIcon from "./../../assets/webchat/black.svg";
import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("./componets/WebChat"));

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

export const Chat = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(webChatReducer, initialState);
  const { isOpened, isClosed, isMinimized } = state;
  const toogleChat = isMinimized ? classes.mimimized : classes.expand;

  const openChat = useCallback(() =>
    isClosed ? dispatch({ type: "open" }) : dispatch({ type: "expand" })
  );

  const closeWebChat = useCallback(() => dispatch({ type: "close" }));

  const minimizeChat = useCallback(() => dispatch({ type: "minimize" }));

  return (
    <>
      {(isClosed || isMinimized) && (
        <div className={classes.chat}>
          <div className={classes.chatInner} onClick={openChat}>
            <div>
              <span>
                {isMinimized && (
                  <div className={classes.messagesCount}>
                    <p>0</p>
                  </div>
                )}
                <img src={chatIcon} alt="chat" />
              </span>
            </div>
            <div className="hide-on-mobile"> Chat with Us</div>
          </div>
        </div>
      )}

      {isOpened && (
        <div className={cx(classes.chatWrapper, toogleChat)}>
          <Suspense fallback={<div>Loading...</div>}>
            <WebChatComponent onClose={closeWebChat} onMinimize={minimizeChat} />
          </Suspense>
        </div>
      )}
    </>
  );
};
