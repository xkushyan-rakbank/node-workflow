import React, { useEffect } from "react";
import videoUrl from "../../../assets/videos/success_regular.mp4";
import { useStyles } from "./styled";

const SuccessFilledStakeholder = ({ name, onHideForm }) => {
  const classes = useStyles();

  useEffect(() => {
    const intervalId = setInterval(onHideForm, 5000);
    return () => {
      clearInterval(intervalId);
    };
  });

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

export default SuccessFilledStakeholder;
