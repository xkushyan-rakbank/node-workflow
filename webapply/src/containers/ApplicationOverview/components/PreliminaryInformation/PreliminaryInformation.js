import React from "react";
import { Youtube } from "../../../../components/Youtube/Youtube";


import { useStyles } from "./styled";

export const PreliminaryInformation = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.videoSubTitle}>
        Here&apos;s a quick video guide to help you get started!
      </p>
      <Youtube src="https://www.youtube.com/embed/_qjhtz4ocRY" />
    </div>
  );
};
