import React, { useContext } from "react";
import cx from "classnames";
import ButtonGroup from "@material-ui/core/ButtonGroup/index";
import Button from "@material-ui/core/Button/Button";

import { MobileNotificationContext } from "../../Notifications/MobileNotification/MobileNotification";

import { useStyles } from "./styled";

import { ReactComponent as ConventionalIcon } from "../../../assets/icons/conventional.svg";
import { ReactComponent as IslamicIcon } from "../../../assets/icons/islamic.svg";

export const IslamicSwitcherButtons = ({ isIslamicBanking, setIsIslamicBanking, toggleSwitcherShow }) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const classes = useStyles({ isMobileNotificationActive });

  return (
    <ButtonGroup
      variant="contained"
      size="small"
      aria-label="small contained button group"
      classes={{ root: classes.root, grouped: classes.grouped }}
    >
      <Button
        classes={{
          root: cx(classes.buttonStyle, {
            [classes.active]: isIslamicBanking
          }),
          label: classes.labelStyle
        }}
        onClick={() => {
          toggleSwitcherShow(false);
          setIsIslamicBanking(false);
        }}
      >
        <ConventionalIcon />
        Conventional
      </Button>
      <Button
        classes={{
          root: cx(classes.buttonStyle, {
            [classes.active]: !isIslamicBanking
          }),
          label: classes.labelStyle
        }}
        onClick={() => {
          toggleSwitcherShow(false);
          setIsIslamicBanking(true);
        }}
      >
        <IslamicIcon />
        RAKislamic
      </Button>
    </ButtonGroup>
  );
};
