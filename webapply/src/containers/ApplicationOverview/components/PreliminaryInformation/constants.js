import React from "react";
import routes from "../../../../routes";
import { ComeBackLink } from "./styled";

const Answer = () => (
  <>
    Yes. You can continue your application from where you left using
    <ComeBackLink to={routes.comeBackLogin} target="_blank">
      the link
    </ComeBackLink>
    sent to your email id.
  </>
);

export const questions = [
  {
    question: "Once I start the application, can I come back later and complete it?",
    answer: <Answer />,
    id: 1
  },
  {
    question: "Will my Account be opened once I submit the application?",
    answer:
      "You will get your account number on successful submission of application. This account will be activated once the bank approves the same.",
    id: 2
  },
  {
    question: "What if I need help while filling the application?",
    answer: "You can use web chat option to get help from our experts who are\n available 24 x 7.",
    id: 3
  },
  {
    question: "How do I check the status of my submitted application?",
    answer:
      "You can check the status of your application by accessing the link sent to your email Id.",
    id: 4
  }
];
