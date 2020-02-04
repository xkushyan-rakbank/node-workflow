import React from "react";
import styled from "styled-components";
import ArrowBack from "../../../../assets/webchat/arrow_left.svg";
import Close from "../../../../assets/webchat/close.svg";
import Minimize from "../../../../assets/webchat/minimize.svg";

const HeaderStyled = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  color: #373737;
  border-bottom: 1px solid #e9e9ed;
`;

const BackButton = styled.button`
  background: no-repeat;
  border: 0;
  padding: 0;
  outline: none;
  position: absolute;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
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

const Title = styled.div`
  margin: 0 auto;
`;

const Header = ({ onPressBack, onClose, onMinimize }) => {
  return (
    <HeaderStyled>
      {onPressBack && (
        <BackButton onClick={onPressBack}>
          <img src={ArrowBack} alt="" />
        </BackButton>
      )}
      <Title>Live Chat</Title>
      <ActionButtons>
        <img src={Minimize} alt="Minimize" onClick={onMinimize} />
        <img src={Close} alt="Close" onClick={onClose} />
      </ActionButtons>
    </HeaderStyled>
  );
};

export { Header };
