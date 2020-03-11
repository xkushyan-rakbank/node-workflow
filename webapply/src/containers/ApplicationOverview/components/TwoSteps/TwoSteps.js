import React from "react";

import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../../../components/IconCards/IconCardItem";
import { HeaderTitle } from "../../../../components/HeaderTitle";
import { useOverviewIcon } from "./useOverviewIcon/useOverviewIcon";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";

import { useStyles } from "./styled";

export const TwoSteps = () => {
  const classes = useStyles();
  const {
    license: License,
    emiratesId: EmirateId,
    companyDocuments: CompanyDocuments,
    passport: Passport
  } = useIconsByAccount();
  const { overview } = useOverviewIcon();

  return (
    <>
      <HeaderTitle withoutMarginBottom />
      <div className={classes.firstGroup}>
        <SectionTitleWithInfo
          title="Have these ready"
          info="Before we start, make sure you have these documents at hand"
        />

        <div className={classes.cardsWrapper}>
          <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
            <IconCardItem horizontal text="Trade License">
              <License alt="trade-license" />
            </IconCardItem>
            <IconCardItem horizontal text="Passport / visa of all signatories¹">
              <Passport alt="passport-visa" />
            </IconCardItem>
            <IconCardItem horizontal text="Emirates ID of all signatories">
              <EmirateId alt="emirates-id" />
            </IconCardItem>
            <IconCardItem horizontal text="Other company documents²">
              <CompanyDocuments alt="company-documents" />
            </IconCardItem>
          </IconCardsContainer>
        </div>
      </div>
      <div className={classes.note}>
        1. Not applicable to UAE nationals. 2. Memorandum of Association, Articles of Association,
        Share Certificate, Partners Agreement or Service Agreement, whichever is applicable to your
        company.
      </div>
      <div className={classes.secondGroup}>
        <div className={classes.secondGroupText}>
          <h3 className={classes.title}>Grab a cup of tea</h3>
          <span className={classes.info}>
            We need to spend some time getting to know you and your company
          </span>
        </div>
        <img src={overview} alt="overview" />
      </div>
    </>
  );
};
