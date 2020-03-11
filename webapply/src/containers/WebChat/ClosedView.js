import React, { useContext } from "react";

import chatIcon from "./../../assets/webchat/black.svg";
import { WebChatContext } from "./contextStore";
import { useStyles } from "./styled";

export const ClosedView = () => {
  const classes = useStyles();
  const { isMinimized, newMessagesCount, openChat } = useContext(WebChatContext);

  return (
    <div key="link" className={classes.chat}>
      <div className={classes.chatInner} onClick={openChat}>
        <div>
          <span>
            {isMinimized && (
              <div className={classes.messagesCount}>
                <p>{newMessagesCount}</p>
              </div>
            )}
            <img src={chatIcon} alt="chat" />
          </span>
        </div>
        <div className="hide-on-mobile small-menu-hide"> Chat with Us</div>
      </div>
    </div>
  );
};
