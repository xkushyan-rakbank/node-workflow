import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";

import { CommonQuestions } from "../CommonQuestionsNew";
describe("CommonQuestions", () => {
  const defaultProps = {
    questions: [
      {
        id: 1,
        question: "Question 1",
        answer: { __html: "Answer 1" }
      },
      {
        id: 2,
        question: "Question 2",
        answer: { __html: "Answer 2" }
      }
    ]
  };
  const renderComp = (props = defaultProps) =>
    render(<CommonQuestions questions={props.questions} />);

  it("should render properly", () => {
    renderComp();
    const commonQuestionsWrapper = screen.getAllByTestId("common-questions");
    const commonQuestionsLabel = screen.getAllByTestId("common-questions-label");
    const commonQuestionsDesc = screen.getAllByTestId("common-questions-desc");
    expect(commonQuestionsWrapper.length).toBe(2);
    expect(commonQuestionsLabel[0].textContent).toBe("Question 1");
    expect(commonQuestionsDesc[0].textContent).toBe("Answer 1");
  });

  it("should expand panel on click", async () => {
    renderComp();
    const commonQuestionsWrapper = screen.getAllByTestId("common-questions");
    console.log(commonQuestionsWrapper[0].classList);
    expect(commonQuestionsWrapper[0].classList.contains("Mui-expanded")).toBe(false);
    act(() => {
      fireEvent.click(commonQuestionsWrapper[0]);
    });
    await waitFor(() => {
      expect(commonQuestionsWrapper[0].classList.contains("Mui-expanded")).toBe(true);
    });
  });
});
