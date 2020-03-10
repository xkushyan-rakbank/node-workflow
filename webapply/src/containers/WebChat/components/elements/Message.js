import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import User from "../../../../assets/webchat/user.svg";

const Container = styled.div`
  display: flex;
  flex-direction: ${({ incoming }) => (incoming ? "row-reverse" : "row")};
  justify-content: ${({ incoming }) => (incoming ? "flex-end" : "flex-end")};
  min-width: 202px;
  padding-top: 20px;
  margin-right: ${({ incoming }) => (incoming ? "auto" : "0")};
  margin-left: ${({ incoming }) => (incoming ? "0" : "auto")};
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ incoming }) => (incoming ? "flex-start" : "flex-end")};
  margin: 0 10px;
  max-width: 240px;
`;

const MessageStyled = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: auto;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: ${({ incoming }) => (incoming ? "#eaeced" : "#373737")};
  font-size: 14px;
  color: ${({ incoming }) => (incoming ? "#263d4c" : "#fff")};
  word-wrap: break-word;
`;

const DateStyled = styled.div`
  font-size: 12px;
  color: #c6c6cc;
  margin-top: 5px;
`;

const Avatar = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: ${({ incoming }) => (incoming ? "#ec2d1b" : "#373737")};
  font-size: 20px;
  color: #fff;
  border-radius: 100%;
`;

const Message = ({ body, date, incoming, name, style }) => (
  <Container incoming={incoming} style={style}>
    <MessageWrapper incoming={incoming}>
      <MessageStyled incoming={incoming}>{body}</MessageStyled>
      <DateStyled>{date}</DateStyled>
    </MessageWrapper>
    <Avatar incoming={incoming}>
      {incoming ? <img src={User} alt="avatar" /> : name ? name.charAt(0) : ""}
    </Avatar>
  </Container>
);

Message.propTypes = {
  body: PropTypes.string,
  date: PropTypes.string,
  incoming: PropTypes.bool
};

export { Message };
