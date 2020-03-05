import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Message } from "./Message";

const MessagesListStyled = styled.div`
  box-sizing: border-box;
  height: 0px;
  padding: 0 16px 10px 16px;
  overflow-y: auto;
  min-height: 320px;
`;

const MessagesList = ({ data }) => {
  const messages = data.map(({ id, message, utcTime, type, name }) => (
    <Message key={id} body={message} date={utcTime} name={name} incoming={type !== "Client"} />
  ));

  return <MessagesListStyled>{messages}</MessagesListStyled>;
};

MessagesList.propTypes = {
  data: PropTypes.array
};

export { MessagesList };
