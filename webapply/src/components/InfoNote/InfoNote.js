import React from "react";
import { styles } from "./styled";

const InfoNote = ({ text, ...props }) => {
  const classes = styles();
  return (
    <span className={classes.note} {...props}>
      {text}
    </span>
  );
};

export default InfoNote;
