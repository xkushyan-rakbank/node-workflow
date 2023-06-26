import React from "react";
import { Divider } from "@material-ui/core";
import { CommonQuestions } from "../CommonQuestions";
import { Youtube } from "../../../../components/Youtube/Youtube";

import { questions } from "./constants";

import { useStyles } from "./styled";

export const PreliminaryInformation = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.videoTitle}>
        How-to-video
        <p className={classes.videoSubTitle}>
          Here&apos;s a quick video guide to help you get started!
        </p>
      </div>
      <Youtube src="https://www.youtube.com/embed/_qjhtz4ocRY" />

      <div className={classes.answers}>
        <div>
          <Divider className={classes.divider} />
        </div>
        <div className={classes.title}>
          Frequently asked questions
          <p className={classes.subTitle}>
            {"Here are the answers to some things you're probably wondering about"}
          </p>
        </div>
        <CommonQuestions questions={questions} />
      </div>
    </div>
  );
};
