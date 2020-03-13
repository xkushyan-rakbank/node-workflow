import React, { useState, forwardRef } from "react";

import { useStyles } from "./styled";

const ClosedChatScreen = ({ openChat, isMinimized, chatIcon }, ref) => {
  const classes = useStyles();
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  ref.current = { newMessagesCount, setNewMessagesCount };

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

export const ClosedChat = forwardRef(ClosedChatScreen);
