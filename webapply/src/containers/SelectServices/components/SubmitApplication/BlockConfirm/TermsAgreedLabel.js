import React from "react";

import { ISLAMIC, CONVENTIONAL } from "../../../../../constants";
import {
  submitApplication,
  IS_TERMS_CONDITION_VISITED,
  IS_TERMS_ENROLLMENT_VISITED,
  IS_SANCTIONS_UNDERTAKING_VISITED
} from "../constants";

import { useStyles } from "./styled";

const { termConditionLinks, termEnrollmentLinks } = submitApplication;

export const TermsAgreedLabel = ({ isIslamicBanking, setIsLinkVisited }) => {
  const classes = useStyles();

  const typeOfAccount = isIslamicBanking ? ISLAMIC : CONVENTIONAL;

  return (
    <span>
      I agree with RAKBANK’s{" "}
      <a
        className={classes.link}
        href={termConditionLinks[typeOfAccount]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation();
          setIsLinkVisited(IS_TERMS_CONDITION_VISITED);
        }}
      >
        terms and conditions
      </a>
      ,{" "}
      <a
        className={classes.link}
        href={termEnrollmentLinks[typeOfAccount]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation();
          setIsLinkVisited(IS_TERMS_ENROLLMENT_VISITED);
        }}
      >
        terms of enrollment
        {/* //ro-assist-brd3-13 */}
      </a>{" "}
      and{" "}
      <a
        className={classes.link}
        href={termConditionLinks[typeOfAccount]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          e.stopPropagation();
          setIsLinkVisited(IS_SANCTIONS_UNDERTAKING_VISITED);
        }}
      >
        sanctions undertaking
      </a>
    </span>
  );
};
