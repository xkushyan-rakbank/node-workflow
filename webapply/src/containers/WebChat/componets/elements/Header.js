import React from "react";
import styled from "styled-components";
import ArrowBack from "../../../../assets/webchat/arrow_left.svg";

const HeaderStyled = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const Title = styled.div`
  margin: 0 auto;
`;

const Header = ({ onPressBack }) => {
  return (
    <HeaderStyled>
      {onPressBack && (
        <BackButton onClick={onPressBack}>
          <img src={ArrowBack} alt="" />
        </BackButton>
      )}
      <Title>Live Chat</Title>
    </HeaderStyled>
  );
};

export { Header };
