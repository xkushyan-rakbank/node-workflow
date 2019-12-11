import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "./Popover";
import { ICONS, Icon } from "./Icons";
import { useOnClickOutside } from "../utils/useOnClickOutside";

const useStyles = makeStyles({
  wrapper: {
    marginLeft: "12px",
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  questionIcon: {
    cursor: "pointer"
  }
});

export const HelpTooltip = ({ message }) => {
  const ref = useRef();
  const classes = useStyles();
  const [isOpenToolTip, setIsOpenTollTip] = useState(false);

  useOnClickOutside(ref, () => setIsOpenTollTip(false));

  return (
    <div className={classes.wrapper} ref={ref}>
      <Icon
        alt="more info icon"
        name={ICONS.questionMarkGray}
        className={classes.questionIcon}
        onClick={() => setIsOpenTollTip(true)}
      />
      {isOpenToolTip && <Popover message={message} />}
    </div>
  );
};
