import React, { useEffect, useRef } from "react";
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

const VIEW_HEIGHT = 500;

const MessagesList = ({ data }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (
      messageRef.current &&
      // condition if user scroll message himself autoscroll on new message will not work
      messageRef.current.scrollTop + VIEW_HEIGHT + 100 >= messageRef.current.scrollHeight
    ) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <MessagesListStyled ref={messageRef}>
      {data.map(({ id, message, utcTime, type, name }) => (
        <Message key={id} body={message} date={utcTime} name={name} incoming={type !== "Client"} />
      ))}
    </MessagesListStyled>
  );
};

MessagesList.propTypes = {
  data: PropTypes.array
};

export { MessagesList };
