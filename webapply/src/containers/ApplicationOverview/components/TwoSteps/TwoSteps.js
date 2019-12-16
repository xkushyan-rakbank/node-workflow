import React from "react";

import overviewRegular from "../../../../assets/gif/overview_reg.gif";
import overviewIslamic from "../../../../assets/gif/overview_islamic.gif";
import overviewElite from "../../../../assets/gif/overview_elite.gif";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../../../components/IconCards/IconCardItem";
import { getIconsByAccount } from "../../../../constants/icons";
import { accountsNames } from "../../../../constants/index";
import HeaderTitle from "../../../../components/HeaderTitle";

import { useStyles } from "./styled";

export const TwoSteps = ({ accountType, islamicBanking }) => {
  const classes = useStyles();

  const getGifUrl = () => {
    if (islamicBanking) {
      return overviewIslamic;
    } else if (accountType === accountsNames.elite) {
      return overviewElite;
    }
    return overviewRegular;
  };

  const { interrogation, signature } = getIconsByAccount();

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
        <img src={getGifUrl()} alt="overview" />
      </div>
    </>
  );
};
