import React, { useCallback } from "react";
import Button from "@material-ui/core/Button/Button";

import { useStyles } from "./styled";
import { ICONS, Icon } from "../../../../components/Icons";
import { GA_EVENTS } from "../../../../utils/ga";

export const AddStakeholderButton = ({
  label = "Add Another Stakeholder",
  handleClick,
  handleContinue,
  ...rest
}) => {
  const classes = useStyles();

  const handleClickGA = useCallback(() => {
    handleContinue(GA_EVENTS.COMPANY_STAKEHOLDER_ADD_NEW_CONTINUE);
    handleClick();
  }, [handleClick, handleContinue]);

  return (
    <Button
      variant="outlined"
      component="button"
      color="primary"
      type="button"
      classes={{
        root: classes.buttonStyle
      }}
      onClick={handleClickGA}
      {...rest}
    >
      <Icon name={ICONS.plus} className={classes.icon} />
      <div className={classes.labelStyle}>{label}</div>
    </Button>
  );
};
