import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #fff;
  min-width: 132px;
  margin-top: 24px;
  height: 42px;
  padding: 6px 20px;
  border-radius: 28px;
  background-color: #373737;
  box-shadow: none;
  cursor: pointer;
  :disabled {
    background-color: #707070;
  }
`;
