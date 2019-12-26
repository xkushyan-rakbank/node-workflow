import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MessagesList } from "./elements/MessagesList";
import SendMessageInput from "./elements/SendMessageInput";
import { GenesysChat } from "../utils/GenesysChat";
import { Header } from "./elements/Header";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
    const { name = "", mobileNumber = "", email = "", subject, message } = this.props;

    return {
      name,
      mobileNumber,
      selectedSubject: subject,
      email,
      message
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

  onMinimizeChat = () => {
    GenesysChat.getInstance().minimizeChat();
    this.props.onMinimize();
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

  onPressBack = () => {
    this.onClose();
    this.props.onPressBack();
  };

  render() {
    const { messages, agentTyping } = this.state;

    return (
      <>
        <Header
          onPressBack={this.onPressBack}
          onClose={this.onClose}
          onMinimize={this.onMinimizeChat}
        />
        <Body>
          <MessagesList data={messages} />
          {agentTyping && <TypingLabel>Agent is typing...</TypingLabel>}
          <SendMessageInput placeholder="Type Message" chatInstance={GenesysChat} />
        </Body>
      </>
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

export { Chat };
