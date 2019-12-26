import React from "react";

import { useIconsByAccount } from "../../../../utils/useIconsByAccount";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../../../components/IconCards/IconCardItem";
import { CommonQuestions } from "../CommonQuestions";
import HeaderTitle from "../../../../components/HeaderTitle";

import { questions } from "./constants";

import { useStyles } from "./styled";

export const PreliminaryInformation = () => {
  const classes = useStyles();

  const {
    license: License,
    passport: Passport,
    emiratesId: EmirateId,
    companyDocuments: CompanyDocuments
  } = useIconsByAccount();

  return (
    <>
      <HeaderTitle withMargin />
      <SectionTitleWithInfo
        title="Have these ready"
        info="Before we start, make sure you have these documents at hand"
      />
      <div className={classes.cardsWrapper}>
        <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
          <IconCardItem minWidth="100px" text="Trade License">
            <License alt="trade-license" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Passport of all signatories¹">
            <Passport alt="passport-visa" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Emirates ID of all signatories">
            <EmirateId alt="emirates-id" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Company MoA*²">
            <CompanyDocuments alt="company-documents" />
          </IconCardItem>
        </IconCardsContainer>
      </div>
      <div className={classes.note}>
        1. Not applicable to UAE nationals. 2. Memorandum of Association, Articles of Association,
        Share Certificate, Partners Agreement or Service Agreement, whichever is applicable to your
        company.
      </div>
      <div className={classes.answers}>
        <div className={classes.title}>Have more questions? Here are some answers</div>
        <CommonQuestions questions={questions} />
      </div>
    </>
  );
};
