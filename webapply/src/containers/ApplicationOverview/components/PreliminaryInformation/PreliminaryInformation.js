import React from "react";

import { useIconsByAccount } from "../../../../utils/useIconsByAccount";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { IconCardsContainer } from "../../../../components/IconCards/IconCardsContainer";
import { IconCardItem } from "../../../../components/IconCards/IconCardItem";
import { CommonQuestions } from "../CommonQuestions";
import { Youtube } from "../../../../components/Youtube/Youtube";

import { questions } from "./constants";

import { useStyles } from "./styled";

export const PreliminaryInformation = () => {
  const classes = useStyles();

  const { interrogation: Interrogation, signature: Signature } = useIconsByAccount();

  return (
    <div className={classes.container}>
      <SectionTitleWithInfo title="Two easy steps" />
      <div className={classes.indent}>
        <IconCardsContainer>
          <IconCardItem minWidth="200px" title="First" text="You answer a few questions">
            <Interrogation alt="interrogation" />
          </IconCardItem>
          <IconCardItem minWidth="200px" title="Then" text="We meet you to get your signature">
            <Signature alt="signature" />
          </IconCardItem>
        </IconCardsContainer>
      </div>
      <div className={classes.info}>
        On submission of a completed application get an inactive account number instantly.
      </div>
      <div className={classes.videoTitle}>
        Here&apos;s a quick video guide to help you get started!{" "}
      </div>
      <Youtube src="https://www.youtube.com/embed/_qjhtz4ocRY" />
      <div className={classes.answers}>
        <div className={classes.title}>Have more questions? Here are some answers</div>
        <CommonQuestions questions={questions} />
      </div>
    </div>
  );
};
