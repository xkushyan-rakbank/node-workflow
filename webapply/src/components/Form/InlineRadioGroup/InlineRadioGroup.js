import React, { memo } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { getIn } from "formik";
import cx from "classnames";

import { CustomRadioButton as Radio } from "../RadioButton/CustomRadioButton";
import { ContexualHelp, ErrorMessage } from "../../Notifications";
import { useStyles } from "./styled";
import { areEqualFieldProps } from "../utils";

const InlineRadioGroupBase = ({
  label,
  field,
  form: { touched, errors, setFieldValue },
  options,
  required,
  onChange,
  contextualHelpText,
  contextualHelpProps = {},
  onSelect = () => {},
  disabled: isDisabled,
  customIcon = false,
  classes: extendedClasses,
  radioColor = "secondary"
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const handleChange = event =>
    onChange ? onChange(event) : setFieldValue(field.name, JSON.parse(event.target.value));
  const disabledRadioButtonByDefault = [
    "Any one of us can sign",
    "All of us must sign",
    "other (please Specify)"
  ];

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
          value={JSON.stringify(field.value)}
          onChange={handleChange}
          className={cx(
            classes.inlineFormControl,
            "smallText",
            isDisabled && classes.disabledLabel
          )}
        >
          {label && <span className={classes.label}>{label}</span>}
          <div className={cx(classes.inlineFormRadioWrapper, extendedClasses.parent)}>
            {options.map(item => (
              <Radio
                disabled={isDisabled || disabledRadioButtonByDefault.includes(item.label)}
                color={radioColor}
                key={item.key}
                value={JSON.stringify(item.value)}
                label={item.label}
                onSelect={onSelect}
                customIcon={customIcon}
                classes={extendedClasses}
              />
            ))}
          </div>
        </RadioGroup>
      </ContexualHelp>

      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};

export const InlineRadioGroup = memo(InlineRadioGroupBase, areEqualFieldProps);
