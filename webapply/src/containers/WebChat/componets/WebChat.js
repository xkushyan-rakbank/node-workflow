import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Login } from "./Login";
import { Chat } from "./Chat";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 359px;
  min-height: 450px;
  border-radius: 8px;
  box-shadow: 0 2px 54px 0 rgba(0, 0, 0, 0.11);
  background-color: #fff;
`;

const WebChat = ({ onClose, onMinimize, ...props }) => {
  const [chatReady, setChatReady] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const onUserInfoSubmit = useCallback(({ message, subject }) => {
    setMessage(message);
    setSubject(subject.label);
    setChatReady(true);
  }, []);

  return (
    <Container>
      {chatReady ? (
        <Chat
          onPressBack={() => setChatReady(false)}
          message={message}
          subject={subject}
          onClose={onClose}
          onMinimize={onMinimize}
          {...props}
        />
      ) : (
        <Login onSubmit={onUserInfoSubmit} {...props} onClose={onClose} onMinimize={onMinimize} />
      )}
    </Container>
  );
};

export default WebChat;
