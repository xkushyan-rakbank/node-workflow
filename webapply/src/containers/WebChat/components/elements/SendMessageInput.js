import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SendMessage from "../../../../assets/webchat/sendMessage.svg";

const StyledTextarea = styled.textarea`
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

const TextareaWrapper = styled.form`
  display: flex;
  margin: auto 16px 20px 16px;
  padding: 16px;
  border-radius: 4px;
  border: solid 1px #e9e9ed;
`;

const StyledButton = styled.button`
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

const MIN_ROWS = 1;
const MAX_ROWS = 5;

export function SendMessageInput({ placeholder, chatInstance }) {
  const [value, setValue] = useState("");
  const [rows, setRows] = useState(1);

  const handleChange = useCallback(event => {
    const textareaLineHeight = 22; //StyledTextarea line-height

    const previousRows = event.target.rows;
    event.target.rows = MIN_ROWS;

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= MAX_ROWS) {
      event.target.rows = MAX_ROWS;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setValue(event.target.value);
    setRows(currentRows < MAX_ROWS ? currentRows : MAX_ROWS);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      chatInstance
        .getInstance()
        .sendChatMessage(value)
        .then(() => {
          setValue("");
          setRows(1);
        })
        .catch(e => {
          console.warn("error " + e);
        });
    },
    [chatInstance, value]
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <TextareaWrapper onSubmit={handleSubmit}>
      <StyledTextarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <StyledButton type="submit">
        <img src={SendMessage} alt="" />
      </StyledButton>
    </TextareaWrapper>
  );
}

SendMessageInput.propTypes = {
  placeholder: PropTypes.string
};
