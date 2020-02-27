import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { getIn } from "formik";
import cx from "classnames";

import { CustomRadioButton as Radio } from "../RadioButton/CustomRadioButton";
import { ContexualHelp, ErrorMessage } from "../../Notifications";
import { useStyles } from "./styled";

export const InlineRadioGroup = ({
  label,
  field,
  form: { touched, errors, setFieldValue },
  options,
  required,
  onChange,
  contextualHelpText,
  contextualHelpProps = {},
  onSelect = () => {},
  isDisabled
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
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
        <RadioGroup
          aria-label={label}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          className={cx(
            classes.inlineFormControl,
            "smallText",
            isDisabled && classes.disabledLabel
          )}
        >
          {label}
          <div className={classes.inlineFormRadioWrapper}>
            {options.map(item => (
              <Radio
                disabled={isDisabled}
                color="secondary"
                key={item.key}
                value={item.value}
                label={item.label}
                onSelect={onSelect}
              />
            ))}
          </div>
        </RadioGroup>
      </ContexualHelp>

      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
