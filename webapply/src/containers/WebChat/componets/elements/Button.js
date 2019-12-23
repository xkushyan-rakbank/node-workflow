import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--white);
  min-width: 132px;
  margin-top: 24px;
  height: 42px;
  padding: 6px 20px;
  border-radius: 28px;
  background-color: var(--dark-grey);
  box-shadow: none;
  cursor: pointer;
  :disabled {
    background-color: var(--light-gray);
  }
`;
