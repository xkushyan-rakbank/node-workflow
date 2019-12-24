import React, { Suspense, lazy, useCallback } from "react";
import cx from "classnames";
import chatIcon from "./../../assets/webchat/black.svg";
import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("./componets/WebChat"));

export const Chat = ({
  isOpened,
  isClosed,
  isMinimized,
  isExpanded,
  openWebChat,
  closeWebChat,
  minimizeWebChat,
  expandWebChat
}) => {
  const classes = useStyles();
  const toogleChat = isMinimized ? classes.mimimized : classes.expand;

  const minimizeChat = useCallback(() => minimizeWebChat());

  const openChat = useCallback(() => (isClosed ? openWebChat() : expandWebChat()));

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
