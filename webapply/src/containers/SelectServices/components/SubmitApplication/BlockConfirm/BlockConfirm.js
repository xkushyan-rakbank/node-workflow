import React from "react";

import Checkbox from "../../../../../components/InputField/Checkbox";

import { styles } from "./styled";
import { submitApplication } from "../../../../../constants";
// TODO refactor props
export const BlockConfirm = ({
  isAgentLoggedIn,
  isInformationProvided,
  onChange,
  areTermsAgreed,
  tncClicked,
  termsEnrolmentClicked,
  needCommunication
}) => {
  const classes = styles();

  return (
    <>
      {isAgentLoggedIn && (
        <div className={classes.checkboxesWrapper}>
          <Checkbox
            value={isInformationProvided}
            name="isInformationProvided"
            label={submitApplication.trueNdCompleteAcknldgelabel}
            className={classes.listItem}
            onChange={onChange}
          />
          <Checkbox
            value={areTermsAgreed}
            name="areTermsAgreed"
            label={
              <span>
                I agree with RakBank’s{" "}
                <a
                  href={submitApplication.termConditionUrl}
                  onClick={tncClicked}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>{" "}
                &{" "}
                <a
                  href={submitApplication.termOfEnrolmentUrl}
                  onClick={termsEnrolmentClicked}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and enrollment
                </a>
              </span>
            }
            className={classes.listItem}
            onChange={onChange}
          />
          <Checkbox
            value={needCommunication}
            name="needCommunication"
            label={submitApplication.needCommunicationLabel}
            className={classes.listItem}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};
