import React from "react";
import Button from "@material-ui/core/Button/Button";

import AddIcon from "../../AddIcon";
import { useStyles } from "./styled";

export const AddStakeholderButton = props => {
  const classes = useStyles();
  const { label = "Add Another Stakeholder", disabled = false, handleClick } = props;

  return (
    <Button
      variant="outlined"
      component="button"
      color="primary"
      type="button"
      classes={{
        root: classes.buttonStyle
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      <AddIcon />
      <div className={classes.labelStyle}>{label}</div>
    </Button>
  );
};
