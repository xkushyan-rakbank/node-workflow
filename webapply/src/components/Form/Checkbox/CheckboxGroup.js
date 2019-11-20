import React from "react";
import get from "lodash/get";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

import { useStyles } from "./styled";

export const CheckboxGroup = ({ id, options, title, field, form }) => {
  const classes = useStyles();
  const { name, onChange } = field;
  const error = get(form, `errors[${name}]`, "");

  return (
    <div>
      <div className={classes.checkboxesWrapper}>
        {options.map(({ key, value, displayText }) => (
          <CustomCheckbox
            id={name}
            name={name}
            key={key}
            value={value}
            label={displayText}
            onChange={onChange}
          />
        ))}
      </div>

      {error && <ErrorMessage error={error} />}
      {title && <InfoTitle title={title} />}
    </div>
  );
};
