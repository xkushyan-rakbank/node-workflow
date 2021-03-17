import React from "react";
import { useStyles } from "./styled";

export const Youtube = ({ src }) => {
  const classes = useStyles();
  return (
    <div className={classes.videoBox}>
      <iframe
        width="560"
        height="315"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Quick Apply - Apply for a Business Account in minutes!"
      ></iframe>
    </div>
  );
};
