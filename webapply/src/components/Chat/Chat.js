import React, { useState, Suspense, lazy, useCallback } from "react";
import chatIcon from "./../../assets/icons/chat.png";
import { useStyles } from "./styled";

const WebChatComponent = lazy(() => import("../../containers/WebChat"));

export const Chat = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const openWebChat = useCallback(() => setOpen(true));

  return (
    <div className={classes.chat}>
      {isOpen ? (
        <Suspense fallback={<div>Loading...</div>}>
          <WebChatComponent />
        </Suspense>
      ) : (
        <div className={classes.chatInner} onClick={openWebChat}>
          <div>
            <span>
              <img src={chatIcon} alt="chat" />
            </span>
          </div>
          <div className="hide-on-mobile"> Chat with Us</div>
        </div>
      )}
    </div>
  );
};
