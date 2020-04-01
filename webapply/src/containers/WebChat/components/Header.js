import React from "react";
import styled from "styled-components";

import Close from "../../../assets/icons/chat-close.svg";
import Minimize from "../../../assets/icons/chat-minimize.svg";

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
  > img {
    cursor: pointer;
  }
`;

const Header = ({ onClose, onMinimize }) => {
  return (
    <HeaderStyled>
      <div>Chat with us</div>
      <ActionButtons>
        <img src={Minimize} alt="Minimize" onClick={onMinimize} />
        <img src={Close} alt="Close" onClick={onClose} />
      </ActionButtons>
    </HeaderStyled>
  );
};

export { Header };
