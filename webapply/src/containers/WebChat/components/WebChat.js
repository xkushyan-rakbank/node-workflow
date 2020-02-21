import React from "react";
import styled from "styled-components";
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

const WebChat = ({ onClose, onMinimize, ...props }) => (
  <Container>
    <Chat onClose={onClose} onMinimize={onMinimize} {...props} />
  </Container>
);

export default WebChat;
