import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getIn } from "formik";
import cx from "classnames";

import { useStyles } from "./styled";
import { ErrorMessage } from "../../Notifications";

export const InlineRadioGroup = ({
  label,
  field,
  form: { touched, errors, setFieldValue },
  options,
  required,
  onChange
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const handleChange = event =>
    onChange ? onChange(event) : setFieldValue(field.name, JSON.parse(event.target.value));

  return (
    <FormControl
      component="fieldset"
      required={required}
      error={isError}
      className={classes.wrapper}
    >
      <RadioGroup
        aria-label={label}
        name={field.name}
        value={field.value}
        onChange={handleChange}
        className={cx(classes.inlineFormControl, "smallText")}
      >
        {label}
        <div className="box-group-grid">
          {options.map(item => (
            <FormControlLabel
              key={item.key}
              value={item.value}
              control={<Radio color="secondary" />}
              label={item.label}
            />
          ))}
        </div>
      </RadioGroup>

      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
