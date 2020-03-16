import React, { useState, forwardRef, useCallback } from "react";

import chatIcon from "../../../assets/webchat/black.svg";
import { useStyles } from "../styled";

const ClosedChatScreen = ({ openChat, isMinimized }, ref) => {
  const classes = useStyles();
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const resetCounter = useCallback(() => setNewMessagesCount(0), [setNewMessagesCount]);
  const incCounter = useCallback(() => setNewMessagesCount(newMessagesCount + 1), [
    setNewMessagesCount,
    newMessagesCount
  ]);

  ref.current = { incCounter, resetCounter };

  return (
    <div className={classes.chat}>
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

export const ClosedChat = forwardRef(ClosedChatScreen);
