import React from "react";
import { Field } from "formik";

import CustomCheckbox from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

import { useStyles } from "./styled";

export const CheckboxGroup = ({ id, options, name, title, errors }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.checkboxesWrapper}>
        {options.map(({ key, value, displayText }) => (
          <Field
            id={id}
            name={name}
            key={key}
            value={value}
            label={displayText}
            component={CustomCheckbox}
          />
        ))}
      </div>

      {errors && <ErrorMessage error={errors} />}
      {title && <InfoTitle title={title} />}
    </div>
  );
};
