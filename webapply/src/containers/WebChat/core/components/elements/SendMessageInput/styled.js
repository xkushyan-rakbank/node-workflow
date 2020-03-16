import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  border: none;
  resize: none;
  font-size: 16px;
  line-height: 22px;
  overflow: auto;
  height: auto;
  color: #373737;
  outline: none;
`;

export const TextareaWrapper = styled.form`
  display: flex;
  margin: auto 16px 0 16px;
  padding: 16px;
  border-radius: 4px;
  border: solid 1px;
  border-color: ${props => (props.error ? "#e40202" : "#e9e9ed")};
`;

export const StyledButton = styled.button`
  margin-top: auto;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
  :active {
    opacity: 0.4;
  }
`;

export const StyledErrorWrapper = styled.div`
  margin: auto 16px 5px 16px;
  height: 20px;
  width: 328px;
  padding: 0;
  box-sizing: border-box;
  border: none;
  resize: none;
  overflow: auto;
  outline: none;
`;

export const StyledError = styled.span`
  width: 100%;
  padding: 0;
  font-size: 10px;
  line-height: 12px;
  color: #e40202;
`;
