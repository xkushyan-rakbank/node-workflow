import React, { memo } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import cx from "classnames";

import { useStyles } from "./styled";
import { ErrorMessage } from "../../Notifications";

const InputGroupBase = ({ error, children, extraClasses }) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.inputGroupWrapper, extraClasses)}>
      <FormGroup row className={classes.selectCombined}>
        {children}
      </FormGroup>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export const InputGroup = memo(InputGroupBase);
