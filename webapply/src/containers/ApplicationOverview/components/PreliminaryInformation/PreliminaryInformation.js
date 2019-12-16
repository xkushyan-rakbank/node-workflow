import React from "react";

import { getIconsByAccount } from "../../../../constants/icons";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../../../components/IconCards/IconCardItem";
import { CommonQuestions } from "../CommonQuestions";
import { questions } from "./constants";

import { useStyles } from "./styled";

export const PreliminaryInformation = () => {
  const classes = useStyles();

  const { license, passport, emiratesId, companyDocuments } = getIconsByAccount();

  return (
    <>
      <SectionTitleWithInfo
        title="Have these ready"
        info="Before we start, make sure you have these documents at hand"
      />
      <div className={classes.cardsWrapper}>
        <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
          <IconCardItem minWidth="100px" text="Trade License">
            <img src={license} alt="trade-license" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Passport/visa of all signatories¹">
            <img src={passport} alt="passport-visa" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Emirates ID of all signatories">
            <img src={emiratesId} alt="emirates-id" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Other company documents²">
            <img src={companyDocuments} alt="company-documents" />
          </IconCardItem>
        </IconCardsContainer>
      </div>
      <div className={classes.note}>
        1. Not applicable to UAE nationals. 2. Memorandum of Association, Articles of Association,
        Share Certificate, Partners Agreement or Service Agreement, whichever is applicable to your
        company.
      </div>
      <div className={classes.answers}>
        <div className={classes.title}>Got more questions? We got some answers</div>
        <CommonQuestions questions={questions} />
      </div>
    </>
  );
};
