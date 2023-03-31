import React from "react";

import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { IconCardsContainer } from "../../../../components/IconCards/IconCardsContainer";
import { IconCardItem } from "../../../../components/IconCards/IconCardItem";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";

import { useStyles } from "./styled";

export const TwoSteps = () => {
  const classes = useStyles();
  const {
    overview,
    license: License,
    emiratesId: EmirateId,
    companyDocuments: CompanyDocuments,
    passport: Passport
  } = useIconsByAccount();

  return (
    <>
      {/* //ro-assist header missing issue fix --- removed manual call */}
      <div className={classes.firstGroup}>
        <SectionTitleWithInfo
          title="Have these ready"
          info="Before we start, make sure you have these documents at hand"
        />

        <div className={classes.cardsWrapper}>
          <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
            <IconCardItem horizontal text="Valid Trade Licence and Constitutional documents ¹">
              <License alt="trade-license" />
            </IconCardItem>
            <IconCardItem
              horizontal
              text="Passport and Emirates ID of Shareholders and Signatories ²"
            >
              <Passport alt="passport-visa" />
            </IconCardItem>
            <IconCardItem horizontal text="Proof of address of operating location">
              <EmirateId alt="emirates-id" />
            </IconCardItem>
            <IconCardItem horizontal text="Proof of Income for Shareholders">
              <CompanyDocuments alt="company-documents" />
            </IconCardItem>
          </IconCardsContainer>
        </div>
      </div>
      <div className={classes.note}>
        1. Memorandum of Association / Articles of Association / Partners Agreement / Service
        Agreement / Share Certificate 2. Emirates ID not required for non-residence shareholder
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
