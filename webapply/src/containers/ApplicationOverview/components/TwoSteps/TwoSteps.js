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
    passport: Passport,
    companyDocuments: CompanyDocuments,

    emiratesId: EmirateId
  } = useIconsByAccount();

  return (
    <>
      {/* //ro-assist header missing issue fix --- removed manual call */}
      <div className={classes.firstGroup}>
        <SectionTitleWithInfo
          title="Documents"
          info="Have these documents ready before we get started"
        />

        <div className={classes.cardsWrapper}>
          <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
            <IconCardItem horizontal text="Valid trade licence and constitutional documents ¹">
              <License alt="trade-license" />
            </IconCardItem>
            <IconCardItem
              horizontal
              text="Passports and Emirates IDs of signatories and stakeholders ²"
            >
              <EmirateId alt="emirates-id" />
            </IconCardItem>
            <IconCardItem horizontal text="Proof of address (operation location)">
              <Passport alt="passport-visa" />
            </IconCardItem>
            <IconCardItem horizontal text="Proof of income for stakeholders">
              <CompanyDocuments alt="company-documents" />
            </IconCardItem>
          </IconCardsContainer>
        </div>
      </div>
      <div className={classes.note}>
        ¹ Memorandum of Association / Articles of Association / Partners Agreement / Service Agreement / Share Certificate<br />
        ² Emirates ID not required for non-resident stakeholders
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
