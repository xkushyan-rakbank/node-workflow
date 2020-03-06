import React, { PureComponent } from "react";
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

class SendMessageInput extends PureComponent {
  state = {
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 5
  };

  handleChange = event => {
    const textareaLineHeight = 22; //StyledTextarea line-height
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  onSend = e => {
    e.preventDefault();
    this.props.chatInstance
      .getInstance()
      .sendChatMessage(this.state.value)
      .then(() => {
        this.setState({ value: "", rows: 1 });
      })
      .catch(e => {
        console.warn("error " + e);
      });
  };

  handleKeyDown = e => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      this.onSend(e);
    }
  };

  render() {
    const { rows, value } = this.state;
    const { placeholder } = this.props;

    return (
      <TextareaWrapper onSubmit={this.onSend}>
        <StyledTextarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <StyledButton type="submit">
          <img src={SendMessage} alt="" />
        </StyledButton>
      </TextareaWrapper>
    );
  }
}

SendMessageInput.propTypes = {
  placeholder: PropTypes.string
};

export default SendMessageInput;
