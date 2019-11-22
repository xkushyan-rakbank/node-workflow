import React from "react";
import { getIn } from "formik";
import cx from "classnames";

import { ErrorMessage } from "../../Notifications";

import { useStyles } from "./styled";

export const TextArea = ({ placeholder, maxlength, form: { errors, touched }, field }) => {
  const classes = useStyles();
  const error = getIn(errors, field.name);

  return (
    <div>
      <textarea
        className={cx(classes.textArea, { [classes.error]: error })}
        placeholder={placeholder}
        autoFocus
        {...field}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
