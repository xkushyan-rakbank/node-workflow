import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Verified from "../../../assets/webchat/success.svg";

import { Dropdown } from "./elements/Dropdown";
import { Button } from "./elements/Button";
import { Header } from "./elements/Header";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 32px 28px;
`;

const Field = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #707070;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #00c8a3;
  margin-left: auto;
  img {
    margin-right: 5px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;

const Message = styled.textarea`
  margin-top: 24px;
  padding: 12px 14px;
  border-radius: 5px;
  border: 1px solid #e9e9ed;
  resize: none;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  color: #373737;
  transition: all 0.2s;
  ::-webkit-input-placeholder {
    opacity: 0.2;
    color: #707070;
    transition: all 0.2s;
  }
  :focus {
    border-color: #e9e9ed;
    outline: none;
    ::-webkit-input-placeholder {
      opacity: 1;
    }
  }
`;

const subjectsList = [
  { value: 1, label: "Account Related" },
  { value: 2, label: "ATM and Branch Locations" },
  { value: 3, label: "Business Banking Related" },
  { value: 4, label: "Card Related" },
  { value: 5, label: "Complaints and Suggestions" },
  { value: 6, label: "Corporate Banking Related" },
  { value: 7, label: "Digital Banking Related" },
  { value: 8, label: "Insurance (Life, Motor, Travel etc.)" },
  { value: 9, label: "Islamic Products" },
  { value: 10, label: "Loans Related" },
  { value: 11, label: "Overdue Payment / Debt Related" },
  { value: 12, label: "RAKELITE / Investment Related" },
  { value: 13, label: "Other Inquiries" }
];

const Login = ({ name, mobileNumber, onSubmit }) => {
  const [subject, changeSubject] = useState(subjectsList[0]);
  const [message, changeMessage] = useState("");

  const onMessageChange = useCallback(e => {
    changeMessage(e.target.value);
  }, []);

  const onSubjectChange = useCallback(item => {
    changeSubject(item);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Info>
          <Field>Name: {name}</Field>
          <Field>Mobile number: {mobileNumber}</Field>
        </Info>
        <Label>
          <img src={Verified} alt="" />
          Verified
        </Label>
        <Dropdown
          label="Select subject"
          options={subjectsList}
          value={subject}
          onChange={onSubjectChange}
        />
        <Message
          id="message"
          value={message}
          onChange={onMessageChange}
          cols="30"
          rows="6"
          placeholder="Write your message here..."
        />
        <Button disabled={!subject || !message} onClick={() => onSubmit({ subject, message })}>
          Send
        </Button>
      </Container>
    </>
  );
};

Login.propTypes = {
  name: PropTypes.string,
  mobileNumber: PropTypes.string
};

export { Login };
