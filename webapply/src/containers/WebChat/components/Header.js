import React from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../assets/icons/chat-close.svg";
import { ReactComponent as Minimize } from "../../../assets/icons/chat-minimize.svg";

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

const Header = ({ onClose, onMinimize }) => {
  return (
    <HeaderStyled>
      <ActionButtons>
        <Minimize alt="Minimize" onClick={onMinimize} />
        <Close alt="Close" onClick={onClose} />
      </ActionButtons>
    </HeaderStyled>
  );
};

export { Header };
