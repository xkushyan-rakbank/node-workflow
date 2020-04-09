import React from "react";
import Button from "@material-ui/core/Button/Button";

import { useStyles } from "./styled";
import { ICONS, Icon } from "../../../../components/Icons";

export const AddStakeholderButton = ({
  label = "Add Another Stakeholder",
  handleClick,
  ...rest
}) => {
  const classes = useStyles(rest);

  return (
    <Button
      variant="outlined"
      component="button"
      color="primary"
      type="button"
      classes={{
        root: classes.buttonStyle
      }}
      onClick={handleClick}
      {...rest}
    >
      <Icon name={ICONS.plus} className={classes.icon} />
      <div className={classes.labelStyle}>{label}</div>
    </Button>
  );
};
