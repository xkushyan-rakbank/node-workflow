import React from "react";

import { Chat as ChatComponent } from "./Chat";
import { WebChatProvider } from "./contextStore";

const Chat = () => (
  <WebChatProvider>
    <ChatComponent />
  </WebChatProvider>
);

export default Chat;
