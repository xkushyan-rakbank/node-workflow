import React from "react";

import videoUrl from "../../../../assets/videos/success_regular.mp4";
import { useStyles } from "./styled";

export const SuccessFilledStakeholder = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <video autoPlay>
        <source src={videoUrl} />
      </video>
      <div className={classes.successTitle}>
        Congrats! You have added
        <br /> <b>{name}</b> as a stakeholder
      </div>
    </div>
  );
};
