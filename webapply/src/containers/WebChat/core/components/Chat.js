import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MessagesList } from "./elements/MessagesList";
import { SendMessageInput } from "./elements/SendMessageInput";
import { Header } from "./elements/Header";

import { GenesysChat } from "../utils/GenesysChat";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 359px;
  min-height: 450px;
  border-radius: 8px;
  box-shadow: 0 2px 54px 0 rgba(0, 0, 0, 0.11);
  background-color: #fff;
`;

const TypingLabel = styled.div`
  font-size: 12px;
  margin: 8px 16px;
  color: #c6c6cc;
`;

const LoadingLabel = styled.div`
  font-size: 16px;
  margin: 8px 16px;
  color: #9c9c9c;
`;

function Chat({
  InitiatedCustomerName = "",
  InitiatedCustomerMobile = "",
  EmailAddress = "",
  isAuth,
  onClose,
  onMinimize,
  onNewMessageReceive
}) {
  const [messages, setMessages] = useState([]);
  const [agentTyping, setAgentTyping] = useState(false);
  const [agentLeft, setAgentLeft] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const agentTypingHandler = useCallback(
    flag => {
      setAgentTyping(flag);
    },
    [setAgentTyping]
  );

  const agentLeftHandler = useCallback(
    flag => {
      setAgentLeft(flag);
    },
    [setAgentLeft]
  );

  const handleNewMessageArrival = useCallback(
    messages => {
      setMessages(messages);
      onNewMessageReceive(messages);
    },
    [setMessages, onNewMessageReceive]
  );

  useEffect(() => {
    const chatInstance = GenesysChat.getInstance();

    chatInstance
      .initChat({
        InitiatedCustomerName,
        InitiatedCustomerMobile,
        EmailAddress,
        isAuth
      })
      .finally(() => {
        setIsLoading(false);
      });
    chatInstance.messagesCallback = handleNewMessageArrival;
    chatInstance.setOnTypingEventsHandler(agentTypingHandler);
    chatInstance.setOnAgentLeftEventHandler(agentLeftHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    GenesysChat.getInstance().triggerDisconnectEvent();
    onClose();
  }, [onClose]);

  return (
    <Container>
      <Header onClose={handleClose} onMinimize={onMinimize} />
      {isLoading ? (
        <LoadingLabel>Loading...</LoadingLabel>
      ) : (
        <Body>
          <MessagesList data={messages} />
          {agentTyping && <TypingLabel>Agent is typing...</TypingLabel>}
          {agentLeft && <TypingLabel>Agent left chat</TypingLabel>}
          <SendMessageInput placeholder="Type Message" chatInstance={GenesysChat} />
        </Body>
      )}
    </Container>
  );
}

Chat.propTypes = {
  InitiatedCustomerName: PropTypes.string,
  InitiatedCustomerMobile: PropTypes.string,
  EmailAddress: PropTypes.string,
  isAuth: PropTypes.bool,
  onClose: PropTypes.func,
  onMinimize: PropTypes.func
};

export default React.memo(Chat);