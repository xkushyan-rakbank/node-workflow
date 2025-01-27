import React, { useState, memo } from "react";
import Select from "react-select";
import { getIn } from "formik";
import { FormControl } from "@material-ui/core";

import { ErrorMessage, ContexualHelp } from "./../../../Notifications";
import { Control, Option, IndicatorsContainer, MultiValue } from "./SelectAutocompleteComponents";
import { areEqualFieldProps } from "../../utils";
import { useStyles, customStyles } from "./styled";

const components = {
  Control,
  Option,
  IndicatorsContainer,
  MultiValue
};

const SelectAutocompleteBase = ({
  extractValue = option => option.value,
  extractLabel = option => option.label || option.displayText,
  theme,
  label,
  shrink,
  options,
  field: { onBlur, ...field },
  form: { errors, touched, setFieldValue, setFieldTouched },
  multiple = false,
  disabled,
  contextualHelpText,
  contextualHelpProps,
  onChange = value => setFieldValue(field.name, value),
  ...props
}) => {
  const classes = useStyles({
    ...props,
    disabled
  });
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const [hasFocus, setFocus] = useState(false);

  const handleChange = selected => {
    const value = multiple ? (selected || []).map(item => item.value) : extractValue(selected);

    return onChange(value);
  };

  const renderValue = !multiple
    ? options.find(option => extractValue(option) === field.value)
    : options.filter(option => (field.value || []).map(extractValue).includes(option.value));

  return (
    <FormControl
      classes={{ root: classes.formControlRoot }}
      className="formControl"
      variant="outlined"
    >
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
        <Select
          {...field}
          {...props}
          ref={props.innerRef}
          classes={classes}
          isOpen
          options={options}
          styles={customStyles}
          components={components}
          value={renderValue || ""}
          onChange={handleChange}
          isMulti={multiple}
          isDisabled={disabled}
          closeMenuOnSelect={!multiple}
          tabSelectsValue={!multiple}
          hideSelectedOptions={false}
          joinValues={true}
          delimiter=","
          placeholder=""
          textFieldProps={{
            onFocus: () => setFocus(true),
            onBlur: () => {
              setFocus(false);
              setFieldTouched(field.name);
            },
            label,
            error: !!isError,
            InputLabelProps: {
              shrink: hasFocus || !!(Array.isArray(renderValue) ? renderValue.length : renderValue)
            }
          }}
          getOptionLabel={extractLabel}
        />
      </ContexualHelp>
      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};

export const SelectAutocomplete = memo(SelectAutocompleteBase, areEqualFieldProps);
