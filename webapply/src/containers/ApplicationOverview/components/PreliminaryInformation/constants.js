import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../../routes";

export const questions = [
  {
    // eslint-disable-next-line
    question: 'What should I expect on "Submitting" the completed application?',
    answer: {
      __html: (
        <>
          a. You will instantly get an inactive account number on successful submission of
          application.
          <br />
          b. Our team will reach out to you in one business day to fix an appointment.
          <br />
          c. On submission of the signed form Bank will activate the account within 5 business days
          subject to internal policies and guidelines.
        </>
      )
    },
    id: 5
  },
  {
    question: "Once I start the application, can I come back later and complete it?",
    answer: {
      // eslint-disable-next-line max-len
      __html: (
        <>
          Yes. You can continue your application from where you left using&nbsp;
          <Link to={routes.comeBackLogin} target="_blank">the link</Link>
          &nbsp;sent to your email id.
        </>
      )
    },
    id: 1
  },
  {
    question: "Will my Account be opened once I submit the application?",
    answer: {
      __html: (
        <>
          You will get your account number on successful submission of application. This account
          will be activated once the bank approves the same.
        </>
      )
    },
    id: 2
  },
  {
    question: "What if I need help while filling the application?",
    answer: {
      __html: "You can use web chat option to get help from our experts who are\n available 24 x 7."
    },
    id: 3
  },
  {
    question: "How do I check the status of my submitted application?",
    answer: {
      // eslint-disable-next-line max-len
      __html: (
        <>
          You can check the status of your application by accessing <Link to={routes.comeBackLogin} target="_blank">the link</Link> sent to your email Id.
        </>
      )
    },
    id: 4
  }
];
