import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Close } from "../../../assets/icons/chat-close.svg";
import { ReactComponent as Minimize } from "../../../assets/icons/chat-minimize.svg";
import { ReactComponent as WebChatIcon } from "../../../assets/icons/web-chat.svg";
import { CHAT_INFO } from "../../../constants/index";

const HeaderStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding: 16px;
  color: #373737;
  border-bottom: 1px solid #e9e9ed;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 55px;
  > svg {
    cursor: pointer;
  }
`;

const text = css`
  color: #695e57;
  font-size: 10px;
  font-weight: normal;
  text-align: left;
`;

const FlexBox = styled.div`
  display: flex;
`;
const FlexBoxReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const ImportantInfoText = styled.div`
  ${text}
  border: 1px solid #e8e8e8;
  box-shadow: none;
  resize: none;
  flex: 3;
  border-radius: 8px;
  font-size: 10px;
  padding: 8px;
  margin: 8px;
`;

const ArabicText = styled.div`
  text-align: right;
`;

const ImportantInfoIcon = styled.div`
  min-width: 30%;
  margin-left: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WebChatIconStyled = styled(WebChatIcon)`
  width: 80px;
  height: 80px;
  padding-top: 28px;
`;

const WebChatDesc = styled.div`
  ${text}
  font-size: 10px;
  text-align: center;
  padding-right: 4px;
`;

const Header = ({ onClose, onMinimize }) => {
  return (
    <>
      <HeaderStyled>
        <ActionButtons>
          <Minimize alt="Minimize" onClick={onMinimize} />
          <Close alt="Close" onClick={onClose} />
        </ActionButtons>
      </HeaderStyled>
      <FlexBox>
        <ImportantInfoText>
          <ArabicText>
            <b>{CHAT_INFO.HEADER_AR}</b>
            <br />
            {CHAT_INFO.DESC_AR}
          </ArabicText>
          <br />
          <b>{CHAT_INFO.HEADER_ENG}</b>
          <br />
          {CHAT_INFO.DESC_ENG}
        </ImportantInfoText>
        <ImportantInfoIcon>
          <WebChatIconStyled alt="web-chat" />
          <WebChatDesc>
            {CHAT_INFO.ICON_DESC_ENG}
            <br />
            {`${CHAT_INFO.PLEASE_CALL_ENG} ${CHAT_INFO.PHONE_NUM}`}
            <br />
            <b>{CHAT_INFO.ICON_DESC_AR}</b>
            <br />
            <FlexBoxReverse>
              <b>{CHAT_INFO.PLEASE_CALL_AR}</b>
              <div className="mr-1">{CHAT_INFO.PHONE_NUM}</div>
            </FlexBoxReverse>
          </WebChatDesc>
        </ImportantInfoIcon>
      </FlexBox>
    </>
  );
};

export { Header };
