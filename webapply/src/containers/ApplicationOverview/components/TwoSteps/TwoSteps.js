import React from "react";

import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../../../components/IconCards/IconCardItem";
import HeaderTitle from "../../../../components/HeaderTitle";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";

import { useStyles } from "./styled";

export const TwoSteps = () => {
  const classes = useStyles();
  const { interrogation, signature, overview } = useIconsByAccount();

  return (
    <>
      <HeaderTitle />
      <div className={classes.firstGroup}>
        <SectionTitleWithInfo title="Two easy steps" />
        <div className={classes.indent}>
          <IconCardsContainer>
            <IconCardItem minWidth="200px" title="First" text="You fill a couple of questions">
              <img src={interrogation} alt="interrogation" />
            </IconCardItem>
            <IconCardItem minWidth="200px" title="Then" text="We call you to sign the account">
              <img src={signature} alt="signature" />
            </IconCardItem>
          </IconCardsContainer>
        </div>
      </div>
      <div className={classes.secondGroup}>
        <div>
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
