import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MessagesList } from "./elements/MessagesList";
import { SendMessageInput } from "./elements/SendMessageInput";
import { GenesysChat } from "../utils/GenesysChat";
import { Header } from "./elements/Header";

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

class Chat extends PureComponent {
  state = {
    messages: [],
    agentTyping: false,
    agentLeft: false,
    isReverify: false
  };

  get userInfo() {
    const {
      InitiatedCustomerName = "",
      InitiatedCustomerMobile = "",
      EmailAddress = "",
      isAuth,
      CIF,
      subject,
      message
    } = this.props;

    return {
      InitiatedCustomerName,
      InitiatedCustomerMobile,
      selectedSubject: subject,
      EmailAddress,
      message,
      isAuth,
      CIF
    };
  }

  get chatInstance() {
    return GenesysChat.getInstance();
  }

  componentDidMount() {
    this.chatInstance.initChat(this.userInfo);
    this.chatInstance.messagesCallback = this.onNewMessageArrival;
    this.chatInstance.setOnTypingEventsHandler(this.agentTypingHandler);
    this.chatInstance.setOnAgentLeftEventHandler(this.agentLeftHandler);
  }

  onClose = () => {
    GenesysChat.getInstance().triggerDisconnectEvent();
    this.props.onClose();
  };

  onNewMessageArrival = messages => {
    this.setState({ messages });
  };

  userStartedTyping = () => {
    GenesysChat.getInstance().userStartedTyping();
  };

  userStopedTyping = () => {
    GenesysChat.getInstance().userStopedTyping();
  };

  agentTypingHandler = flag => {
    this.setState({ agentTyping: flag });
  };

  agentLeftHandler = flag => {
    this.setState({ agentLeft: flag });
  };

  render() {
    const { messages, agentTyping } = this.state;
    const { onMinimize } = this.props;

    return (
      <Container>
        <Header onClose={this.onClose} onMinimize={onMinimize} />
        <Body>
          <MessagesList data={messages} />
          {agentTyping && <TypingLabel>Agent is typing...</TypingLabel>}
          <SendMessageInput placeholder="Type Message" chatInstance={GenesysChat} />
        </Body>
      </Container>
    );
  }
}

Chat.propTypes = {
  name: PropTypes.string,
  mobileNumber: PropTypes.string,
  email: PropTypes.string,
  subject: PropTypes.string,
  message: PropTypes.string
};

export default Chat;
